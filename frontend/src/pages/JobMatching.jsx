import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import {
  Target,
  FileText,
  Briefcase,
  Plus,
  Loader2,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Sparkles,
} from "lucide-react";

function JobMatching() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [resumeId, setResumeId] = useState("");
  const [jobId, setJobId] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/resumes/my")
      .then((response) => setResumes(response.data))
      .catch((error) => console.error("Resume Error:", error));

    API.get("/jobs/my")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Job Error:", error));
  }, []);

  const handleMatch = async () => {
    if (!resumeId || !jobId) {
      alert("Please select a resume and a job");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await API.post("/matches", {
        resumeId: Number(resumeId),
        jobId: Number(jobId),
      });

      setResult(response.data);
    } catch (error) {
      console.error("Matching Error:", error);
      alert("Job matching failed");
    } finally {
      setLoading(false);
    }
  };

  const matchScore = Math.min(
    Math.max(Number(result?.matchScore) || 0, 0),
    100
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-medium text-blue-600">
                Career Matching
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Job Matching
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Compare your resume with job requirements using AI.
              </p>
            </div>

            <button
              onClick={() => navigate("/add-job")}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Job
            </button>

          </div>

        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          {/* Selection Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Target
                  className="text-blue-600"
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Match Your Resume
                </h2>

                <p className="text-sm text-slate-500">
                  Select a resume and job to calculate compatibility.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Resume */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Select Resume
                </label>

                <div className="relative">

                  <FileText
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
                    size={18}
                  />

                  <select
                    value={resumeId}
                    onChange={(e) => setResumeId(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">
                      Select your resume
                    </option>

                    {resumes.map((resume) => (
                      <option key={resume.id} value={resume.id}>
                        {resume.fileName}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

              {/* Job */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Select Job
                </label>

                <div className="relative">

                  <Briefcase
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-violet-600"
                    size={18}
                  />

                  <select
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">
                      Select a job
                    </option>

                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.jobTitle}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

            </div>

            <button
              onClick={handleMatch}
              disabled={loading}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Analyzing Match...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Match Resume
                </>
              )}
            </button>

          </div>

          {/* Result */}
          {result && (
            <div className="mt-6 space-y-6">

              {/* Match Score */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="flex flex-col items-center text-center">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                    <Target
                      className="text-blue-600"
                      size={28}
                    />
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Job Match Score
                  </p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <h2 className="text-5xl font-bold tracking-tight text-slate-900">
                      {matchScore}
                    </h2>

                    <span className="text-lg text-slate-400">
                      %
                    </span>
                  </div>

                  <div className="mt-5 w-full max-w-md">

                    <div className="mb-2 flex justify-between text-xs text-slate-500">
                      <span>Compatibility</span>
                      <span className="font-medium text-slate-700">
                        {matchScore}%
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-700"
                        style={{
                          width: `${matchScore}%`,
                        }}
                      />
                    </div>

                  </div>

                </div>

              </div>

              {/* Skills */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Matched */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                      <CheckCircle
                        className="text-emerald-600"
                        size={20}
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Matched Skills
                      </h2>

                      <p className="text-xs text-slate-500">
                        Skills you already have
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {result.matchedSkills?.length > 0 ? (
                      result.matchedSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        No matched skills found.
                      </p>
                    )}

                  </div>

                </div>

                {/* Missing */}
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
                        Missing Skills
                      </h2>

                      <p className="text-xs text-slate-500">
                        Skills required by the job
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {result.missingSkills?.length > 0 ? (
                      result.missingSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-lg bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        No missing skills found.
                      </p>
                    )}

                  </div>

                </div>

              </div>

              {/* Suggestions */}
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">

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
                      Improve your resume for this job
                    </p>
                  </div>

                </div>

                <div className="mt-5 space-y-3">

                  {result.suggestions?.length > 0 ? (
                    result.suggestions.map((suggestion, index) => (
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
          )}

        </div>

      </div>
    </div>
  );
}

export default JobMatching;