import { Request, Response } from 'express';

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
}