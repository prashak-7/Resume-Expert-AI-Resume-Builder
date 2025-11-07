import { Download, Shapes, Zap } from "lucide-react";
import React from "react";

const Features = () => {
  const featuresData = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Craft your perfect resume in minutes with our simple, step-by-step process.",
    },
    {
      icon: Shapes,
      title: "Highly customizable",
      description:
        "Customize your resume with AI tools and a range of professional templates.",
    },
    {
      icon: Download,
      title: "Instant Export",
      description:
        "Export your resume as a perfectly formatted PDF in an instant.",
    },
  ];
  return (
    <>
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-semibold text-center mx-auto mt-4">
          Why should you choose{" "}
          <span className="text-indigo-600">ResumeExpert?</span>
        </h2>
        <p class="mt-6 text-slate-600 max-w-xl mx-auto">
          Everything you need to build a standout, professional resume
          effortlessly, designed to impress recruiters and land your dream job
        </p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-16 px-6">
        {featuresData.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`hover:-translate-y-0.5 transition duration-300 ${
                index === 1 ? "p-px rounded-[13px] " : ""
              }`}
            >
              <div className="p-6 rounded-xl space-y-4 border border-indigo-800   max-w-80 w-full">
                <Icon size={48} className="text-indigo-600" />
                <h3 className="text-lg font-medium text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-slate-800 line-clamp-2 pb-4">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Features;
