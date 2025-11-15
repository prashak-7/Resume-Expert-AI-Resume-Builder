import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Palette } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Red", value: "#EF4444" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Orange", value: "#F97316" },
    { name: "Pink", value: "#EC4899" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Black", value: "#000000" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2 py-1 flex gap-1 items-center rounded-md border-slate-200 border-2 text-purple-600 hover:text-purple-500 bg-purple-50 hover:bg-purple-100">
        <Palette size={16} />
        Accent
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid grid-cols-4 w-60 gap-1">
        {colors.map((color) => (
          <DropdownMenuItem
            key={color.value}
            className="flex flex-col cursor-pointer"
          >
            <div
              className="size-8 rounded-full flex justify-center items-center"
              style={{ backgroundColor: color.value }}
              onClick={() => onChange(color.value)}
            >
              {selectedColor === color.value && (
                <Check className="text-white" />
              )}
            </div>
            {color.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColorPicker;
