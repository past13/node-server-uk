import { Request, Response, NextFunction } from 'express';
import { Materials } from './../models/materialSchema';

import ProjectService from './../service/projectService';
import CategoryService from '../service/categoryService';
import LocationService from '../service/locationService';
import MaterialService from '../service/materialService';

export default class ProjectController {

    public async getProjects (req: Request, res: Response) {
        const service = new ProjectService();
        const project = await service.getProjects();
        
        res.status(200).json(project);
    }

    public async addProject (req: Request, res: Response) {
        const body = req.body;
        const service = new ProjectService();

        try {     
            const result = await service.addProject(body);
            
            if (result !== "projectExist") {
                res.status(200).json(result);
            } else {
                res.status(200).json(result);
            }

        } catch(err) {
            res.status(401).json(err);
        }
    }

    public async getProjectById (req: Request, res: Response) {
        const projectId = req.params.id;

        const service = new ProjectService();
        const project = await service.getProjectById(projectId);
        
        if (project !== null) {
            res.status(200).json(project);
        } else {
            res.status(401).json(`project with id: ${projectId} not found`);
        }
    }

    public async deleteProject (req: Request, res: Response) {
        const projectId = req.params.id;
        const service = new ProjectService();
        const result = await service.deleteProjectById(projectId);
        
        if (result.deletedCount !== undefined && result.deletedCount > 0) {
            res.status(200).json("project deleted");
        } else {
            res.status(401).json("project was not deleted");
        }
    }

    public async getCategries (req: Request, res: Response) {
        const service = new CategoryService();
        const result = await service.getCategories();

        res.status(200).json(result);
    }

    public async addCategory (req: Request, res: Response) {
        const { name } = req.body;
        const service = new CategoryService();
        
        try {
            const result = await service.addCategory(name);
            if (result) {
                res.status(200).json(result);
            } else {                
                res.status(200).json(result);            
            }
        } catch(err) {
            res.status(401).json("Invalid Category Id");
        }
    }

    public async deleteCategory (req: Request, res: Response) {
        const categoryId = req.params.id;

        const service = new CategoryService();
        const result = await service.deleteCategory(categoryId);
        
        if (result.deletedCount !== undefined && result.deletedCount > 0) {
            res.status(200).json("category deleted");
        } else {
            res.status(401).json("category was not deleted");
        }
    } 

    public async getLocations (req: Request, res: Response) {
        const service = new LocationService();
        const result = await service.getLocations();

        res.status(200).json(result);
    }

    public async deleteLocation (req: Request, res: Response) {
        const locationId = req.params.id;

        const service = new LocationService();
        const result = await service.deleteLocationById(locationId);
        
        if (result.deletedCount !== undefined && result.deletedCount > 0) {
            res.status(200).json("location deleted");
        } else {
            res.status(401).json("location was not deleted");
        }
    }

    public async addLocation (req: Request, res: Response) {
        const body = req.body;
        const service = new LocationService();
        
        try {
            const location = await service.addLocation(body);
            if (location) {
                res.status(200).json(location);
            } else {
                res.status(200).json(location);
            }
        } catch (err) {
            res.status(401).json("Invalid Location");
        }
    }
  
    public async getMaterials (req: Request, res: Response) {
        const service = new MaterialService();
        const result = await service.getMaterials();

        res.status(200).json(result);
    }

    public async addMaterial (req: Request, res: Response) {
        const body = req.body;
        const service = new MaterialService();
        
        try {
            const material = await service.addMaterial(body);
            if (material) {
                res.status(200).json(material);
            } else {
                res.status(200).json(material);
            }
        } catch (err) {
            res.status(401).json("Invalid material");
        }
    }

    public async deleteMaterial (req: Request, res: Response) {
        const materialId = req.params.id;
        const service = new MaterialService();

        const result = await service.deletematerial(materialId);

        if (result.deletedCount !== undefined && result.deletedCount > 0) {
            res.status(200).json("material deleted");
        } else {
            res.status(401).json("material was not deleted");
        }
    }
}