import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  FileText,
  Lightbulb,
  Loader2,
  ArrowRight,
} from "lucide-react";
import API from "../api";

function AISuggestions() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const [loadingResumes, setLoadingResumes] = useState(true);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    API.get("/resumes/my")
      .then((response) => {
        setResumes(response.data);
      })
      .catch((error) => {
        console.error("Resume Fetch Error:", error);
      })
      .finally(() => {
        setLoadingResumes(false);
      });
  }, []);

  const handleResumeChange = async (e) => {
    const selectedId = e.target.value;

    setResumeId(selectedId);
    setAnalysis(null);

    if (!selectedId) {
      return;
    }

    try {
      setLoadingAnalysis(true);

      const response = await API.get(
        `/resumes/${selectedId}/analysis`
      );

      setAnalysis(response.data);
    } catch (error) {
      console.error("Analysis Fetch Error:", error);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="px-4 py-6 sm:px-6 lg:px-8">

          <button
            onClick={() => navigate("/dashboard")}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Sparkles
                className="text-blue-600"
                size={25}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-blue-600">
                AI Career Assistant
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                AI Suggestions
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Get personalized suggestions to improve your resume.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          {/* Resume Selection */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <FileText
                  className="text-blue-600"
                  size={20}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Select Resume
                </h2>

                <p className="text-sm text-slate-500">
                  Choose a resume to view its AI suggestions.
                </p>
              </div>

            </div>

            <div className="mt-5">

              {loadingResumes ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Loading resumes...
                </div>
              ) : resumes.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-5 text-center">

                  <p className="text-sm text-slate-500">
                    No resumes found.
                  </p>

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Upload a resume
                  </button>

                </div>
              ) : (
                <select
                  value={resumeId}
                  onChange={handleResumeChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="">
                    Select your resume
                  </option>

                  {resumes.map((resume) => (
                    <option
                      key={resume.id}
                      value={resume.id}
                    >
                      {resume.fileName}
                    </option>
                  ))}

                </select>
              )}

            </div>

          </div>

          {/* Loading */}
          {loadingAnalysis && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

              <Loader2
                className="mx-auto animate-spin text-blue-600"
                size={30}
              />

              <p className="mt-3 text-sm text-slate-500">
                Loading AI suggestions...
              </p>

            </div>
          )}

          {/* Suggestions */}
          {analysis && !loadingAnalysis && (
            <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Lightbulb
                    className="text-blue-600"
                    size={22}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Resume Improvement Suggestions
                  </h2>

                  <p className="text-xs text-slate-500">
                    AI-generated recommendations based on your resume
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-3">

                {analysis.suggestions?.length > 0 ? (
                  analysis.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                        {index + 1}
                      </div>

                      <p className="text-sm leading-6 text-slate-600">
                        {suggestion}
                      </p>

                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-slate-50 p-6 text-center">

                    <p className="text-sm text-slate-500">
                      No AI suggestions available for this resume.
                    </p>

                  </div>
                )}

              </div>

              <button
                onClick={() =>
                  navigate(`/analysis/${resumeId}`)
                }
                className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                View Full Resume Analysis
                <ArrowRight size={16} />
              </button>

            </div>
          )}

          {/* Initial State */}
          {!analysis && !loadingAnalysis && !loadingResumes && resumes.length > 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <Sparkles
                  className="text-blue-600"
                  size={26}
                />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                Select a resume
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Choose a resume above to see personalized AI suggestions.
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default AISuggestions;