import bcrypt from 'bcryptjs';
import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface IUsermMethods {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}
type UserModel = Model<IUser, {}, IUsermMethods>;

const userSchema = new Schema<IUser, UserModel, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.method('matchPassword', async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
