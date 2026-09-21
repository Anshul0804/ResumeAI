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
import AISuggestions from "./pages/AISuggestions";
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="mt-3 text-sm text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Resumes",
      value: dashboard.totalResumes,
      icon: FileText,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Jobs",
      value: dashboard.totalJobs,
      icon: Briefcase,
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      title: "Total Matches",
      value: dashboard.totalMatches,
      icon: Target,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Average ATS Score",
      value: `${dashboard.averageAtsScore}%`,
      icon: BarChart3,
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <main className="min-w-0 flex-1">

        <Navbar />

        <div className="p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <div className="mb-8">

            <p className="text-sm font-medium text-blue-600">
              Overview
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track your resumes, job matches and ATS performance.
            </p>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        {stat.value}
                      </h2>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}
                    >
                      <Icon
                        size={22}
                        className={stat.iconColor}
                      />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Match Score */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                  <Bot
                    size={24}
                    className="text-indigo-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Average Job Match Score
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-slate-900">
                    {dashboard.averageMatchScore}%
                  </h2>
                </div>

              </div>

              <div className="w-full sm:w-64">

                <div className="mb-2 flex justify-between text-xs text-slate-500">
                  <span>Match performance</span>
                  <span>{dashboard.averageMatchScore}%</span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${Math.min(
                        dashboard.averageMatchScore || 0,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>

              </div>

            </div>

          </div>

          {/* Resume Upload */}
          <div className="mt-6">

            <div className="mb-4">

              <h2 className="text-lg font-semibold text-slate-900">
                Upload Resume
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload your resume to analyze it with AI.
              </p>

            </div>

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
  path="/ai-suggestions"
  element={
    <ProtectedRoute>
      <AISuggestions />
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