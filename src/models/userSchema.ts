import { ProjectSchema } from './projectSchema';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  projects: [ProjectSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Users = mongoose.model('Users', UserSchema);