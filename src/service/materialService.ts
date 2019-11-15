import { Materials } from "../models/materialSchema";

export default class MaterialService {

    public async getMaterials () {
        return await Materials.find({}, (material) => {
            return material;
        });
    }

    public async addMaterial (body: any) {
        const updatedAt = new Date();
        const { materialName } = body;

        const materialExist = await this.getMaterialByName(materialName);
        if (!materialExist) {
            const material = new Materials({
                name: materialName,
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

    public async deleteMaterial (materialId: string) {
        return await Materials.deleteOne({_id: materialId});
    }
}