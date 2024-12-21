import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    minlength: 4,
  },
  socialLinks: {
    facebook: String,
    youtube: String,
    instagram: String,
    whatsapp: String,
    tiktok: String,
    wechat: String,
    linkedin: String,
    twitter: String,
    snapchat: String,
    pinterest: String,
    reddit: String,
    telegram: String,
    discord: String,
    quora: String,
    github: String,
    portfolio: String,
    website: String,
    custom: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
