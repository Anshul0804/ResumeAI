function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        ResumeAI
      </h1>

      <nav className="space-y-3">

        <a
  href="/dashboard"
  className="block rounded-lg bg-blue-600 px-4 py-3"
>
  Dashboard
</a>

        <a
  href="/my-resumes"
  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
>
  My Resumes
</a>

        <a
  href="/job-matching"
  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
>
  Job Matches
</a>

        <a
          href="#"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          AI Suggestions
        </a>

      </nav>

    </aside>
  );
}

export default Sidebar;