import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Materials = mongoose.model('Material', MaterialSchema);