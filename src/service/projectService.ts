import { model } from "mongoose";
import { Projects, ProjectSchema } from "../models/projectSchema";
import LocationService from "./locationService";
import MaterialService from "./materialService";
import CategoryService from "./categoryService";

export default class ProjectService {

    public async getProjects () {
        return await Projects.find({}, (project) => {
            return project;
        });
    }

    public async getProjectByCriteria(filter: any) {
        let query = { $and: Array() };
        if (filter.location !== undefined) { 
            query.$and.push({"location.name": filter.location}); 
        }

        if (filter.category !== undefined) { 
            query.$and.push({"category.name": filter.category}); 
        }

        if (filter.material !== undefined) { 
            query.$and.push({"material.name": filter.material}); 
        }

        console.log(query);
        return await Projects.find(query);
    }

    public async getProjectsById (projectId: any[]) {
        return await Projects.find({_id: { $in: projectId } });
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

    //todo: updateMethod
    public async updateProjectById(body: any) {
        const { projectId, projectId2, name, description, phoneNumber, email } = body;

        const Project = model('Projects', ProjectSchema);

        let result;

        return result;
    }

    public async addLocationToProject (projectId: string, body: any) {
        const { locationName } = body;
        const locationService = new LocationService();

        const location = await locationService.getLocationByName(locationName);

        //replace existing location
        const query = { _id: projectId };
        const updatedata = {
            location: location
        }

        return Projects.findOneAndUpdate(query, updatedata, { upsert:true }, function(err, doc){
            if (err) {
                return { 
                    error: err 
                }
            }
            return doc;
        });
    }

    public async addProject (body: any) {

        const { 
            name, 
            description, 
            phoneNumber, 
            email, 
            locationName, 
            materialName,
            categoryName
        } = body;
        
        const updatedAt = new Date();
        const locationService = new LocationService();
        const materialService = new MaterialService();
        const categoryService = new CategoryService();

        const projectExist = await this.getProjectByName(name);
        const location = await locationService.getLocationByName(locationName);
        const material = await materialService.getMaterialByName(materialName);
        const category = await categoryService.getCategoryByName(categoryName);

        if (!projectExist) {
            const project = new Projects({
                name,
                description,
                phoneNumber,
                email,
                location,
                material,
                category,
                updatedAt
            });
    
            await project.save();
            return project;

        } else {
            return "projectExist";
        }
    }
}