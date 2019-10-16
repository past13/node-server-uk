import { Request, Response, NextFunction } from 'express';
import { Projects } from './../models/projectSchema';
import { Categories } from './../models/categorySchema';
import { Locations } from './../models/locationSchema';

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

    public async addCategory (req: Request, res: Response) {
        const { name } = req.body;
        
        const updatedAt = new Date();
        
        try {
            const category = await Categories.findOne({ name: name });
            if (category) {
                res.status(200).json(category);
            } else {
                const category = new Categories({
                    name,
                    updatedAt
                });

                await category.save();
                res.status(200).json(category);
            
            }
        } catch(err) {
            res.status(401).json("Invalid Category Id");
        }
    }

    public async deleteCategory (req: Request, res: Response) {
        const id = req.params.id;
        await Categories.deleteOne({_id: id}, (err) => {
            if (err) {
                res.json({
                    status: "error",
                    message: 'Category was not deleted'
                });
            }
                res.json({
                status: "success",
                message: 'Category was deleted'
            });
        });
    }

    public async getCategries (req: Request, res: Response) {
        await Categories.find({}, (err, category) => {
            if (!err ) {
                res.json(category)
            } else {
                res.json({
                    message: 'No categories found!'
                  })
            }
        });
    }

    public async addLocation (req: Request, res: Response) {
        const { name, country, city, address, postCode } = req.body;
        const updatedAt = new Date();
        
        try {
            const location = await Locations.findOne({ name: name });
            if (location) {
                res.status(200).json(location);
            } else {

                const location = new Locations({
                    name,
                    country,
                    city,
                    address,
                    postCode,
                    updatedAt
                });

                await location.save();
                res.status(200).json(location);
            
            }
        } catch (err) {
            res.status(401).json("Invalid Location");
        }
    }

    public async deleteLocation (req: Request, res: Response) {
        const id = req.params.id;
        await Locations.deleteOne({_id: id}, (err) => {
            if (err) {
                res.json({
                    status: "error",
                    message: 'Location was not deleted'
                });
            }
                res.json({
                status: "success",
                message: 'Location was deleted'
            });
        });
    }

    public async getLocations (req: Request, res: Response) {
        await Locations.find({}, (err, location) => {
            if (!err ) {
                res.json(location)
            } else {
                res.json({
                    message: 'No Location found!'
                  })
            }
        });
    }
}