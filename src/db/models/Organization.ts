import mongoose, { Schema, Document } from "mongoose";

// Define Organization schema
interface IOrganization extends Document {
  name: string;
  description: string;
  admin: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  invitations: mongoose.Types.ObjectId[];
}

const OrganizationSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    admin: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    invitations: [{ type: mongoose.Types.ObjectId, ref: "JoinRequest" }],
  },
  { timestamps: true }
);

export default mongoose.model<IOrganization>(
  "Organization",
  OrganizationSchema
);
