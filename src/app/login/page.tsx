// /c:/Users/HP/Documents/sdlc/src/app/login/page.tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!session ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-400 flex items-center"
          >
            <FcGoogle className="size-6 mr-5" /> Login with Google
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {session.user?.name}
          </h1>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
