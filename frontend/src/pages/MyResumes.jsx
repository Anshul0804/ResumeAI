import { useEffect, useState } from "react";
import API from "../api";
import { FileText, Eye, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
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
    await API.post(`/resumes/${resumeId}/analyze`);

    navigate(`/analysis/${resumeId}`);
  } catch (error) {
    console.error("Analysis Error:", error);
    alert("Resume analysis failed");
  }
};

  if (loading) {
    return <p className="p-8">Loading resumes...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="border-b bg-white px-8 py-5">
        <h1 className="text-2xl font-bold text-slate-800">
          My Resumes
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage and analyze your uploaded resumes
        </p>
      </div>

      <div className="p-8">

        {resumes.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <FileText
              className="mx-auto mb-4 text-slate-400"
              size={48}
            />

            <h2 className="text-xl font-semibold text-slate-700">
              No resumes found
            </h2>

            <p className="mt-2 text-slate-500">
              Upload a resume to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-blue-100 p-3">
                      <FileText
                        className="text-blue-600"
                        size={26}
                      />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-800">
                        {resume.fileName}
                      </h2>

                      <p className="text-sm text-slate-500">
  PDF Resume
</p>

<p className="text-xs text-slate-400">
  Resume ID: {resume.id}
</p>

                      
                    </div>

                  </div>

                </div>

                <div className="mt-6 flex gap-3">

                  <button
  onClick={() => navigate(`/resume/${resume.id}`)}
  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
>
  <Eye size={17} />
  View
</button>
<button
  onClick={() => handleAnalyze(resume.id)}
  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
>
                    <Sparkles size={17} />
                    Analyze
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