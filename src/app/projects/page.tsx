import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { fetchGoogleSheet } from "@/lib/sheets/fetcher";

export const revalidate = 60; // Cache invalidation

export default async function ProjectsPage() {
  const documentId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const gid = process.env.NEXT_PUBLIC_PROJECTS_SHEET_GID || "0"; // Tab ID

  let projects = [];
  if (documentId) {
    projects = await fetchGoogleSheet(documentId, gid);
  }


  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-apple-bg text-apple-text transition-colors duration-300 px-6 pt-24 pb-12">
      <h1 className="hero-title text-center mb-6">Projects Array</h1>
      <p className="text-xl text-apple-text-muted mb-10 max-w-2xl text-center">
        Active open-source projects synchronized natively from our database.
      </p>

      {!documentId ? (
        <div className="p-6 border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 rounded-xl mb-12">
          Configuration Error: Google Sheet ID not set. Please add NEXT_PUBLIC_GOOGLE_SHEET_ID to .env.local
        </div>
      ) : projects.length === 0 ? (
        <div className="p-6 text-apple-text-muted mb-12 font-mono tracking-widest text-sm">
          [ No active projects found ]
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-12 relative z-10">
          {projects.map((project, idx) => (
            <div key={idx} className="apple-card glass-heavy p-8 flex flex-col items-start transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold mb-2">{project.Title || `Project ${idx + 1}`}</h2>
              <p className="text-apple-text-muted text-sm mb-6 flex-grow">
                {project.Description || "No description provided."}
              </p>

              {project.Status && (
                <div className="mb-6 text-xs font-mono px-3 py-1.5 bg-apple-border/20 rounded-md text-apple-text tracking-widest">
                  STATUS: {project.Status}
                </div>
              )}

              {project.Link ? (
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-apple-text text-apple-bg rounded-full text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
                >
                  View Repo <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button disabled className="px-5 py-2.5 border border-apple-border text-apple-text-muted rounded-full text-sm font-medium cursor-not-allowed">
                  Link Unavailable
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Link href="/" className="flex items-center gap-2 text-apple-accent hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
