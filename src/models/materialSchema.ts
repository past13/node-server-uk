import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const MaterialSchema = new Schema({
  materialName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Materials = mongoose.model('Material', MaterialSchema);