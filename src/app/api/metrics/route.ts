import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const metric = await request.json();
    
    // Log metric to console (in production, send to analytics service)
    console.log(`[WEB VITAL] ${metric.name}: ${metric.value} ${metric.unit} (${metric.rating})`);
    
    // Example: Send to external analytics
    // await fetch("https://analytics.example.com/metrics", {
    //   method: "POST",
    //   body: JSON.stringify(metric),
    //   headers: { "Content-Type": "application/json" },
    // });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Metrics endpoint error:", error);
    return NextResponse.json({ error: "Failed to log metric" }, { status: 500 });
  }
}
