import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { fetchGoogleSheet } from "@/lib/sheets/fetcher";

export const revalidate = 60; // Cache invalidation

export default async function LearnPage() {
  const documentId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const gid = process.env.NEXT_PUBLIC_KNOWLEDGE_SHEET_GID || "0"; // Tab ID
  
  let knowledges = [];
  if (documentId) {
    knowledges = await fetchGoogleSheet(documentId, gid);
  }

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-apple-bg text-apple-text transition-colors duration-300 px-6 pt-24 pb-12">
      <h1 className="hero-title text-center mb-6">Knowledge Base</h1>
      <p className="text-xl text-apple-text-muted mb-10 max-w-2xl text-center">
        Curated learning resources and modules.
      </p>
      
      {!documentId ? (
        <div className="p-6 border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 rounded-xl mb-12">
          Configuration Error: Google Sheet ID not set. Please add NEXT_PUBLIC_GOOGLE_SHEET_ID to .env.local
        </div>
      ) : knowledges.length === 0 ? (
        <div className="p-6 text-apple-text-muted mb-12 font-mono tracking-widest text-sm">
          [ No knowledge modules found ]
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-12 relative z-10">
          {knowledges.map((item, idx) => (
            <div key={idx} className="apple-card glass-heavy p-8 flex flex-col items-start transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-3 bg-apple-accent/10 rounded-xl text-apple-accent">
                    <BookOpen className="w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-semibold">{item.Category || item.Title || `Module ${idx + 1}`}</h3>
              </div>
              <p className="text-apple-text-muted text-sm mb-6 flex-grow">
                {item.Description || "Learn the fundamentals and advanced concepts."}
              </p>
              {item.Link ? (
                <a 
                  href={item.Link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-5 py-2.5 bg-apple-text text-apple-bg rounded-full text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
                >
                  Start Path <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button disabled className="px-5 py-2.5 border border-apple-border text-apple-text-muted rounded-full text-sm font-medium cursor-not-allowed">
                  Path Unavailable
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Link href="/" className="flex items-center gap-2 text-apple-accent hover:underline mt-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
