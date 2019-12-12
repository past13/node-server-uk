import mongoose from 'mongoose';
import { LocationSchema } from './locationSchema';
import { MaterialSchema } from './materialSchema';
import { CategorySchema } from './categorySchema';
const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
  projectName: String,
  type: String,
  description: String,
  phoneNumber: Number,
  email: String,
  location: LocationSchema,
  material: MaterialSchema,
  category: CategorySchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Projects = mongoose.model('Project', ProjectSchema);