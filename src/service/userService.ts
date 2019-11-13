import { Users } from "../models/userSchema";
import ProjectService from "./projectService";

export default class UserService {

    public async getUsers () {
        return await Users.find({}, (user) => {
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

    public async getUniqProjectsByUserId(userId: string, projectId: any[]) {
        let list: any[] = [];
        const user = await Users.findById({ _id: userId }).lean();

        if (user.projects.length !== 0) {
            user.projects.map(function(project: any) {
                if (!projectId.includes(project._id.toString())) {
                    list.push(project._id);
                }
            });
        } else {
            list = projectId;
        }
        return list;
    }

    public async addProjectsToUser(body: any) {
        const { userId, projectId } = body;
        const service = new ProjectService();
        
        const usersProjectsList = await this.getUniqProjectsByUserId(userId, projectId);
        const projectsExist = await service.getProjectsById(usersProjectsList);
        
        if (projectsExist.length > 0) {
            return await Users.updateMany(
                { _id: userId }, 
                { 
                    $push: { 
                        projects: projectsExist 
                    } 
                }
            );
        } else {
            return "not updated"
        }
    }

    public async deleteProjectFromUser(body: any) {
        const { userId, projectId } = body;
        
        return await Users.updateOne(
            { _id: userId }, {
                $pull: {
                    projects: {
                        _id: {
                            $in: projectId 
                        }
                    }
                }, 
        }, { runValidators: true });
    }    
}