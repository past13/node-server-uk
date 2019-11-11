import { Categories } from "../models/categorySchema";

export default class CategoryService {

    public async getCategories () {
        return await Categories.find({}, (category) => {
            return category;
        });
    }

    public async getCategoryById (id: string) {
        return await Categories.find({_id: id}, (category) => {
            return category;
        });
    }

    public async getCategoryByName (name: string) {
        return await Categories.find({name: name}, (category) => {
            return category;
        });
    }

    public async deleteCategory (projectId: string) {
        return await Categories.deleteOne({_id: projectId});
    }

    public async addCategory (name: string) {
        const updatedAt = new Date();

        const categorytExist = await this.getCategoryByName(name);
        if (categorytExist.length === 0) {
            const category = new Categories({
                name,
                updatedAt
            });
    
            await category.save();
            return category;

        } else {
            return "projectExist";
        }
    }
}