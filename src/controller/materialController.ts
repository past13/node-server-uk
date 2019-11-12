import { Request, Response } from 'express';
import MaterialService from '../service/materialService';

export default class MaterialController {  

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

    public async getMaterials (req: Request, res: Response) {
        const service = new MaterialService();
        const result = await service.getMaterials();
        res.status(200).json(result);
    }

    public async deleteMaterial (req: Request, res: Response) {
        const materialId = req.params.id;
        const service = new MaterialService();

        const result = await service.deletematerial(materialId);

        if (result.deletedCount !== undefined && result.deletedCount > 0) {
            res.status(200).json("material deleted");
        } else {
            res.status(200).json("material was not deleted");
        }
    }    
}