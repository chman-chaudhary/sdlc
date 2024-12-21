import { findUser } from "@/action/user";
import { EditIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { JSX } from "react";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaWeixin,
  FaLinkedin,
  FaTwitter,
  FaSnapchat,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaDiscord,
  FaQuora,
  FaGlobe,
  FaLink,
  FaGithub,
} from "react-icons/fa";

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    return null;
  }
  const user = await findUser(session.user?.email!);
  console.log(user);
  const socialIcons: { [key: string]: JSX.Element } = {
    facebook: <FaFacebook />,
    youtube: <FaYoutube />,
    instagram: <FaInstagram />,
    whatsapp: <FaWhatsapp />,
    tiktok: <FaTiktok />,
    wechat: <FaWeixin />,
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    snapchat: <FaSnapchat />,
    pinterest: <FaPinterest />,
    reddit: <FaReddit />,
    telegram: <FaTelegram />,
    discord: <FaDiscord />,
    quora: <FaQuora />,
    github: <FaGithub />,
    portfolio: <FaGlobe />,
    website: <FaGlobe />,
    custom: <FaLink />,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <form className="max-w-2xl w-full p-6 bg-white shadow-xl rounded-lg mt-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Information Form
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-2 flex flex-col justify-center items-center space-y-2">
            <div className="flex items-center mt-1">
              <img
                src={session.user?.image!}
                alt="Profile Picture"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
          </div>

          <div className="col-span-2 flex justify-center items-center">
            <Link
              href={"/info"}
              className="flex items-center bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              <EditIcon className="size-4 mr-2" /> Edit Details
            </Link>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              readOnly
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="name"
              value={user.email}
              readOnly
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              readOnly
              minLength={4}
              className="mt-1 p-3 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Social Links
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.keys(user.socialLinks)
              .filter((key) => user.socialLinks[key] !== "")
              .map((key) => (
                <div key={key} className="flex items-center">
                  <span className="text-gray-500 mr-3 text-lg">
                    {socialIcons[key]}
                  </span>
                  <input
                    type="text"
                    name={key}
                    value={(user.socialLinks as any)[key]}
                    readOnly
                    placeholder={`${
                      key.charAt(0).toUpperCase() + key.slice(1)
                    }`}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
}
