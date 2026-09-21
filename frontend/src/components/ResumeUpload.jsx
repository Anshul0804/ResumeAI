import { useState } from "react";
import API from "../api";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  X,
} from "lucide-react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setMessage("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setFile(null);
      setMessage("Please select a PDF file");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");

      const response = await API.post(
        "/resumes/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data);
      setFile(null);
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Resume upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
          <FileText
            className="text-blue-600"
            size={22}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Upload Resume
          </h2>

          <p className="text-sm text-slate-500">
            Upload your resume in PDF format for AI analysis.
          </p>
        </div>

      </div>

      {/* Upload Area */}
      <label
        htmlFor="resume-upload"
        className="group block cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center transition hover:border-blue-300 hover:bg-blue-50/40"
      >

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Upload
            className="text-blue-600 transition group-hover:scale-105"
            size={26}
          />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-slate-800">
          Choose your resume
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Click to browse or select a PDF file
        </p>

        <p className="mt-2 text-[11px] text-slate-400">
          Supported format: PDF
        </p>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

      </label>

      {/* Selected File */}
      {file && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
              <FileText
                className="text-blue-600"
                size={19}
              />
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-slate-800">
                {file.name}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setFile(null)}
            className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700"
          >
            <X size={17} />
          </button>

        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >

        {uploading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={18} />
            Upload Resume
          </>
        )}

      </button>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
            message.toLowerCase().includes("success")
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >

          {message.toLowerCase().includes("success") && (
            <CheckCircle size={17} />
          )}

          {message}

        </div>
      )}

    </div>
  );
}

export default ResumeUpload;