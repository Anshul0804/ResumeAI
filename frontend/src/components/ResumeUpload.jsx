import { useState } from "react";
import API from "../api";
import { Upload, FileText } from "lucide-react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post("/resumes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data);
      setFile(null);
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Resume upload failed");
    }
  };

  return (
    <div className="rounded-xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-3">
          <FileText className="text-blue-600" size={28} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Upload Resume
          </h2>

          <p className="text-sm text-slate-500">
            Upload your resume in PDF format
          </p>
        </div>
      </div>

      <div className="rounded-lg border-2 border-dashed border-slate-300 p-8 text-center">
        <Upload
          className="mx-auto mb-4 text-slate-400"
          size={40}
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mx-auto block"
        />

        {file && (
          <p className="mt-4 text-sm text-slate-600">
            Selected: <span className="font-semibold">{file.name}</span>
          </p>
        )}

        <button
          onClick={handleUpload}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Upload Resume
        </button>

        {message && (
          <p className="mt-4 text-sm font-medium text-slate-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;