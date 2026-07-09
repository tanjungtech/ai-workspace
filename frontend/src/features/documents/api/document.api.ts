import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function uploadDocument (
  file: File,
  onProgress?: (progress: number) => void
) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress(event) {
        if (!event.total) return;

        onProgress?.(
          Math.round(
            (event.loaded * 100) / event.total
          )
        );
      },
    }
  );

  return data;
}

export async function getDocuments() {
  const { data } = await api.get("/documents");

  return data;
}
