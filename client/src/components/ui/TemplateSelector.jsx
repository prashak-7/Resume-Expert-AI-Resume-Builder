import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { LayoutTemplateIcon } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A traditional, well-structured resume with clean design and professional type.",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "A sleek layout with smart color accents and stylish modern fonts.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview:
        "A minimal layout featuring a single image and crisp, modern typography.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "An ultra-clean layout that keeps your content in the spotlight.",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2 py-1 flex gap-1 items-center border-slate-200 border-2 rounded-md text-indigo-600 hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-100">
        <LayoutTemplateIcon size={16} />
        Template
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {templates.map((template) => (
          <DropdownMenuItem
            key={template.id}
            className={`w-xs flex items-start flex-col gap-1 cursor-pointer ${
              selectedTemplate === template.name && "bg-stone-100"
            }`}
            onClick={() => onChange(template.id)}
          >
            <h4 className="font-semibold">{template.name}</h4>
            <p className="p-2 bg-indigo-100/50 rounded-md text-xs not-italic">
              {template.preview}
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TemplateSelector;
