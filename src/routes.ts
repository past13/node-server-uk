import { Application } from 'express';
import ProjectController from './controller/projectController';

export class Routes {
    public projectController: ProjectController = new ProjectController();

    public routes(app: Application): void {

        app.post('/users', this.projectController.addUser); 
        app.get('/users', this.projectController.getUsers); 
        app.delete('/users/:id', this.projectController.deleteUser); 

        app.post('/projecttouser', this.projectController.updateProjectToUser); 
        app.post('/addprojectstouser', this.projectController.addProjectsToUser); 
        app.delete('/deleteprojectsfromuser', this.projectController.deleteProjectsFromUser); 

        app.post('/projects', this.projectController.addProject); 
        app.get('/projects', this.projectController.getProjects); 
        app.get('/projects/:id', this.projectController.getProjectById);
        app.delete('/projects/:id', this.projectController.deleteProject); 

        app.post('/categories', this.projectController.addCategory); 
        app.get('/categories', this.projectController.getCategries); 
        app.delete('/categories/:id', this.projectController.deleteCategory); 

        app.post('/locations', this.projectController.addLocation); 
        app.get('/locations', this.projectController.getLocations); 
        app.delete('/locations/:id', this.projectController.deleteLocation); 

        app.post('/materials', this.projectController.addMaterial); 
        app.get('/materials', this.projectController.getMaterials); 
        app.delete('/materials/:id', this.projectController.deleteMaterial); 

    }
}