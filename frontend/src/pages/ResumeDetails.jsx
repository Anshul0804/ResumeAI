import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Calendar,
  FileType,
  Loader2,
  Sparkles,
} from "lucide-react";
import API from "../api";

function ResumeDetails() {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/resumes/${resumeId}`)
      .then((response) => {
        setResume(response.data);
      })
      .catch((error) => {
        console.error("Resume Details Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [resumeId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2
            className="mx-auto animate-spin text-blue-600"
            size={30}
          />

          <p className="mt-3 text-sm text-slate-500">
            Loading resume details...
          </p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
            <FileText className="text-red-500" size={26} />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Resume not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            We couldn't find the requested resume.
          </p>

          <button
            onClick={() => navigate("/my-resumes")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to My Resumes
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="px-4 py-6 sm:px-6 lg:px-8">

          <button
            onClick={() => navigate("/my-resumes")}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to My Resumes
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <FileText
                  className="text-blue-600"
                  size={25}
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-600">
                  Resume Details
                </p>

                <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {resume.fileName}
                </h1>
              </div>

            </div>

            <button
              onClick={() => navigate(`/analysis/${resume.id}`)}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Sparkles size={17} />
              View Analysis
            </button>

          </div>

        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          {/* Resume Information */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <FileText
                    className="text-blue-600"
                    size={19}
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    File Name
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                    {resume.fileName}
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                  <FileType
                    className="text-violet-600"
                    size={19}
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    File Type
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {resume.fileType}
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <Calendar
                    className="text-emerald-600"
                    size={19}
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Resume ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    #{resume.id}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Extracted Text */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

              <h2 className="text-lg font-semibold text-slate-900">
                Extracted Resume Text
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Text extracted from your uploaded PDF.
              </p>

            </div>

            <div className="max-h-[600px] overflow-y-auto px-5 py-6 sm:px-6">

              {resume.extractedText ? (
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {resume.extractedText}
                </p>
              ) : (
                <div className="py-10 text-center">

                  <FileText
                    className="mx-auto text-slate-300"
                    size={35}
                  />

                  <p className="mt-3 text-sm text-slate-500">
                    No extracted text available.
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeDetails;