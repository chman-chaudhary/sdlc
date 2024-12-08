"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center border-b-[0.5px] border-gray-400/60 px-3 py-2">
      <span className="text-4xl">Navbar</span>
      <span>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback>
                  {session.user?.name?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn()}>Log In</Button>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
