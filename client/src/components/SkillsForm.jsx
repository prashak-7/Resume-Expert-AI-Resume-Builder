import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlusIcon, SparklesIcon, XIcon } from "lucide-react";
import { Badge } from "./ui/badge";

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 justify-between">
        <div className="mt-3">
          <h3 className="font-bold">Skills</h3>
          <p className="text-gray-600 mt-1 text-sm">
            Add your tech and soft skills
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Input
            className="flex-1"
            placeholder="Enter your skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button onClick={addSkill} disabled={!newSkill.trim()}>
            <PlusIcon />
            Add
          </Button>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="flex gap-2">
          {data.map((skill, index) => (
            <Badge
              key={index}
              className="bg-indigo-100 text-indigo-600 flex items-center gap-2 px-2 py-1"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="hover:bg-indigo-200 rounded-full p-1"
              >
                <XIcon size={14} />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-slate-600">
          <SparklesIcon size={44} className="mx-auto text-slate-300 mb-2" />
          <p>No skills added yet.</p>
          <p className=" text-sm">Add your technical and soft skills above</p>
        </div>
      )}
      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-md">
        <strong>Tip:</strong> Showcase 8–12 important skills, balancing tech
        abilities with strengths like communication and leadership
      </div>
    </div>
  );
};

export default SkillsForm;
