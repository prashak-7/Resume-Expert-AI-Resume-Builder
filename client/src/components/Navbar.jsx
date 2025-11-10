import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="z-40 w-full px-4 py-4 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between border-b border-b-gray-300">
      <Logo />
      <div className="flex items-center gap-4">
        <p>Hi, {user.fullName.split(" ")[0]}</p>
        <button
          className="rounded-full border px-6 py-2 bg-slate-100 hover:bg-slate-200 transition"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
