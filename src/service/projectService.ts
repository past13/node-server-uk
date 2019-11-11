import { Projects } from "../models/projectSchema";

export default class ProjectService {

    public async getProjects () {
        return await Projects.find({}, (project) => {
            return project;
        });
    }

    public async getProjectById (projectId: string) {
        return await Projects.findOne({ _id: projectId }, (project) => {
            return project;
        });
    }

    public async getProjectByName (projectName: string) {
        return await Projects.findOne({ name: projectName }, (project) => {
            return project;
        });
    }

    public async deleteProjectById (projectId: string) {
        return await Projects.deleteOne({_id: projectId});
    }

    public async addProject (body: any) {
        const { name, description, phoneNumber, email } = body;
        const updatedAt = new Date();

        const projectExist = await this.getProjectByName(name);
        
        if (!projectExist) {
            const project = new Projects({
                name,
                description,
                phoneNumber,
                email,
                updatedAt
            });
    
            await project.save();
            return project;

        } else {
            return "projectExist";
        }
    }
}