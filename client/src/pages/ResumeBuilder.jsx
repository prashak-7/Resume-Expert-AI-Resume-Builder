import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/ColorPicker";
import TemplateSelector from "@/components/ui/TemplateSelector";
import { api } from "../../configs/axios";
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  SaveIcon,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PersonalInfoForm from "@/components/PersonalInfoForm";
import ResumePreview from "@/components/ResumePreview";
import toast from "react-hot-toast";
import ProfessionalSummaryForm from "@/components/ProfessionalSummaryForm";
import ExperienceForm from "@/components/ExperienceForm";
import EducationForm from "@/components/EducationForm";
import ProjectForm from "@/components/ProjectForm";
import SkillsForm from "@/components/SkillsForm";
import { Progress } from "@/components/ui/progress";

const ResumeBuilder = () => {
  const token = localStorage.getItem("token");
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const activeSection = sections[activeSectionIndex];

  const [removeBackground, setRemoveBackground] = useState(false);

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: token },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: {
          Authorization: token,
        },
      });
      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume", error.message);
    }
  };

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume", error);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/dashboard")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-4 items-start justify-between sm:flex-row sm:items-center">
        <Link
          to="/dashboard"
          className="flex items-center gap-1 text-slate-600 hover:text-slate-800 "
        >
          <ArrowLeft size={16} />
          Dashboard
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          <TemplateSelector
            selectedTemplate={resumeData.template}
            onChange={(template) =>
              setResumeData((prev) => ({ ...prev, template }))
            }
          />
          <ColorPicker
            selectedColor={resumeData.accent_color}
            onChange={(accent_color) =>
              setResumeData((prev) => ({ ...prev, accent_color }))
            }
          />
          {resumeData.public && (
            <Button
              onClick={handleShare}
              variant="outline"
              className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-600"
            >
              <Share2Icon />
              Share
            </Button>
          )}
          <Button
            variant="outline"
            className="text-orange-600 hover:text-orange-500 bg-purple-50 hover:bg-purple-100"
            onClick={changeResumeVisibility}
          >
            {resumeData.public ? <EyeIcon /> : <EyeOffIcon />}
            {resumeData.public ? "Public" : "Private"}
          </Button>
          <Button
            variant="outline"
            className="text-green-600 hover:text-green-500 bg-green-50 hover:bg-green-100"
            onClick={downloadResume}
          >
            <DownloadIcon />
            Download
          </Button>
        </div>
      </div>

      <div className=" mt-4  items-start grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-6 lg:gap-8">
        {/* Left Side */}
        <div className="relative">
          <Progress
            value={(activeSectionIndex * 100) / (sections.length - 1)}
            className="w-full absolute top-0 h-1"
          />
          <div className=" bg-white p-6 rounded-md ">
            <div className="flex items-center justify-end gap-2">
              {activeSectionIndex !== 0 && (
                <Button
                  variant="ghost"
                  className={"flex ring-0 items-center gap-1 text-slate-600 bg"}
                  onClick={() =>
                    setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                  }
                >
                  <ChevronLeft />
                  Previous
                </Button>
              )}
              <Button
                variant="ghost"
                className={"flex items-center gap-1 text-slate-600"}
                onClick={() =>
                  setActiveSectionIndex((prev) =>
                    Math.min(prev + 1, sections.length - 1)
                  )
                }
                disabled={activeSectionIndex === sections.length - 1}
              >
                Next
                <ChevronRight />
              </Button>
            </div>

            {activeSection.id === "personal" && (
              <PersonalInfoForm
                data={resumeData.personal_info}
                onChange={(data) => {
                  setResumeData((prev) => ({
                    ...prev,
                    personal_info: data,
                  }));
                }}
                removeBackground={removeBackground}
                setRemoveBackground={setRemoveBackground}
              />
            )}

            {activeSection.id === "summary" && (
              <ProfessionalSummaryForm
                data={resumeData.professional_summary}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    professional_summary: data,
                  }))
                }
                setResumeData={setResumeData}
              />
            )}

            {activeSection.id === "experience" && (
              <ExperienceForm
                data={resumeData.experience}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, experience: data }))
                }
              />
            )}

            {activeSection.id === "education" && (
              <EducationForm
                data={resumeData.education}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, education: data }))
                }
              />
            )}

            {activeSection.id === "projects" && (
              <ProjectForm
                data={resumeData.project}
                onChange={(data) => {
                  setResumeData((prev) => ({
                    ...prev,
                    project: data,
                  }));
                }}
              />
            )}

            {activeSection.id === "skills" && (
              <SkillsForm
                data={resumeData.skills}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, skills: data }))
                }
              />
            )}

            <Button
              className="mt-8 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-500 "
              variant="outline"
              onClick={() =>
                toast.promise(saveResume, { loading: "Saving..." })
              }
            >
              <SaveIcon />
              Save changes
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
