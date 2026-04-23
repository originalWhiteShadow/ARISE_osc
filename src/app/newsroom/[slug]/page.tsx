import Link from "next/link";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { fetchGoogleSheet, parseGoogleDriveImageLinks, generateSlug } from "@/lib/sheets/fetcher";
import ImageCarousel from "@/components/ui/ImageCarousel";

export const revalidate = 60; // Cache invalidation

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const documentId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const gid = process.env.NEXT_PUBLIC_NEWSROOM_SHEET_GID || "0";
  
  if (!documentId) return <div className="p-10 text-center pt-32">System Configuration Error.</div>;

  const newsItems = await fetchGoogleSheet(documentId, gid);
  
  // Find the exact news item matching the slug
  const article = newsItems.find(item => generateSlug(item.Title || "") === slug);

  if (!article) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-apple-bg text-apple-text px-6 pt-24 pb-12">
        <h1 className="text-2xl font-mono tracking-widest mb-4">404 : NEWS NOT FOUND</h1>
        <Link href="/newsroom" className="text-apple-accent hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Newsroom
        </Link>
      </div>
    );
  }

  const images = parseGoogleDriveImageLinks(article.Images || article.ImageLinks || article.Image || article.Link || "");

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center bg-apple-bg text-apple-text transition-colors duration-300 px-4 md:px-8 pt-24 pb-20">
      
      <div className="w-full max-w-4xl flex items-center mb-8 relative z-20">
        <Link href="/newsroom" className="flex items-center gap-2 text-apple-text-muted hover:text-apple-accent transition-colors font-mono uppercase tracking-widest text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Newsroom
        </Link>
      </div>

      <article className="w-full max-w-4xl apple-card glass-heavy p-6 md:p-12 flex flex-col relative z-10">
        <header className="mb-10 border-b border-apple-border/30 pb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{article.Title || "Untitled News"}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-apple-text-muted font-mono text-sm">
            {article.Date && (
              <span className="flex items-center gap-2 px-3 py-1.5 bg-apple-border/10 rounded-full border border-apple-border/20">
                <Calendar className="w-4 h-4" /> {article.Date}
              </span>
            )}
            <span className="flex items-center gap-2 px-3 py-1.5 bg-apple-border/10 rounded-full border border-apple-border/20">
              <FileText className="w-4 h-4" /> News Article
            </span>
          </div>
        </header>

        {images.length > 0 && (
          <div className="mb-12">
            <ImageCarousel images={images} autoScrollInterval={5000} />
          </div>
        )}

        <div className="prose prose-invert max-w-none text-apple-text-muted leading-loose text-[17px] md:text-[19px] whitespace-pre-wrap font-medium">
          {article.Content || article.Description || "No detailed contents available for this news item."}
        </div>
      </article>
      
    </div>
  );
}
