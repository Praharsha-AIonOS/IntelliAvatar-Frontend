// src/lib/api/feature1.ts

export async function createFeature1Job(
  userId: string,
  video: File,
  audio: File
) {
  const formData = new FormData();
  formData.append("video", video);
  formData.append("audio", audio);

  const response = await fetch(
    `http://127.0.0.1:8000/feature1/create-job?user_id=${encodeURIComponent(userId)}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to create job");
  }

  return response.json();
}
