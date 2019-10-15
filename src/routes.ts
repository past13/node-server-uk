import { Application } from 'express';

import ProjectController from './controller/projectController';

export class Routes {

    public projectController: ProjectController = new ProjectController();

    public routes(app: Application): void {

        app.post('/projects', this.projectController.addProject); 

        app.get('/projects', this.projectController.getProjects); 
        app.get('/projects/:id', this.projectController.getProjectById);
        
        app.delete('/projects/:id', this.projectController.deleteProject); 
    }
}