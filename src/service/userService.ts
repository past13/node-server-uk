import { Users, UserSchema } from "../models/userSchema";
import ProjectService from "./projectService";
import { Projects, ProjectSchema } from "../models/projectSchema";
import { model } from "mongoose";
import { ObjectID } from "bson";
import { callbackify } from "util";

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

    public async getUserById (userId: string) {
        return await Users.findOne({ _id: userId }, (user) => {
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

    public async updateProjectToUser(body: any) {
        const { userId, projectId } = body;
        const service = new ProjectService();
        
        const userExist = await this.getUserById(userId);
        const projectExist = await service.getProjectById(projectId);

        if (userExist && projectExist) {
            const user = userExist.updateOne({ "projects": projectExist });
            return user;
        } else {
            const user = userExist !== null ? userExist : "user dont exist";
            const project = projectExist !== null ? projectExist : "project dont exist";
            return "erorr smth wrong";
        }
    }

    public async addProjectsToUser(body: any) {
        const { userId, projectId } = body;
        const service = new ProjectService();
        
        const userExist = await this.getUserById(userId);
        const projectsExist = await service.getProjectsById(projectId);

        if (userExist && projectsExist) {
            return userExist.updateOne({$push: {projects: projectsExist}});
        } else {
            return "not updated"
        }
    }

    public async deleteProjectsFromUser(body: any) {
        const { userId, projectId } = body;
        const service = new ProjectService();

        // const userExist = await this.getUserById(userId);
        const projectsExist = await service.getProjectsById(projectId);

        if (projectId.length > 0) {

            const User = model('Users', UserSchema);
            const Project = model('Projects', ProjectSchema);

            // const location = new ObjectID("5dc9562e5b91b11758ccb7fa");
            // const project = new ObjectID("5dc972b59580496d78c00ecf");

            // User.remove({ _id: userId, projects: { $in: projectsExist}}, function(err: any) {
            //     return err;
            // });

            // return User.remove({ _id: userId, projects: { $in: projectId}}, this.nameas);

            //  User.deleteMany({ _id: userId, projects: { $in: projectId}}, function(err) {
            //     return err;
            //  });

        } else {
            return "Test";
        }
    }
}