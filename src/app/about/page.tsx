import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-apple-bg text-apple-text transition-colors duration-300 px-6">
      <h1 className="hero-title mb-6">About ARISE.</h1>
      <div className="max-w-2xl text-center">
         <p className="text-xl text-apple-text-muted mb-8">
           Dummy Data: You are viewing a placeholder "About Us" page. In Phase 2, this will contain the community mission, vision, and the core story.
         </p>
         <div className="p-8 border border-apple-border rounded-xl bg-apple-border/5 mb-8">
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-apple-text-muted">To foster structured collaboration and scale open-source ecosystems using lightweight, performant modern technologies.</p>
         </div>
         <Link href="/" className="inline-flex items-center gap-2 text-apple-accent hover:underline">
           <ArrowLeft className="w-4 h-4" /> Return to Homepage
         </Link>
      </div>
    </div>
  );
}
