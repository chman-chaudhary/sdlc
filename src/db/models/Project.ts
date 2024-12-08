import mongoose, { Schema, Document } from "mongoose";

// Define Project schema
interface IProject extends Document {
  name: string;
  description: string;
  manager: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
  collaborators: mongoose.Types.ObjectId[];
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    manager: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    organization: {
      type: mongoose.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    collaborators: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
