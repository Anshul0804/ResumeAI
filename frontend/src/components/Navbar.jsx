import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userName = user.name || "User";
  const userEmail = user.email || "";

  const initial = userName.charAt(0).toUpperCase();

  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">

      {/* Left */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
          Resume Analyzer
        </h2>

        <p className="mt-0.5 hidden text-sm text-slate-500 sm:block">
          AI-powered resume insights
        </p>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-3">

        {/* User Profile */}
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm">
            {initial}
          </div>

          <div className="hidden text-left sm:block">
            <p className="max-w-32 truncate text-sm font-semibold text-slate-800">
              {userName}
            </p>

            <p className="max-w-40 truncate text-xs text-slate-500">
              {userEmail}
            </p>
          </div>

        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>

        {/* Profile Popup */}
        {showProfile && (
          <div className="absolute right-0 top-14 z-30 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-semibold text-white">
                {initial}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {userName}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {userEmail}
                </p>
              </div>

            </div>

            <div className="my-3 border-t border-slate-100" />

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <UserCircle size={15} />
              <span>ResumeAI User</span>
            </div>

          </div>
        )}

      </div>

    </header>
  );
}

export default Navbar;