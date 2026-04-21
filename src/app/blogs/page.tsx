import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogsPage() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-apple-bg text-apple-text transition-colors duration-300 px-6">
      <h1 className="hero-title text-center mb-6">Newsroom</h1>
      <p className="text-xl text-apple-text-muted mb-10 max-w-2xl text-center">
        Dummy Data: A placeholder for the Transmission Logs. This will display community updates, tech blogs, and announcements in Phase 2.
      </p>
      
      <div className="w-full max-w-4xl space-y-4 mb-12">
        {[1, 2].map((item) => (
          <div key={item} className="p-6 border border-apple-border rounded-xl bg-apple-border/5 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer hover:bg-apple-border/10 transition-colors">
             <div className="w-full md:w-48 h-32 bg-apple-border/20 rounded-lg flex-shrink-0"></div>
             <div>
               <span className="text-apple-accent text-sm font-medium mb-2 block">Tech Blog</span>
               <h2 className="text-2xl font-semibold mb-2">Platform Announcement {item}</h2>
               <p className="text-apple-text-muted text-sm">
                 An overview of the upcoming structural changes to the ARISE architecture and what it means for maintainers.
               </p>
             </div>
          </div>
        ))}
      </div>

      <Link href="/" className="flex items-center gap-2 text-apple-accent hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
