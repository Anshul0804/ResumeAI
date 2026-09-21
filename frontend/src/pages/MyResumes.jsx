import { useEffect, useState } from "react";
import API from "../api";
import {
  FileText,
  Eye,
  Sparkles,
  Upload,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/resumes/my")
      .then((response) => {
        setResumes(response.data);
      })
      .catch((error) => {
        console.error("Resume Fetch Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAnalyze = async (resumeId) => {
    try {
      setAnalyzingId(resumeId);

      await API.post(`/resumes/${resumeId}/analyze`);

      navigate(`/analysis/${resumeId}`);
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Resume analysis failed");
    } finally {
      setAnalyzingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">

          <Loader2
            className="mx-auto animate-spin text-blue-600"
            size={30}
          />

          <p className="mt-3 text-sm text-slate-500">
            Loading your resumes...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">

        <div className="px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-medium text-blue-600">
                Resume Management
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                My Resumes
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage and analyze your uploaded resumes.
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Upload size={17} />
              Upload Resume
            </button>

          </div>

        </div>

      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">

        {resumes.length === 0 ? (

          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <FileText
                className="text-blue-600"
                size={30}
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              No resumes yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              Upload your resume to get AI-powered insights,
              ATS analysis and job matching.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Upload size={17} />
              Upload Resume
            </button>

          </div>

        ) : (

          /* Resume Cards */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {resumes.map((resume) => (

              <div
                key={resume.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >

                {/* Card Header */}
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <FileText
                      className="text-blue-600"
                      size={24}
                    />
                  </div>

                  <div className="min-w-0">

                    <h2 className="truncate font-semibold text-slate-900">
                      {resume.fileName}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      PDF Resume
                    </p>

                  </div>

                </div>

                {/* Details */}
                <div className="mt-5 rounded-xl bg-slate-50 p-3">

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-slate-500">
                      Resume ID
                    </span>

                    <span className="text-xs font-medium text-slate-700">
                      #{resume.id}
                    </span>

                  </div>

                </div>

                {/* Actions */}
                <div className="mt-5 grid grid-cols-2 gap-3">

                  <button
                    onClick={() =>
                      navigate(`/resume/${resume.id}`)
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    onClick={() => handleAnalyze(resume.id)}
                    disabled={analyzingId === resume.id}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {analyzingId === resume.id ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Analyze
                      </>
                    )}

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyResumes;