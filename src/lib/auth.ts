import dbConnect from "@/db/dbConnect";
import User from "@/db/Users";
import { getServerSession, User as AuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }: { user: AuthUser }): Promise<any> {
      console.log(user);
      if (!user.email) return false;

      ("use server");
      await dbConnect();
      const existedUser = async () => {
        try {
          const existedUser = await User.findOne({ email: user.email });
          console.log(existedUser);
          return existedUser != null && existedUser != undefined;
        } catch (e) {
          console.log(e);
        }
      };

      if (await existedUser()) return true;

      try {
        const newUser = new User({ ...user });
        const result = await newUser.save();
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};

export const getSession = () => getServerSession();
