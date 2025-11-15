import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
      placeholder: "Enter your email address",
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
      placeholder: "Enter your phone number",
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
      placeholder: "Enter your location",
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
      placeholder: "Enter your profession",
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: Linkedin,
      type: "url",
      placeholder: "Enter your linkedin profile",
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
      placeholder: "Enter your personal website",
    },
  ];

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <div className="mt-3">
        <h3 className="font-bold">Personal Information</h3>
        <p className="text-gray-600 mt-1 text-sm">
          Let’s start with your personal details.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Label>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 mt-5 text-slate-500 hover:text-slate-700 cursor-pointer">
              <User />
              Upload photo
            </div>
          )}

          <Input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </Label>
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1">
            <p>Remove background</p>
            <Switch
              checked={removeBackground}
              onCheckedChange={() => setRemoveBackground(!removeBackground)}
            />
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <Label className="text-slate-600 mb-2" htmlFor={field.key}>
              <Icon size={16} />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              placeholder={field.placeholder}
              type={field.type}
              id={field.key}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
