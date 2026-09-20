import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Resume Analyzer
        </h2>

        <p className="text-sm text-slate-500">
          AI-powered resume insights
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Anshul
            </p>

            <p className="text-xs text-slate-500">
              User
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;