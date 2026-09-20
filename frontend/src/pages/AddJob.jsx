import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Back */}
      <button
        onClick={() => navigate("/job-matching")}
        className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to Job Matching
      </button>

      {/* Card */}
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="rounded-xl bg-blue-100 p-4">
            <Briefcase
              className="text-blue-600"
              size={30}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Add Job
            </h1>

            <p className="text-sm text-slate-500">
              Add a job description for resume matching
            </p>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Job Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Title
            </label>

            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Java Developer"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the complete job description here..."
              rows={10}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Adding Job..." : "Add Job"}
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-slate-600">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default AddJob;