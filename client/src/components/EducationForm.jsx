import { GraduationCapIcon, PlusIcon, Trash2Icon } from "lucide-react";
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
import { Button } from "./ui/button";

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div className="mt-3">
          <h3 className="font-bold">Education</h3>
          <p className="text-gray-600 mt-1 text-sm">
            Add your education details
          </p>
        </div>
        <Button
          varient="outline"
          className="bg-green-50 hover:bg-green-100 text-green-600"
          onClick={addEducation}
        >
          <PlusIcon />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="py-8 text-center text-slate-600">
          <GraduationCapIcon
            size={44}
            className="mx-auto text-slate-300 mb-2"
          />
          <p>No work experience added yet.</p>
          <p className=" text-sm">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <Card className="w-full" key={index}>
              <CardHeader>
                <CardTitle>Education #{index + 1}</CardTitle>
                <CardAction>
                  <Button
                    variant="ghost"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2Icon size={16} className="text-red-400"></Trash2Icon>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="Institution Name"
                    value={education.institution || ""}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Degree"
                    value={education.degree || ""}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Field of study"
                    value={education.field || ""}
                    onChange={(e) =>
                      updateEducation(index, "field", e.target.value)
                    }
                  />
                  <Input
                    type="month"
                    value={education.graduation_date}
                    onChange={(e) =>
                      updateEducation(index, "graduation_date", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    value={education.gpa}
                    placeholder="GPA"
                    onChange={(e) =>
                      updateEducation(index, "gpa", e.target.value)
                    }
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

export default EducationForm;
