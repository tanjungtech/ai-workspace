import { useDropzone } from "react-dropzone";

type Props = {
  onUpload(file: File): void;
}

export default function uploadDropzone({
  onUpload,
}: Props) {
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    multiple: false,

    accept: {
      "application/pdf": [],
      "text/plain": [],
    },

    onDrop(files) {
      if (files.length) {
        onUpload(files[0]);
      }
    },
  });
  return (
    <div
      {...getRootProps()}
      className="
        rounded-lg
        border-2
        border-dashed
        p-10
        text-center
        cursor-pointer
      "
    >
      <input {...getInputProps()} />

      Drag PDF or TXT here
    </div>
  );
}
