import { Projects } from "../models/projectSchema";
import LocationService from "./locationService";
import CategoryService from "./categoryService";
import MaterialService from "./materialService";

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
        const { 
            name, 
            description, 
            phoneNumber, 
            email, 
            locationName, 
            materialName 
        } = body;
        
        const updatedAt = new Date();
        const locationService = new LocationService();
        const materialService = new MaterialService();

        const projectExist = await this.getProjectByName(name);
        const location = await locationService.getLocationByName(locationName);
        const material = await materialService.getMaterialByName(materialName);

        if (!projectExist) {
            const project = new Projects({
                name,
                description,
                phoneNumber,
                email,
                location,
                material,
                updatedAt
            });
    
            await project.save();
            return project;

        } else {
            return "projectExist";
        }
    }
}