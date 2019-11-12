import { Request, Response } from 'express';
import UserService from '../service/userService';

export default class UserController {
   
    public async addUser (req: Request, res: Response) {
        const body = req.body;
        const service = new UserService();

        try {     
            const result = await service.addUser(body);
            
            if (result !== "userExist") {
                res.status(200).json(result);
            } else {
                res.status(200).json(result);
            }

        } catch(err) {
            res.status(401).json(err);
        }
    }

    public async getUsers (req: Request, res: Response) {
        const service = new UserService();
        const result = await service.getUsers();
        res.status(200).json(result);
    }

    public async deleteUser (req: Request, res: Response) {
        const userId = req.params.id;
        const service = new UserService();
        const result = await service.deleteUserById(userId);
        res.status(200).json(result);
    }
}