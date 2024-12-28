import mongoose, { Schema, model } from "mongoose";
import { Roles } from "../constants/roles.constant";
import bcrypt from "bcrypt";

export interface IUser {
  firstName: string;   
  lastName: string;   
  email: string;       
  password: string;
  role: Roles;  // for us its EMPLOYEE/MANAGER atm
  manager?: mongoose.Types.ObjectId | null; // ref to another user that is the manager of this user. some manager will not have a manager
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:  { type: String, required: true, select: false }, 
    role: {
      type: String,
      enum: Object.values(Roles),
      required: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Making sure that the password I save in the DB is hashed before inserting it
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

export const UserModel = model<IUser>("User", UserSchema);
