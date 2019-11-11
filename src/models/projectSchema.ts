import mongoose from 'mongoose';
import { LocationSchema } from './locationSchema';
import { MaterialSchema } from './materialSchema';

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
  name: String,
  description: String,
  phoneNumber: Number,
  email: String,
  location: LocationSchema,
  material: MaterialSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Projects = mongoose.model('Project', ProjectSchema);