import mongoose, { Schema, Document } from "mongoose";

// Define User schema
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  organizations: {
    organization: mongoose.Types.ObjectId;
    role: "admin" | "member";
  }[];
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    organizations: [
      {
        organization: {
          type: mongoose.Types.ObjectId,
          ref: "Organization",
          required: true,
        },
        role: { type: String, enum: ["admin", "member"], required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
