// Models/MainModel.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: String,
  age: Number
});

const User = model('User', userSchema);

export default User;
