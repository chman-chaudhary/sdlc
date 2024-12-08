import mongoose, { Schema, Document } from "mongoose";

// Define JoinRequest schema
interface IJoinRequest extends Document {
  sender: {
    id: mongoose.Types.ObjectId;
    type: "User" | "Organization"; // Sender type
  };
  receiver: {
    id: mongoose.Types.ObjectId;
    type: "User" | "Organization"; // Receiver type
  };
  organization: mongoose.Types.ObjectId; // Always references the related organization
  type: "userToOrg" | "orgToUser"; // Direction of the request
  status: "pending" | "accepted" | "rejected"; // Status of the request
}

const JoinRequestSchema: Schema = new Schema(
  {
    sender: {
      id: { type: mongoose.Types.ObjectId, required: true },
      type: { type: String, enum: ["User", "Organization"], required: true },
    },
    receiver: {
      id: { type: mongoose.Types.ObjectId, required: true },
      type: { type: String, enum: ["User", "Organization"], required: true },
    },
    organization: {
      type: mongoose.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    type: { type: String, enum: ["userToOrg", "orgToUser"], required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IJoinRequest>("JoinRequest", JoinRequestSchema);
