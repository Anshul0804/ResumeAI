import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

function Analysis() {
  const { resumeId } = useParams();
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
    return <p className="p-8">Loading analysis...</p>;
  }

  if (!analysis) {
    return (
      <p className="p-8 text-red-500">
        Analysis not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Resume Analysis
        </h1>

        <p className="mt-2 text-slate-500">
          AI-powered analysis of your resume
        </p>
      </div>

      {/* ATS Score */}
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-blue-100 p-4">
            <FileText
              className="text-blue-600"
              size={32}
            />
          </div>

          <div>
            <p className="text-slate-500">
              ATS Score
            </p>

            <h2 className="text-5xl font-bold text-blue-600">
              {analysis.atsScore}%
            </h2>
          </div>

        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">
          Summary
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          {analysis.summary}
        </p>
      </div>

      {/* Skills */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-600" />

          <h2 className="text-xl font-semibold text-slate-800">
            Skills
          </h2>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {analysis.skills?.map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-blue-600" />

          <h2 className="text-xl font-semibold text-slate-800">
            Strengths
          </h2>
        </div>

        <ul className="mt-4 space-y-2">
          {analysis.strengths?.map((strength, index) => (
            <li
              key={index}
              className="text-slate-600"
            >
              • {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-orange-500" />

          <h2 className="text-xl font-semibold text-slate-800">
            Weaknesses
          </h2>
        </div>

        <ul className="mt-4 space-y-2">
          {analysis.weaknesses?.map((weakness, index) => (
            <li
              key={index}
              className="text-slate-600"
            >
              • {weakness}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Lightbulb className="text-yellow-500" />

          <h2 className="text-xl font-semibold text-slate-800">
            AI Suggestions
          </h2>
        </div>

        <ul className="mt-4 space-y-2">
          {analysis.suggestions?.map((suggestion, index) => (
            <li
              key={index}
              className="text-slate-600"
            >
              • {suggestion}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Analysis;