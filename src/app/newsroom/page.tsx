import Link from "next/link";
import { ArrowLeft, Newspaper, ArrowRight } from "lucide-react";
import { fetchGoogleSheet, parseGoogleDriveImageLinks, generateSlug } from "@/lib/sheets/fetcher";
import ImageCarousel from "@/components/ui/ImageCarousel";

export const revalidate = 60; // Cache invalidation

export default async function NewsroomPage() {
  const documentId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const gid = process.env.NEXT_PUBLIC_NEWSROOM_SHEET_GID || "0"; // Tab ID
  
  let newsItems = [];
  if (documentId) {
    newsItems = await fetchGoogleSheet(documentId, gid);
  }

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-apple-bg text-apple-text transition-colors duration-300 px-6 pt-24 pb-12">
      <h1 className="hero-title text-center mb-6">Newsroom</h1>
      <p className="text-xl text-apple-text-muted mb-10 max-w-2xl text-center">
        Latest updates, technological advancements, and community transmissions.
      </p>
      
      {!documentId ? (
        <div className="p-6 border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 rounded-xl mb-12">
          Configuration Error: Google Sheet ID not set. Please add NEXT_PUBLIC_GOOGLE_SHEET_ID to .env.local
        </div>
      ) : newsItems.length === 0 ? (
        <div className="p-6 text-apple-text-muted mb-12 font-mono tracking-widest text-sm">
          [ No transmissions received ]
        </div>
      ) : (
        <div className="flex flex-col gap-10 w-full max-w-4xl mb-12 relative z-10">
          {newsItems.map((item, idx) => {
            const images = parseGoogleDriveImageLinks(item.Images || item.ImageLinks || item.Image || item.Link || "");
            const itemSlug = generateSlug(item.Title || "");
            
            return (
              <div key={idx} className="apple-card glass-heavy p-8 flex flex-col transition-all duration-500 transform-gpu hover:shadow-2xl group">
                <Link href={`/newsroom/${itemSlug}`} className="absolute inset-0 z-0" aria-label="View Details"></Link>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10 pointer-events-none">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-apple-accent/10 rounded-xl text-apple-accent shrink-0">
                        <Newspaper className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-bold group-hover:text-apple-accent transition-colors">{item.Title || `Transmission ${idx + 1}`}</h3>
                  </div>
                  {item.Date && (
                    <span className="text-xs font-mono text-apple-text-muted tracking-widest px-3 py-1 bg-apple-border/20 rounded-md shrink-0">
                      {item.Date}
                    </span>
                  )}
                </div>
                
                {/* Interactive Horizontal Image Carousel */}
                {images.length > 0 && (
                  <div className="relative z-20 mb-6">
                    <ImageCarousel images={images} autoScrollInterval={4000} baseHref={`/newsroom/${itemSlug}`} />
                  </div>
                )}
                
                <p className="text-apple-text-muted leading-relaxed whitespace-pre-wrap line-clamp-3 relative z-10 pointer-events-none mb-6">
                  {item.Content || item.Description || "No detailed contents available."}
                </p>

                <div className="mt-auto flex justify-end relative z-10 pointer-events-none">
                  <span className="flex items-center gap-2 text-sm font-mono tracking-widest text-apple-text-muted group-hover:text-apple-accent transition-colors">
                    ACCESS LOG <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Link href="/" className="flex items-center gap-2 text-apple-accent hover:underline mt-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
