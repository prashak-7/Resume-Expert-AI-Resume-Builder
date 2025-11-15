import { api } from "../../configs/axios";
import {
  BriefcaseIcon,
  Loader2,
  PlusIcon,
  SparklesIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const ExperienceForm = ({ data, onChange }) => {
  const token = localStorage.getItem("token");
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index];
    const prompt = `Enhance this job description ${experience.description} for the postion of ${experience.position} at ${experience.company}`;

    try {
      const { data } = await api.post(
        "api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      updateExperience(index, "description", data.enhancedContent);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div className="mt-3">
          <h3 className="font-bold">Professional Experience</h3>
          <p className="text-gray-600 mt-1 text-sm">Add your job experience</p>
        </div>
        <Button
          varient="outline"
          className="bg-green-50 hover:bg-green-100 text-green-600"
          onClick={addExperience}
        >
          <PlusIcon />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="py-8 text-center text-slate-600">
          <BriefcaseIcon size={44} className="mx-auto text-slate-300 mb-2" />
          <p>No work experience added yet.</p>
          <p className=" text-sm">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <Card className="w-full" key={index}>
              <CardHeader>
                <CardTitle>Experience #{index + 1}</CardTitle>
                <CardAction>
                  <Button
                    variant="ghost"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2Icon size={16} className="text-red-400"></Trash2Icon>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="Company name"
                    value={experience.company || ""}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Job title"
                    value={experience.position || ""}
                    onChange={(e) =>
                      updateExperience(index, "position", e.target.value)
                    }
                  />
                  <Input
                    type="month"
                    value={experience.start_date}
                    onChange={(e) =>
                      updateExperience(index, "start_date", e.target.value)
                    }
                  />
                  <Input
                    type="month"
                    className="disabled:bg-slate-200"
                    value={experience.end_date}
                    onChange={(e) =>
                      updateExperience(index, "end_date", e.target.value)
                    }
                    disabled={experience.is_current}
                  />
                  <label className={"flex items-center gap-2"}>
                    <input
                      type="checkbox"
                      checked={experience.is_current || false}
                      onChange={(e) => {
                        updateExperience(
                          index,
                          "is_current",
                          e.target.checked ? true : false
                        );
                      }}
                      className="rounded bg-red-400 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Currently working here
                    </span>
                  </label>
                </div>

                <div className="mt-2">
                  <div className="flex items-center justify-between mb-3">
                    <Label id="description">Job Description</Label>
                    <Button
                      className="flex items-center gap-2"
                      disabled={
                        generatingIndex === index ||
                        !experience.position ||
                        !experience.company
                      }
                      onClick={() => generateDescription(index)}
                    >
                      {generatingIndex === index ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <SparklesIcon />
                      )}
                      AI Enhance
                    </Button>
                  </div>
                  <Textarea
                    id="description"
                    value={experience.description || ""}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    className="h-24"
                    placeholder="Summarize your core responsibilities and key accomplishments"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
