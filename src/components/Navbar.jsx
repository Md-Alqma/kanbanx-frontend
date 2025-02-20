import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import useAuthStore from "@/store/authStore";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, isAuthenticated, logout, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <div className="flex justify-between p-4">
      <h2 className="text-xl font-black">KanbanX</h2>
      <div className="flex items-center px-2 gap-4">
        {isAuthenticated ? (
          <>
            <Input type="search" placeholder="search" />
            <Avatar onClick={logout}>
              <AvatarFallback>Me</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            <Link to="/register">
              <Button variant="outline">Register</Button>
            </Link>

            <Link to="/login">
              <Button variant="default">Login</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
