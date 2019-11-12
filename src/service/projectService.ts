import { Projects, ProjectSchema } from "../models/projectSchema";
import LocationService from "./locationService";
import CategoryService from "./categoryService";

import MaterialService from "./materialService";
import { model } from "mongoose";

export default class ProjectService {

    public async getProjects () {
        return await Projects.find({}, (project) => {
            return project;
        });
    }

    public async getProjectsById (projectId: []) {
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

    public async updateProjectById(body: any) {
        const { projectId, projectId2, name, description, phoneNumber, email } = body;

        const Project = model('Projects', ProjectSchema);

        let result;

        //1. return specific fields description and name coz of 1 if 0 will return all fields except those two
        // var fields = { 'description': 1, 'name': 1 };
        // result = Projects.findById({_id: projectId }).select(fields);
        
        //2. update those fields 
        // result = Projects.updateOne({ _id: projectId },{$set:{name: name,
                                                                     //email: email}});
        //3. update nested property but overrides all fields
        // result = Projects.updateOne({_id: projectId},{location: { name: name }});

        //4. 
        // const result = Projects.findOneAndUpdate(query, updatedata, {upsert:true}, function(err, doc){
        //     if (err) {
        //         return { error: err }
        //     }
        //     return "success";
        // });

        // result = Projects.update(
        //     { 
        //         _id: projectId,
        //         "location._id": 
        //     },
        //     { 
        //         $set:{n


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

        return Projects.findOneAndUpdate(query, updatedata, {upsert:true}, function(err, doc){
            if (err) {
                return { error: err }
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