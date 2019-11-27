import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

UserSchema.methods.generateHash = function(password: String) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

UserSchema.methods.validPassword = function(password: String) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);





