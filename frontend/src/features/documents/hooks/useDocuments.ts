import { useEffect, useState } from "react";

import { 
  getDocuments,
  uploadDocument,
} from "../api/document.api";

import type { Document } from "../types/document";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);

  const [progress, setProgress] = useState(0);

  async function load() {
    setDocuments(
      await getDocuments()
    );
  }

  async function upload(file: File) {
    await uploadDocument(
      file,
      setProgress
    );

    await load();

    setProgress(0);
  }

  useEffect(() => {
    load();
  }, []);

  return {
    documents,
    progress,
    upload,
  };
}
