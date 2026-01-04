import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import { Send, Video } from "lucide-react";
import { toast } from "sonner";
import { Type, User, UserRound, Music} from "lucide-react";
import { getUserSession, verifyToken, getAuthToken } from "@/lib/api/auth";

const AvatarSyncStudio = () => {
  const navigate = useNavigate();

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔐 Ensure user is logged in
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

  // 🚀 Submit Feature-1 Job
  const handleSubmit = async () => {
  if (!audioFile || !videoFile) {
    toast.error("Please upload both audio and video");
    return;
  }

  const user = getUserSession();
  if (!user) {
    toast.error("User not authenticated");
    return;
  }

  const formData = new FormData();
  formData.append("audio", audioFile);
  formData.append("video", videoFile);

  try {
    setIsSubmitting(true);
    const token = getAuthToken();
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    const res = await fetch(
      `http://127.0.0.1:8000/feature1/create-job`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Job creation failed");
    
    toast.success("Job submitted successfully");
    // Small delay to ensure backend processes the job before navigating
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);
  } catch (err) {
    console.error(err);
    toast.error("Failed to submit job");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
            <Video className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">
              Avatar Sync Studio
            </h1>
            <p className="text-muted-foreground">Audio + Video</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Upload your audio and video/image files to generate a lip-synced avatar video.
        </p>
      </div>

      {/* Upload Form */}
      <div className="space-y-8 bg-card rounded-2xl border p-8">
        <FileUpload
  label="Audio File"
  description="MP3, WAV, M4A (Max 50MB)"
  accept={[
    "audio/mpeg",   // mp3
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",    // m4a
  ]}
  icon={<Music className="w-6 h-6" />}
  onFileSelect={setAudioFile}
  selectedFile={audioFile}
/>


        <FileUpload
  label="Video or Image File"
  description="MP4, MOV, JPG, PNG (Max 100MB)"
  accept={[
    "video/mp4",
    "video/quicktime", // mov
    "image/jpeg",
    "image/png",
  ]}
  icon={<Video className="w-6 h-6" />}
  onFileSelect={setVideoFile}
  selectedFile={videoFile}
/>


        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : (
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

export default AvatarSyncStudio;
