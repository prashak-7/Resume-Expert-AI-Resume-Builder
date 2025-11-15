import { useEffect, useState } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  FileEdit,
  FilePlus2,
  Loader2,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/ResumeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const {
    loading,
    resumes,
    createResume,
    deleteResume,
    editResumeTitle,
    loadResumes,
  } = useResume();
  const [showEditResume, setShowEditResume] = useState(false);
  const navigate = useNavigate();

  const handleEditResume = (resumeId, title) => {
    if (!title) return toast.error("Please provide a title for your resume");
    editResumeTitle(resumeId, title);
    setShowEditResume(false);
  };

  useEffect(() => {
    loadResumes();
  }, []);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50 overflow-hidden">
        <Loader2 className="animate-spin size-10 text-indigo-600" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl">Your resumes</h2>
        <p className="text-slate-600">
          {resumes.length !== 0
            ? `You have ${resumes.length} resume`
            : "Start building your professional resumes"}
        </p>
      </div>

      {resumes.length !== 0 ? (
        <div className="mt-6 grid grid-cols-2 sm:flex flex-wrap gap-4 ">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <button
                  className="w-full sm:px-6 bg-white sm:max-w-full h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setTitle("")}
                >
                  <FilePlus2 className="text-indigo-400 group-hover:text-indigo-600" />
                  <p>New Resume</p>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Resume</DialogTitle>
                  <DialogDescription>
                    Give your resume a title to get started. You can customize
                    everything later.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Resume Title</Label>
                    <Input
                      id="name-1"
                      name="name"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter resume title"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" onClick={() => createResume(title)}>
                    Create Resume
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          {resumes.map((resume) => (
            <div
              key={resume._id}
              onClick={() => {
                navigate(`/dashboard/builder/${resume._id}`);
              }}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer bg-linear-to-br from-indigo-100 to-indigo-300"
            >
              <div
                className="absolute top-3 right-2 flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2Icon className="size-5 text-slate-600 hover:scale-110" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your resume.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600 transition-all duration-200"
                        onClick={() => deleteResume(resume._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Dialog open={showEditResume} onOpenChange={setShowEditResume}>
                  <form>
                    <DialogTrigger asChild>
                      <PencilIcon className="size-5 text-slate-600 hover:scale-110" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Resume Title</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="name-1">Resume Title</Label>
                          <Input
                            id="name-1"
                            name="name"
                            placeholder="Enter resume title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowEditResume(false)}
                        >
                          Cancel
                        </Button>

                        <Button
                          type="submit"
                          onClick={() => handleEditResume(resume._id, title)}
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>

              <FileEdit className="text-slate-600 group-hover:scale-110 transition" />
              <p className="text-slate-600 group-hover:scale-110 transition">
                {resume.title}
              </p>
              <p className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center">
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-12 text-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia className="rounded-full bg-indigo-100 p-4">
                <FilePlus2 className="text-indigo-600" />
              </EmptyMedia>
              <EmptyTitle className="text-xl">No Resumes Yet</EmptyTitle>
              <EmptyDescription className="text-md">
                You haven't created any resumes yet. Start building your
                professional resume to land your dream job.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-indigo-600 hover:bg-indigo-500 hover:text-white text-white text-md py-4"
                      onClick={() => setTitle("")}
                    >
                      Create Your First Resume
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Resume</DialogTitle>
                      <DialogDescription>
                        Give your resume a title to get started. You can
                        customize everything later.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name-1">Resume Title</Label>
                        <Input
                          id="name-1"
                          name="name"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter resume title"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" onClick={() => createResume(title)}>
                        Create Resume
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
            </EmptyContent>
          </Empty>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
