import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-24 md:mt-32">
      <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">
        <p className="text-xl font-medium max-w-md text-slate-800">
          Join thousands of professionals who landed their dream jobs with our
          platform
        </p>
        <Link
          to="/app"
          className="flex items-center gap-2 rounded py-3 px-8 bg-indigo-600 hover:bg-indigo-700 transition text-white"
        >
          <span>Start Building Now</span>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
