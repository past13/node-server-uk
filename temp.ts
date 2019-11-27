// export default class User {

//     generateHash (password: String) {
//       return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
//     }
  
//     validPassword (password: String) {
//       return bcrypt.compareSync(password, this.password);
//     }
//   }
  
//   UserSchema.loadClass(User);
  
//   UserSchema.methods.generateHash = function(password: String) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
//   }
  
//   UserSchema.methods.validPassword = function(password: String) {
//     return bcrypt.compareSync(password, this.password);
//   }
  
//   export const User = mongoose.model('User', UserSchema);
  



