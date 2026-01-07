import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HomeNavbar from "@/components/layout/HomeNavbar";
import FileUpload from "@/components/ui/file-upload";
import { ArrowLeft, Send, GraduationCap, User, UserRound } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getUserSession, verifyToken, getAuthToken } from "@/lib/api/auth";

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "hi", label: "Hindi" },
  { value: "zh", label: "Chinese" },
];

const IntelliTutor = () => {
  const navigate = useNavigate();
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("en");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = getUserSession();
      if (!user) {
        const result = await verifyToken();
        if (!result.valid) {
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async () => {
    if (!pptFile) {
      toast.error("Please upload a PowerPoint file");
      return;
    }
    if (!avatarFile) {
      toast.error("Please upload a face video");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      toast.error("Authentication required");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("ppt", pptFile);
      formData.append("face_video", avatarFile);
      formData.append("language", language);
      formData.append("gender", gender);

      const res = await fetch("http://127.0.0.1:8000/feature4/create-job", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Job submission failed");
      }

      toast.success("Job submitted successfully!");
      // Small delay to ensure backend writes the job before dashboard loads
      setTimeout(() => navigate("/dashboard"), 150);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-800 to-indigo-900 flex items-center justify-center shadow-medium">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              IntelliTutor
            </h1>
            <p className="text-muted-foreground">AI Lecture Generator</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Convert your PowerPoint presentations into engaging lecture videos with AI-powered avatar presenters.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-8 bg-card rounded-2xl border border-border p-8">
        {/* PPT Upload */}
        <FileUpload
          accept={{
            "application/vnd.ms-powerpoint": [".ppt"],
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
          }}
          label="PowerPoint Presentation"
          description="PPT, PPTX (Max 100MB)"
          icon="file"
          onFileSelect={setPptFile}
          selectedFile={pptFile}
        />
        {/* Face Video Upload */}
        <FileUpload
          accept={{ "video/*": [".mp4", ".mov", ".mkv", ".avi"] }}
          label="Talking-Head Video"
          description="MP4, MOV, MKV, AVI (Max 200MB)"
          icon="video"
          onFileSelect={setAvatarFile}
          selectedFile={avatarFile}
        />
        {/* Language Selection */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-12 bg-secondary/50 border-border">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Gender Selection */}
        <div className="space-y-4">
          <Label className="text-foreground font-medium">Select Voice Gender</Label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setGender("male")}
              className={cn(
                "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-300",
                gender === "male"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
                gender === "male" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              )}>
                <User className="w-7 h-7" />
              </div>
              <span className={cn(
                "font-medium",
                gender === "male" ? "text-primary" : "text-muted-foreground"
              )}>Male</span>
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              className={cn(
                "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-300",
                gender === "female"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
                gender === "female" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              )}>
                <UserRound className="w-7 h-7" />
              </div>
              <span className={cn(
                "font-medium",
                gender === "female" ? "text-primary" : "text-muted-foreground"
              )}>Female</span>
            </button>
          </div>
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting || !pptFile}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Generate Lecture Video
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default IntelliTutor;
