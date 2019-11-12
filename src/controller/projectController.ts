import { Request, Response, NextFunction } from 'express';
import ProjectService from './../service/projectService';
import UserService from '../service/userService';

export default class ProjectController {
    
    public async updateProjectById (req: Request, res: Response) {
        const body = req.body;
        const service = new ProjectService();

        try {   
            const result = await service.updateProjectById(body);
            // if (result.nModified !== 0) {
                res.status(200).json(result);
            // } else {
            //     res.status(200).json("not updated project");
            // }
        } catch(err) {
            res.status(401).json(err);
        }
    }

    public async updateProjectToUser (req: Request, res: Response) {
        const body = req.body;
        const service = new UserService();

        try {   
            const result = await service.updateProjectToUser(body);
            if (result.nModified !== 0) {
                res.status(200).json("updated");
            } else {
                res.status(200).json("not updated");
            }
        } catch(err) {
            res.status(401).json(err);
        }
    }

    public async addProjectsToUser (req: Request, res: Response) {
        const body = req.body;
        const service = new UserService();

        try {   
            const result = await service.addProjectsToUser(body);
            res.status(200).json(result);

        } catch(err) {
            res.status(401).json(err);
        }
    }

    public async deleteProjectsFromUser (req: Request, res: Response) {
        const body = req.body;
        const service = new UserService();

        try {   
            const result = await service.deleteProjectsFromUser(body);
            res.status(200).json(result);

        } catch(err) {
            res.status(401).json(err);
        }
    }

    public async getProjects (req: Request, res: Response) {
        const service = new ProjectService();
        const result = await service.getProjects();
        res.status(200).json(result);
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
            res.status(200).json(`project with id: ${projectId} not found`);
        }
    }

    public async deleteProject (req: Request, res: Response) {
        const projectId = req.params.id;
        const service = new ProjectService();
        const result = await service.deleteProjectById(projectId);
        
        if (result.deletedCount !== undefined && result.deletedCount > 0) {
            res.status(200).json("project deleted");
        } else {
            res.status(200).json("project was not deleted");
        }
    }

    public async addLocationToProject (req: Request, res: Response) {
        const body = req.body;
        const projectId = req.params.id;
        const service = new ProjectService();

        try {
            const location = await service.addLocationToProject(projectId, body);
            if (location) {
                res.status(200).json(location);
            } else {
                res.status(200).json(location);
            }
        } catch (err) {
            res.status(401).json("Invalid Location");
        }
    }
}