import { Materials } from "../models/materialSchema";

export default class MaterialService {

    public async getMaterials () {
        return await Materials.find({}, (material) => {
            return material;
        });
    }

    public async addMaterial (body: any) {
        const updatedAt = new Date();
        const { name } = body;
        
        const materialExist = await this.getMaterialByName(name);
        if (!materialExist) {
            const material = new Materials({
                name,
                updatedAt
            });
    
            await material.save();
            return material;

        } else {
            return "materialExist";
        }
    }

    public async getMaterialByName (materialName: string) {
        return await Materials.findOne({ name: materialName }, (material) => {
            return material;
        });
    }

    public async deletematerial (materialId: string) {
        return await Materials.deleteOne({_id: materialId});
    }
}