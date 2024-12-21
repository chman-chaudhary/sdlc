"use server";

import dbConnect from "@/db/dbConnect";
import User from "@/db/Users";

export const findUser = async (email: String) => {
  await dbConnect();

  try {
    const user = await User.findOne({ email });
    return user;
  } catch (e) {
    console.log("Error while fetching user", e);
  }
};

export const usernameAvailability = async (username: string) => {
  await dbConnect();

  try {
    const user = await User.findOne({ username });
    return user ? false : true;
  } catch (e) {
    console.log("Error while fetching user", e);
  }
};

export const createUser = async (email: String, data: any) => {
  await dbConnect();

  try {
    const user = await User.updateOne({ email }, data, { upsert: true });
    console.log(user);
    return true && user;
  } catch (e) {
    console.log("Error while creating user", e);
  }
};
