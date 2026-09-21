import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Loader2,
  Sparkles,
} from "lucide-react";

function Analysis() {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/resumes/${resumeId}/analysis`)
      .then((response) => {
        setAnalysis(response.data);
      })
      .catch((error) => {
        console.error("Analysis Fetch Error:", error);
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
            AI is loading your resume analysis...
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
            <AlertCircle
              className="text-red-500"
              size={28}
            />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Analysis not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            We couldn't find an analysis for this resume.
          </p>

          <button
            onClick={() => navigate("/my-resumes")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to My Resumes
          </button>

        </div>
      </div>
    );
  }

  const score = Math.min(
    Math.max(Number(analysis.atsScore) || 0, 0),
    100
  );

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

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Sparkles
                className="text-blue-600"
                size={25}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-blue-600">
                AI Resume Analysis
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Resume Analysis
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                AI-powered insights to improve your resume.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          {/* ATS Score */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                  <FileText
                    className="text-blue-600"
                    size={28}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    ATS Compatibility Score
                  </p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                      {score}
                    </h2>

                    <span className="text-lg font-medium text-slate-400">
                      / 100
                    </span>
                  </div>
                </div>

              </div>

              <div className="w-full sm:w-72">

                <div className="mb-2 flex justify-between text-xs text-slate-500">
                  <span>ATS Score</span>
                  <span className="font-medium text-slate-700">
                    {score}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-700"
                    style={{ width: `${score}%` }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Summary */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Resume Summary
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {analysis.summary || "No summary available."}
            </p>

          </div>

          {/* Skills */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle
                  className="text-emerald-600"
                  size={20}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Detected Skills
                </h2>

                <p className="text-xs text-slate-500">
                  Skills identified from your resume
                </p>
              </div>

            </div>

            <div className="mt-5 flex flex-wrap gap-2">

              {analysis.skills?.length > 0 ? (
                analysis.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No skills detected.
                </p>
              )}

            </div>

          </div>

          {/* Strengths + Weaknesses */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Strengths */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <CheckCircle
                    className="text-blue-600"
                    size={20}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Strengths
                  </h2>

                  <p className="text-xs text-slate-500">
                    What your resume does well
                  </p>
                </div>

              </div>

              <div className="mt-5 space-y-3">

                {analysis.strengths?.length > 0 ? (
                  analysis.strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl bg-slate-50 p-3"
                    >
                      <CheckCircle
                        className="mt-0.5 shrink-0 text-emerald-500"
                        size={17}
                      />

                      <p className="text-sm leading-6 text-slate-600">
                        {strength}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No strengths available.
                  </p>
                )}

              </div>

            </div>

            {/* Weaknesses */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                  <AlertCircle
                    className="text-orange-500"
                    size={20}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Areas to Improve
                  </h2>

                  <p className="text-xs text-slate-500">
                    Potential weaknesses in your resume
                  </p>
                </div>

              </div>

              <div className="mt-5 space-y-3">

                {analysis.weaknesses?.length > 0 ? (
                  analysis.weaknesses.map((weakness, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl bg-slate-50 p-3"
                    >
                      <AlertCircle
                        className="mt-0.5 shrink-0 text-orange-500"
                        size={17}
                      />

                      <p className="text-sm leading-6 text-slate-600">
                        {weakness}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No weaknesses found.
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* AI Suggestions */}
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
                  AI Suggestions
                </h2>

                <p className="text-xs text-slate-500">
                  Recommended improvements based on your resume
                </p>
              </div>

            </div>

            <div className="mt-5 space-y-3">

              {analysis.suggestions?.length > 0 ? (
                analysis.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      {index + 1}
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                      {suggestion}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No suggestions available.
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analysis;