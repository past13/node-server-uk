import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: String,
  country: String,
  city: String,
  address: String,
  postCode: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Locations = mongoose.model('Location', LocationSchema);