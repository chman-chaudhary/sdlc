"use client";

import { createUser, usernameAvailability } from "@/action/user";
import { CheckCircle2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { JSX, useEffect, useState } from "react";
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

const UserForm = () => {
  const { data: session } = useSession();
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    socialLinks: {
      facebook: "",
      youtube: "",
      instagram: "",
      whatsapp: "",
      tiktok: "",
      wechat: "",
      linkedin: "",
      twitter: "",
      snapchat: "",
      pinterest: "",
      reddit: "",
      telegram: "",
      discord: "",
      quora: "",
      github: "",
      portfolio: "",
      website: "",
      custom: "",
    },
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.socialLinks) {
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.name.trim().length === 0) {
      setErrors({
        ...errors,
        name: "Name is required",
      });
      return;
    }
    if (!formData.username || formData.username.length < 4) {
      setErrors({
        ...errors,
        username: "Username is required and should be atleast 4 characters",
      });
      return;
    }
    if (!session?.user?.email) return redirect("/login");
    const response = await createUser(session?.user?.email, formData);
    if (response) {
      alert("User created successfully");
      redirect("/"); // Redirect to home page
    } else {
      alert("Error while creating user");
    }
  };

  const checkUsernameAvailability = async (
    username: string
  ): Promise<boolean> => {
    // Simulate an API call to check username availability
    const response = await usernameAvailability(username);
    return response ?? false;
  };

  useEffect(() => {
    if (formData.username) {
      const response = checkUsernameAvailability(formData.username);
      response.then((res) => {
        setIsUsernameAvailable(res);
      });
    }
  }, [formData.username]);

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
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full p-6 bg-white shadow-xl rounded-lg mt-16"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Information Form
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`mt-1 p-3 w-full border border-gray-300 rounded focus:ring-2 focus:ring-${
                errors.name ? "red" : "blue"
              }-500 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                {errors.name}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              minLength={4}
              className={`mt-1 p-3 w-full border border-gray-300 rounded focus:ring-2 focus:ring-${
                errors.name ? "red" : "blue"
              }-500 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                {errors.username}
              </p>
            )}
            {formData.username &&
              (isUsernameAvailable ? (
                <p className="text-sm text-green-500 mt-1 flex items-center">
                  <CheckCircle2 className="size-4 mr-1" /> {formData.username}{" "}
                  is available
                </p>
              ) : (
                <p className="text-sm text-red-500 mt-1 flex items-center">
                  <X className="size-4 mr-1" /> {formData.username} is already
                  taken
                </p>
              ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Social Links
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.keys(formData.socialLinks).map((key) => (
              <div key={key} className="flex items-center">
                <span className="text-gray-500 mr-3 text-lg">
                  {socialIcons[key]}
                </span>
                <input
                  type="text"
                  name={key}
                  value={(formData.socialLinks as any)[key]}
                  onChange={handleChange}
                  placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
