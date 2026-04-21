import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-apple-bg text-apple-text transition-colors duration-300 px-6">
      <h1 className="hero-title text-center mb-6">Knowledge Base</h1>
      <p className="text-xl text-apple-text-muted mb-10 max-w-2xl text-center">
        Dummy Data: Curated learning resources from external APIs will be rendered here natively in Phase 2.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mb-12 relative z-10">
        {['AI & ML', 'Web Dev', 'Systems', 'Open Source'].map((cat, idx) => (
          <div key={idx} className="apple-card glass-heavy aspect-square p-6 flex flex-col items-center justify-center text-center transition-all duration-500 transform-gpu hover:-translate-y-2 hover:scale-105 hover:shadow-2xl cursor-pointer">
             <h3 className="text-xl font-semibold">{cat}</h3>
             <span className="text-apple-accent text-sm mt-2 font-medium">View Path</span>
          </div>
        ))}
      </div>

      <Link href="/" className="flex items-center gap-2 text-apple-accent hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
