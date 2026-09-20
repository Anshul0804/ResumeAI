import { useEffect, useState } from "react";
import API from "./api";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ResumeUpload from "./components/ResumeUpload";
import MyResumes from "./pages/MyResumes";
import Analysis from "./pages/Analysis";
import JobMatching from "./pages/JobMatching";
import ResumeDetails from "./pages/ResumeDetails";
import AddJob from "./pages/AddJob";
import {
  FileText,
  Briefcase,
  Target,
  BarChart3,
  Bot,
} from "lucide-react";

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    API.get("/dashboard")
      .then((response) => {
        setDashboard(response.data);
      })
      .catch((error) => {
        console.error("Dashboard API Error:", error);
      });
  }, []);

  if (!dashboard) {
    return <h2 className="p-8">Loading...</h2>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome to your ResumeAI dashboard
          </p>

          {/* Dashboard Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            {/* Total Resumes */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500">
                    Total Resumes
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {dashboard.totalResumes}
                  </h2>
                </div>

                <div className="rounded-lg bg-blue-100 p-3">
                  <FileText
                    className="text-blue-600"
                    size={28}
                  />
                </div>

              </div>
            </div>

            {/* Total Jobs */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500">
                    Total Jobs
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {dashboard.totalJobs}
                  </h2>
                </div>

                <div className="rounded-lg bg-purple-100 p-3">
                  <Briefcase
                    className="text-purple-600"
                    size={28}
                  />
                </div>

              </div>
            </div>

            {/* Total Matches */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500">
                    Total Matches
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {dashboard.totalMatches}
                  </h2>
                </div>

                <div className="rounded-lg bg-green-100 p-3">
                  <Target
                    className="text-green-600"
                    size={28}
                  />
                </div>

              </div>
            </div>

            {/* Average ATS Score */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500">
                    Average ATS Score
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {dashboard.averageAtsScore}%
                  </h2>
                </div>

                <div className="rounded-lg bg-orange-100 p-3">
                  <BarChart3
                    className="text-orange-600"
                    size={28}
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Average Match Score */}
          <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-indigo-100 p-3">
                <Bot
                  className="text-indigo-600"
                  size={28}
                />
              </div>

              <div>
                <p className="text-slate-500">
                  Average Job Match Score
                </p>

                <h2 className="mt-1 text-4xl font-bold text-indigo-600">
                  {dashboard.averageMatchScore}%
                </h2>
              </div>

            </div>

          </div>

          {/* Resume Upload */}
          <div className="mt-6">
            <ResumeUpload />
          </div>

        </div>

      </main>

    </div>
  );
}

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-resumes"
  element={
    <ProtectedRoute>
      <MyResumes />
    </ProtectedRoute>
  }
/>

<Route
  path="/analysis/:resumeId"
  element={
    <ProtectedRoute>
      <Analysis />
    </ProtectedRoute>
  }
/>

<Route
  path="/job-matching"
  element={
    <ProtectedRoute>
      <JobMatching />
    </ProtectedRoute>
  }
/>

<Route
  path="/resume/:resumeId"
  element={
    <ProtectedRoute>
      <ResumeDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/add-job"
  element={
    <ProtectedRoute>
      <AddJob />
    </ProtectedRoute>
  }
/>

<Route
  path="/"
  element={<Navigate to="/dashboard" replace />}
/>
    </Routes>
  );
}

export default App;