import { FolderCheck, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div className="mt-3">
          <h3 className="font-bold">Projects</h3>
          <p className="text-gray-600 mt-1 text-sm">Add your projects</p>
        </div>
        <Button
          varient="outline"
          className="bg-green-50 hover:bg-green-100 text-green-600"
          onClick={addProject}
        >
          <PlusIcon />
          Add Project
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="py-8 text-center text-slate-600">
          <FolderCheck size={44} className="mx-auto text-slate-300 mb-2" />
          <p>No projects added yet.</p>
          <p className=" text-sm">Click "Add Project" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <Card className="w-full" key={index}>
              <CardHeader>
                <CardTitle>Project #{index + 1}</CardTitle>
                <CardAction>
                  <Button variant="ghost" onClick={() => removeProject(index)}>
                    <Trash2Icon size={16} className="text-red-400"></Trash2Icon>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <Input
                    type="text"
                    placeholder="Project Name"
                    value={project.name || ""}
                    onChange={(e) =>
                      updateProject(index, "name", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Project Type"
                    value={project.type || ""}
                    onChange={(e) =>
                      updateProject(index, "type", e.target.value)
                    }
                  />
                  <Textarea
                    value={project.description}
                    className="h-28"
                    placeholder="Describe your project"
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
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

export default ProjectForm;
