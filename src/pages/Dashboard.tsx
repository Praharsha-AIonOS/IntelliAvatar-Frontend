import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HomeNavbar from "@/components/layout/HomeNavbar";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* ================================
   Types (MATCH BACKEND)
================================ */
interface BackendJob {
  job_id: string;
  user_id: string;
  feature: string;
  input_video: string;
  input_audio: string;
  output_video: string;
  status: "QUEUED" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  created_at: string;
  started_at?: string | null;
  completed_at?: string | null;
}

/* ================================
   UI Job Model (UNCHANGED)
================================ */
interface Job {
  id: string;
  featureType: string;
  status: string;
  submitted: string;
  started: string;
  ended: string;
  duration: string;
  e2e: string;
}

/* ================================
   Time Helpers
================================ */
// 1️⃣ Always parse backend timestamps as UTC
// created_at → already in IST
const parseLocalTimestamp = (ts?: string | null): Date | null => {
  if (!ts) return null;

  const iso = ts.replace(" ", "T"); // NO Z
  const d = new Date(iso);

  return isNaN(d.getTime()) ? null : d;
};

// started_at, completed_at → stored in UTC
const parseUtcTimestamp = (ts?: string | null): Date | null => {
  if (!ts) return null;

  const iso = ts.replace(" ", "T") + "Z"; // force UTC
  const d = new Date(iso);

  return isNaN(d.getTime()) ? null : d;
};

const formatCreatedTime = (ts?: string | null) => {
  const d = parseLocalTimestamp(ts);
  if (!d) return "-";

  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });
};

const formatExecutionTime = (ts?: string | null) => {
  const d = parseUtcTimestamp(ts);
  if (!d) return "-";

  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });
};


// 2️⃣ Display in LOCAL TIME (IST) using 24-hour clock
// const formatLocalTime = (ts?: string | null) => {
//   const d = parseTimestamp(ts);
//   if (!d) return "-";

//   return d.toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false, // ✅ 24-hour clock
//   });
// };


const secondsBetween = (start?: string | null, end?: string | null) => {
  const s = parseUtcTimestamp(start);
  const e = parseUtcTimestamp(end);

  if (!s || !e) return "-";

  const sec = Math.round((e.getTime() - s.getTime()) / 1000);
  return sec >= 0 ? `${sec} sec` : "-";
};



const handleDownload = async (jobId: string) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/feature1/download/${jobId}`
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${jobId}.mp4`; // browser name only
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err: any) {
    alert(err.message);
  }
};



/* ================================
   Component
================================ */
export default function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const e2eTime = (
  created?: string | null,
  completed?: string | null
) => {
  const c = parseLocalTimestamp(created);   // IST
  const e = parseUtcTimestamp(completed);   // UTC → IST later

  if (!c || !e) return "-";

  const sec = Math.round((e.getTime() - c.getTime()) / 1000);

  return sec >= 0 ? `${sec} sec` : "-";
};


  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/feature1/jobs");
      if (!res.ok) throw new Error("Fetch failed");

      const data: BackendJob[] = await res.json();

      const mapped: Job[] = data.map((job) => ({
        id: job.job_id,
        featureType: job.feature || "Avatar Sync Studio",
        status: job.status,
        submitted: formatCreatedTime(job.created_at),
        started: formatExecutionTime(job.started_at),
        ended: formatExecutionTime(job.completed_at),
        duration:
          job.status === "COMPLETED"
            ? secondsBetween(job.started_at, job.completed_at)
            : "-",
        e2e:
          job.status === "COMPLETED"
            ? e2eTime(job.created_at, job.completed_at)
            : "-",
      }));

      setJobs(mapped);
    } catch (err) {
      toast.error("Failed to load jobs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "QUEUED":
        return <Badge variant="secondary">Queued</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-blue-500">Processing</Badge>;
      case "COMPLETED":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "FAILED":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  /* ================================
     RENDER (UI UNCHANGED)
  ================================ */
  return (
    <>
      <HomeNavbar />

      <div className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Job Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage your video generation jobs
            </p>
          </div>

          <Button onClick={loadJobs} disabled={loading}>
            <RefreshCw
              className={cn("mr-2 h-4 w-4", loading && "animate-spin")}
            />
            Refresh
          </Button>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left">Job ID</th>
                <th className="p-4 text-left">Feature Type</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Submitted</th>
                <th className="p-4 text-left">Started</th>
                <th className="p-4 text-left">Ended</th>
                <th className="p-4 text-left">Duration</th>
                <th className="p-4 text-left">E2E Time</th>
                <th className="p-4 text-left">Download</th>
                <th className="p-4 text-left"></th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-muted-foreground">
                    No jobs found
                  </td>
                </tr>
              )}

              {jobs.map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="p-4 font-mono text-sm">{job.id}</td>
                  <td className="p-4">{job.featureType}</td>
                  <td className="p-4">{getStatusBadge(job.status)}</td>
                  <td className="p-4">{job.submitted}</td>
                  <td className="p-4">{job.started}</td>
                  <td className="p-4">{job.ended}</td>
                  <td className="p-4">{job.duration}</td>
                  <td className="p-4">{job.e2e}</td>
                  <td>
  <button
    disabled={job.status !== "COMPLETED"}
    onClick={() => handleDownload(job.id)}
    className={`px-3 py-1 rounded ${
      job.status === "COMPLETED"
        ? "bg-blue-600 text-white"
        : "bg-gray-300 text-gray-600 cursor-not-allowed"
    }`}
  >
    Download
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
