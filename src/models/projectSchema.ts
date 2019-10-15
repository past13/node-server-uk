import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
  name: String,
  description: String,
  phoneNumber: Number,
  email: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Projects = mongoose.model('Project', ProjectSchema);