import { Request, Response } from 'express';
import CategoryService from '../service/categoryService';

export default class CategoryController {
    
    public async addCategory (req: Request, res: Response) {
        const { categoryName } = req.body;
        const service = new CategoryService();
        try {
            const result = await service.addCategory(categoryName);

            if (result) {
                res.status(200).json(result);
            } else {                
                res.status(200).json(result);            
            }
        } catch(err) {
            res.status(401).json("Invalid Category Id");
        }
    }

    public async getCategries (req: Request, res: Response) {
        const service = new CategoryService();
        const result = await service.getCategories();

        res.status(200).json(result);
    }

    public async updateCategory (req: Request, res: Response) {
        const cateogryId = req.params.id;
        const { categoryName } = req.body;

        const service = new CategoryService();
        const result = await service.updateCategory(cateogryId, categoryName);

        res.status(200).json(result);
    } 

    public async deleteCategory (req: Request, res: Response) {
        const categoryId = req.params.id;

        const service = new CategoryService();
        const result = await service.deleteCategory(categoryId);
        
        if (result.deletedCount !== undefined && 
            result.deletedCount > 0) {

            res.status(200).json("category deleted");
        } else {
            res.status(200).json("category was not deleted");
        }
    } 
}