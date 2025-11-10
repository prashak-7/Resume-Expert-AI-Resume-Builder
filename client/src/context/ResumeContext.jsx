import { api } from "../../configs/axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(resumes);

  const navigate = useNavigate();

  const loadResumes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You are not authenticated");
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: token,
        },
      });
      setResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (title) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You are not authenticated");
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        {
          title,
        },
        {
          headers: { Authorization: token },
        }
      );
      setResumes([...resumes, data.resume]);
      navigate(`/dashboard/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You are not authenticated");
    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: {
          Authorization: token,
        },
      });
      setResumes(resumes.filter((resume) => resume._id !== resumeId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        loading,
        resumes,
        setResumes,
        loadResumes,
        createResume,
        deleteResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume was used outside of ResumeProvider");
  return context;
};
