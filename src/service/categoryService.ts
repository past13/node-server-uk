import { Categories } from "../models/categorySchema";

export default class CategoryService {

    public async getCategories () {
        return await Categories.find({}, (category) => {
            return category;
        });
    }

    public async getCategoryById (id: string) {
        return await Categories.find({ _id: id }, (category) => {
            return category;
        });
    }

    public async getCategoryByName (categoryName: string) {
        return await Categories.find({ categoryName: categoryName }, (category) => {
            return category;
        });
    }

    public async deleteCategory (projectId: string) {
        return await Categories.deleteOne({ _id: projectId });
    }

    public async updateCategory (categoryId: string, categoryName: string) {
        return Categories.updateOne(
            { _id: categoryId },
            { $set: { name: categoryName } }
        );
    }

    public async addCategory (categoryName: string) {
        const updatedAt = new Date();

        const categorytExist = await this.getCategoryByName(categoryName);
        if (categorytExist.length === 0) {
            const category = new Categories({
                name: categoryName,
                updatedAt
            });
    
            await category.save();
            return category;

        } else {
            return "categoryExist";
        }
    }
}