import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import HomeNavbar from "@/components/layout/HomeNavbar";
import FileUpload from "@/components/ui/file-upload";
import { ArrowLeft, Send, Heart, Plus, X } from "lucide-react";
import { toast } from "sonner";

const WishesGenerator = () => {
  const navigate = useNavigate();
  const [names, setNames] = useState<string[]>([]);
  const [currentName, setCurrentName] = useState("");
  const [script, setScript] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const addName = () => {
    if (!currentName.trim()) {
      toast.error("Please enter a name");
      return;
    }
    if (names.length >= 5) {
      toast.error("Maximum 5 names allowed");
      return;
    }
    if (names.includes(currentName.trim())) {
      toast.error("Name already added");
      return;
    }
    setNames([...names, currentName.trim()]);
    setCurrentName("");
  };

  const removeName = (name: string) => {
    setNames(names.filter((n) => n !== name));
  };

const handleSubmit = async () => {
  if (names.length === 0 || !script.trim() || !videoFile) {
    toast.error("Missing inputs");
    return;
  }

  setIsSubmitting(true);

  try {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    const formData = new FormData();
    formData.append("user_id", user.username);
    formData.append("gender", "neutral");
    formData.append("script", script);
    names.forEach((n) => formData.append("names", n));
    formData.append("video", videoFile);

    const res = await fetch(
      "http://127.0.0.1:8000/feature3/personalized-wishes",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Submission failed");
    }

    const data = await res.json();

    toast.success(`${data.jobs_created} jobs queued successfully`);

    // ✅ NAVIGATE ONLY AFTER EVERYTHING IS DONE
    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    toast.error("Failed to submit jobs");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-700 to-indigo-800 flex items-center justify-center shadow-medium">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Personalized Wishes Generator
            </h1>
            <p className="text-muted-foreground">Batch Processing</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Create personalized avatar videos for multiple recipients. Use {"{name}"} in your script as a placeholder.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-8 bg-card rounded-2xl border border-border p-8">
        {/* Names Input */}
        <div className="space-y-4">
          <Label className="text-foreground font-medium">
            Recipient Names ({names.length}/5)
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter a name"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addName()}
              className="h-12 bg-secondary/50 border-border focus:border-primary"
            />
            <Button
              type="button"
              onClick={addName}
              disabled={names.length >= 5}
              className="h-12 px-6"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          {/* Names List */}
          {names.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-secondary/30">
              {names.map((name) => (
                <div key={name}>
                  <Badge variant="secondary" className="px-3 py-2 text-sm gap-2">
                    {name}
                    <button
                      onClick={() => removeName(name)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Script Template */}
        <div className="space-y-2">
          <Label htmlFor="script" className="text-foreground font-medium">
            Script Template
          </Label>
          <Textarea
            id="script"
            placeholder="Hello {name}, wishing you a wonderful day! Use {name} as a placeholder for personalization."
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="min-h-[150px] bg-secondary/50 border-border focus:border-primary resize-none"
          />
          <p className="text-sm text-muted-foreground">
            Use {"{name}"} where you want the recipient's name to appear.
          </p>
        </div>
        {/* Video Upload */}
        <FileUpload
          accept={[
    "video/mp4",
    "video/quicktime",
    "image/png",
    "image/jpeg",
  ]}
          label="Avatar Video or Image"
          description="MP4, MOV, JPG, PNG"
          icon="video"
          onFileSelect={setVideoFile}
          selectedFile={videoFile}
        />
        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting || names.length === 0 || !script.trim() || !videoFile}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit {names.length > 0 ? `${names.length} Job(s)` : "Job"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WishesGenerator;
