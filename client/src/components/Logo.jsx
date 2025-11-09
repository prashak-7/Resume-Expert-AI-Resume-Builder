import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="/logo.svg"
        alt="Resume Expert Logo"
        className="size-6 md:size-8"
      />
      <span className="text-indigo-600 font-bold md:text-lg">ResumeExpert</span>
    </Link>
  );
};

export default Logo;
