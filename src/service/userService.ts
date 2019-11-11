import { Users } from "../models/userSchema";
import { ProjectSchema } from "../models/projectSchema";

export default class UserService {

    public async getUsers () {
        return await Users.findOne({}, (user) => {
            return user;
        });
    }

    public async getUserByName (userName: string) {
        return await Users.findOne({ name: userName }, (user) => {
            return user;
        });
    }

    public async addUser (body: any) {
        const { 
            firstName, 
            lastName          
        } = body;

        const updatedAt = new Date();
        const userExist = await this.getUserByName(firstName);
        if (!userExist) {
            const user = new Users({
                firstName,
                lastName,
                updatedAt
            });
    
            await user.save();
            return user;

        } else {
            return "userExist";
        }
    }

    public async deleteUserById (userId: string) {
        return await Users.deleteOne({_id: userId});
    }
}