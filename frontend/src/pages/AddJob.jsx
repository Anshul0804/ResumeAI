import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  ArrowLeft,
  Loader2,
  CheckCircle,
} from "lucide-react";
import API from "../api";

function AddJob() {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobTitle.trim() || !description.trim()) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new URLSearchParams();

      formData.append("jobTitle", jobTitle);
      formData.append("description", description);

      await API.post("/jobs", formData);

      setMessage("Job added successfully!");

      setJobTitle("");
      setDescription("");
    } catch (error) {
      console.error("Add Job Error:", error);
      setMessage("Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="px-4 py-6 sm:px-6 lg:px-8">

          <button
            onClick={() => navigate("/job-matching")}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Job Matching
          </button>

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Briefcase
                className="text-blue-600"
                size={25}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-blue-600">
                Job Management
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Add Job
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Add a job description for AI-powered resume matching.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Job Title */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Job Title
                </label>

                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Java Developer"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Enter the position you want to match your resume against.
                </p>

              </div>

              {/* Description */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="block text-sm font-semibold text-slate-700">
                    Job Description
                  </label>

                  <span className="text-xs text-slate-400">
                    {description.length} characters
                  </span>

                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  rows={12}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Include responsibilities, required skills and qualifications
                  for better matching results.
                </p>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Adding Job...
                  </>
                ) : (
                  <>
                    <Briefcase size={18} />
                    Add Job
                  </>
                )}

              </button>

            </form>

            {/* Message */}
            {message && (
              <div
                className={`mt-5 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm ${
                  message.includes("successfully")
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >

                {message.includes("successfully") && (
                  <CheckCircle size={17} />
                )}

                {message}

              </div>
            )}

          </div>

          {/* Info */}
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <div className="flex gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                <Briefcase
                  className="text-blue-600"
                  size={18}
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  How Job Matching works
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Add a job description, select your resume on the Job
                  Matching page, and ResumeAI will compare your skills with
                  the job requirements.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddJob;