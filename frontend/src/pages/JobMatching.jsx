import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { Target, FileText, Briefcase } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-slate-100 p-8">

     <div className="mb-8 flex items-center justify-between">

  <div>
    <h1 className="text-3xl font-bold text-slate-800">
      Job Matching
    </h1>

    <p className="mt-2 text-slate-500">
      Compare your resume with a job description using AI
    </p>
  </div>

  <button
    onClick={() => navigate("/add-job")}
    className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
  >
    + Add Job
  </button>

</div>

      {/* Selection */}
      <div className="rounded-xl bg-white p-6 shadow-sm">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Resume */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Select Resume
            </label>

            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" />

              <select
                value={resumeId}
                onChange={(e) => setResumeId(e.target.value)}
                className="w-full rounded-lg border px-4 py-3"
              >
                <option value="">
                  Select Resume
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
            <label className="mb-2 block font-medium text-slate-700">
              Select Job
            </label>

            <div className="flex items-center gap-2">
              <Briefcase className="text-purple-600" />

              <select
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="w-full rounded-lg border px-4 py-3"
              >
                <option value="">
                  Select Job
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
          className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Target size={20} />

          {loading ? "Analyzing..." : "Match Resume"}
        </button>

      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-6">

          {/* Score */}
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">

            <p className="text-slate-500">
              Job Match Score
            </p>

            <h2 className="mt-2 text-6xl font-bold text-blue-600">
              {result.matchScore}%
            </h2>

          </div>

          {/* Matched Skills */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-slate-800">
              Matched Skills
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {result.matchedSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

          {/* Missing Skills */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-slate-800">
              Missing Skills
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {result.missingSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

          {/* Suggestions */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-slate-800">
              AI Suggestions
            </h2>

            <ul className="mt-4 space-y-2">
              {result.suggestions?.map((suggestion, index) => (
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
      )}

    </div>
  );
}

export default JobMatching;