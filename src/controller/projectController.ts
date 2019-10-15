import { Request, Response, NextFunction } from 'express';
import { Projects } from './../models/projectSchema';

export default class ProjectController {

    public async getProjects (req: Request, res: Response) {
        await Projects.find({}, (err, project) => {
            if (!err ) {
                res.json(project)
            } else {
                res.json({
                    message: 'No Projects found!'
                  })
            }
        });
    }

    public async addProject (req: Request, res: Response) {
        const { name, description, phoneNumber, email } = req.body;
        
        const updatedAt = new Date();
        
        try {
            const project = await Projects.findOne({ name: name });
            if (project) {
                res.status(200).json(project);
            } else {
                const project = new Projects({
                    name,
                    description,
                    phoneNumber,
                    email,
                    updatedAt
                });

                await project.save();
                res.status(200).json(project);
            
            }
        } catch(err) {
            res.status(401).json("Invalid Project Id");
        }
    }

    public async getProjectById (req: Request, res: Response) {
        const id = req.params.id;
        await Projects.findOne({ _id: id }, (err, result) => {
            if (err) {
                res.json({
                    message: 'No Project found!' + id    
                  })
            } else {
                res.json(result)
            }
        });
    }

    public async deleteProject (req: Request, res: Response) {
        const id = req.params.id;
        await Projects.deleteOne({_id: id}, (err) => {
            if (err) {
                res.json({
                    status: "error",
                    message: 'Project was not deleted'
                });
            }
                res.json({
                status: "success",
                message: 'Project was deleted'
            });
        });
    }
}