import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Calendar, FileType } from "lucide-react";
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
    return <p className="p-8">Loading resume...</p>;
  }

  if (!resume) {
    return <p className="p-8 text-red-500">Resume not found.</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate("/my-resumes")}
        className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to My Resumes
      </button>

      {/* Main Card */}
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">

        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-lg bg-blue-100 p-3">
            <FileText className="text-blue-600" size={30} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {resume.fileName}
            </h1>

            <p className="text-slate-500">
              Resume Details
            </p>
          </div>
        </div>

        {/* Resume Information */}
        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-lg bg-slate-50 p-5">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <FileText size={18} />
              File Name
            </div>

            <p className="font-medium text-slate-800">
              {resume.fileName}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-5">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <FileType size={18} />
              File Type
            </div>

            <p className="font-medium text-slate-800">
              {resume.fileType}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-5">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Calendar size={18} />
              Resume ID
            </div>

            <p className="font-medium text-slate-800">
              {resume.id}
            </p>
          </div>

        </div>

        {/* Extracted Text */}
        <div className="mt-8">

          <h2 className="mb-3 text-xl font-semibold text-slate-800">
            Extracted Resume Text
          </h2>

          <div className="max-h-[500px] overflow-y-auto rounded-lg bg-slate-50 p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {resume.extractedText || "No extracted text available."}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ResumeDetails;