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
    const user = sessionStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = () => {
    if (!pptFile) {
      toast.error("Please upload a PowerPoint file");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      
      const newJob = {
        id: `JOB-${Date.now()}`,
        userId: user.username,
        featureType: "IntelliTutor",
        status: "Queued",
        queuePosition: jobs.length + 1,
        submissionTime: new Date().toISOString(),
        pptFile: pptFile.name,
        avatarFile: avatarFile?.name || "Default Avatar",
        language,
        gender,
      };

      jobs.push(newJob);
      localStorage.setItem("jobs", JSON.stringify(jobs));

      toast.success("Job submitted successfully!");
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1500);
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
          accept={{ "application/vnd.ms-powerpoint": [".ppt"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"] }}
          label="PowerPoint Presentation"
          description="PPT, PPTX (Max 100MB)"
          icon="file"
          onFileSelect={setPptFile}
          selectedFile={pptFile}
        />
        {/* Avatar Upload */}
        <FileUpload
          accept={{ "video/*": [".mp4", ".mov"], "image/*": [".jpg", ".jpeg", ".png"] }}
          label="Avatar Video or Image (Optional)"
          description="MP4, MOV, JPG, PNG - Leave empty for default avatar"
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
