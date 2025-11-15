import { api } from "../../configs/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Loader2, SparklesIcon } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const token = localStorage.getItem("token");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div className="mt-3">
          <h3 className="font-bold">Professional Summary</h3>
          <p className="text-gray-600 mt-1 text-sm">
            Add a overview that summarizes your skills and experience.
          </p>
        </div>
        <Button disabled={isGenerating} onClick={generateSummary}>
          {isGenerating ? (
            <Loader2 className="animate-spin" />
          ) : (
            <SparklesIcon />
          )}
          AI Enhance
        </Button>
      </div>

      <div className="mt-6">
        <Textarea
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
          className="h-38"
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-slate-600 text-xs mt-4 text-center">
          Tip: Keep your summary brief (3–4 sentences) and highlight your most
          relevant skills and accomplishments.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
