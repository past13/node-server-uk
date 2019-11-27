import { Application } from 'express';
import ProjectController from './controller/projectController';
import LocationController from './controller/locationController';
import CategoryController from './controller/categoryController';
import MaterialController from './controller/materialController';
import UserController from './controller/userController';

export class Routes {
    public projectController: ProjectController = new ProjectController();
    public locationController: LocationController = new LocationController();
    public categoryController: CategoryController = new CategoryController();
    public materialController: MaterialController = new MaterialController();
    public userController: UserController = new UserController();

    public routes(app: Application): void {

        app.post('/account/signup', this.userController.signUpUser); 
        

        // app.get('/users', this.userController.getUsers); 
        // app.delete('/users/:id', this.userController.deleteUser); 
        // app.post('/addprojectstouser', this.userController.addProjectsToUser); 
        // app.delete('/deleteprojectsfromuser/:id', this.userController.deleteProjectFromUser); 

        // app.post('/projecttouser', this.projectController.updateProjectToUser); 
        // app.delete('/deleteprojectsfromuser', this.projectController.deleteProjectsFromUser); 

        app.post('/projects', this.projectController.addProject); 
        app.put('/projects/:id', this.projectController.updateProjectById)
        app.get('/projects', this.projectController.getProjects); 
        app.get('/projects/:id', this.projectController.getProjectById);
        app.delete('/projects/:id', this.projectController.deleteProject); 

        app.post('/filterProjects', this.projectController.getFilteredProjects); 
        
        app.put('/addlocationtoprojects/:id', this.projectController.addLocationToProject)
        
        app.post('/categories', this.categoryController.addCategory); 
        app.get('/categories', this.categoryController.getCategries); 
        app.put('/categories/:id', this.categoryController.updateCategory)
        app.delete('/categories/:id', this.categoryController.deleteCategory); 

        app.post('/locations', this.locationController.addLocation); 
        app.get('/locations', this.locationController.getLocations); 
        app.delete('/locations/:id', this.locationController.deleteLocation); 

        app.post('/materials', this.materialController.addMaterial); 
        app.get('/materials', this.materialController.getMaterials); 
        app.delete('/materials/:id', this.materialController.deleteMaterial); 

    }
}