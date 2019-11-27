import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSessionSchema = new Schema({
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Users = mongoose.model('UsersSession', UserSessionSchema);