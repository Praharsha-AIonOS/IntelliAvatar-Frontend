import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "@/components/ui/file-upload";
import { Send, Type, User, UserRound } from "lucide-react";
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

const TextToAvatarStudio = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔐 Auth guard
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    if (!videoFile) {
      toast.error("Please upload a video or image file");
      return;
    }

    // ✅ Safe user email extraction
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      toast.error("User not authenticated");
      return;
    }

    let userEmail = "";
    try {
      const parsed = JSON.parse(storedUser);
      userEmail = parsed.email ?? "";
    } catch {
      userEmail = storedUser;
    }

    if (!userEmail) {
      toast.error("User email not found");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("user_id", userEmail);
      formData.append("text", text);
      formData.append("gender", gender);
      formData.append("video", videoFile);

      const response = await fetch(
        "http://127.0.0.1:8000/feature2/text-to-avatar",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Job submission failed");
      }

      toast.success("Job submitted successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shadow-medium">
            <Type className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Text-to-Avatar Studio
            </h1>
            <p className="text-muted-foreground">Text to Speech</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Convert your text into speech and generate avatar videos with realistic
          voice synthesis.
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-6 bg-card rounded-2xl border border-border p-8">
          <div className="space-y-2">
            <Label>Text Prompt</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px]"
              placeholder="Enter the text you want to convert to speech..."
            />
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
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
        </div>

        {/* Right */}
        <div className="space-y-6 bg-card rounded-2xl border border-border p-8">
          <Label>Select Gender</Label>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setGender("male")}
              className={cn(
                "p-6 border-2 rounded-xl",
                gender === "male" && "border-primary bg-primary/5"
              )}
            >
              <User className="mx-auto mb-2" /> Male
            </button>

            <button
              onClick={() => setGender("female")}
              className={cn(
                "p-6 border-2 rounded-xl",
                gender === "female" && "border-primary bg-primary/5"
              )}
            >
              <UserRound className="mx-auto mb-2" /> Female
            </button>
          </div>

          {/* ✅ FIXED FileUpload */}
          <FileUpload
  label="Avatar Video or Image"
  description="Upload MP4, MOV, JPG or PNG file"
  accept={[
    "video/mp4",
    "video/quicktime",
    "image/png",
    "image/jpeg",
  ]}
  icon={<User className="w-6 h-6" />}
  onFileSelect={setVideoFile}
  selectedFile={videoFile}
/>

        </div>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Job
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TextToAvatarStudio;
