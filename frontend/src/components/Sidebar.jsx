import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Resumes",
      path: "/my-resumes",
      icon: FileText,
    },
    {
      name: "Job Matches",
      path: "/job-matching",
      icon: BriefcaseBusiness,
    },
    {
      name: "AI Suggestions",
      path: "/ai-suggestions",
      icon: Sparkles,
    },
  ];

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white md:block">

      {/* Brand */}
      <div className="flex h-20 items-center border-b border-slate-100 px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <FileText className="text-white" size={21} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              ResumeAI
            </h1>

            <p className="text-xs text-slate-400">
              Career Assistant
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="p-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        <div className="space-y-1">

          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.path === "#") {
              return (
                <div
                  key={item.name}
                  className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400"
                >
                  <Icon size={19} />
                  <span>{item.name}</span>

                  <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                    Soon
                  </span>
                </div>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* Bottom Info */}
      <div className="absolute bottom-6 ml-4 w-56 rounded-xl border border-slate-200 bg-slate-50 p-4">

        <p className="text-xs font-semibold text-slate-700">
          AI Resume Assistant
        </p>

        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          Analyze your resume and find relevant job opportunities.
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;