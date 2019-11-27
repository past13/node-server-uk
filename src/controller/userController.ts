import { Request, Response } from 'express';

const UserSession = require('../models/UserSessionSchema');
const User = require('../models/userSchema');

export default class UserController {
   
    public async signUpUser (req: Request, res: Response) {
        const body = req.body;
        const {
            firstName,
            lastName,
            password
        } = body;

        let {
            email
        } = body;

        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: First name cannot be blank.'
            });
        }

        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: Last name cannot be blank.'
            });
        }

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email name cannot be blank.'
            });
        }

        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password name cannot be blank.'
            });
        }

        email = email.toLowerCase();
        User.find({
            email: email
        }, (err: any, previousUsers: { length: number; }) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Something went wrong.'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Account already exist.'
                });
            } 

            //save new user
            const newUser = new User();

            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err: any, user: any) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed up'
                });
            })
        })
    }

    public async signInUser (req: Request, res: Response) {
        const { body } = req;
        const {
            password
        } = body;

        let {
            email
        } = body;

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank'
            });
        }

        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        },(err: any, users: any[]) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            const user = users[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err: any, doc: { _id: any; }) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: server error'
                    });
                }

                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                });
            })
        })
    }

    public async verifyUser (req: Request, res: Response) {
        //Get token
        // Verify token is one of kind and item not deleted
        const { query } = req;
        const { token } = query;
        // ?token=test

        // Verify the token is one of a kind and its not deleted
        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err: any, sessions: any) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Good'
                });
            }
        });
    }

    public async logoutUser (req: Request, res: Response) {
      //Get token
      const { query } = req;
      const { token } = query;

      UserSession.findOneAndUpdate({ 
          _id: token,
          isDeleted: false
      }, {
          $set:{
              isDeleted: true
          }
      }, null, (err: any, sessions: any) => {
          if (err) {
              return res.send({
                  success: false,
                  message: 'Error: Server error'
              });
          }
          return res.send({
              success: true,
              message: 'Good'
          });
      });
    }
}