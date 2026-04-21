import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-apple-bg text-apple-text transition-colors duration-300 px-6">
      <h1 className="hero-title text-center mb-6">Projects Array</h1>
      <p className="text-xl text-apple-text-muted mb-10 max-w-2xl text-center">
        Dummy Data: This section will dynamically fetch active open-source projects from the database in Phase 2.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
        {/* Dummy Project Cards */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-8 border border-apple-border rounded-2xl bg-apple-border/10 flex flex-col items-start transition-colors duration-300">
            <h2 className="text-2xl font-semibold mb-2">Project Beta-{item}</h2>
            <p className="text-apple-text-muted text-sm mb-6 flex-grow">
              A placeholder description showing where open-source issues and tasks will be mapped out.
            </p>
            <button className="px-4 py-2 bg-apple-text text-apple-bg rounded-full text-sm font-medium">
              View Tasks
            </button>
          </div>
        ))}
      </div>

      <Link href="/" className="flex items-center gap-2 text-apple-accent hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
