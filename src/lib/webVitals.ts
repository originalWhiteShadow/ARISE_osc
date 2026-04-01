/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals: LCP, FID, CLS, FCP, TTFB
 * Integrates with Lucidity system for performance insights
 */

export interface WebVitalsMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  rating: "good" | "needs improvement" | "poor";
}

// Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 }, // First Input Delay
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 600, poor: 1200 }, // Time to First Byte
};

function getRating(name: string, value: number): "good" | "needs improvement" | "poor" {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return "needs improvement";
  
  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs improvement";
  return "poor";
}

function reportWebVital(metric: WebVitalsMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`${metric.name}: ${metric.value.toFixed(2)}${metric.unit} (${metric.rating})`);
  }
  
  // Send to analytics endpoint
  if (typeof window !== "undefined" && navigator.sendBeacon) {
    const body = JSON.stringify(metric);
    navigator.sendBeacon("/api/metrics", body);
  }
}

export function trackWebVitals() {
  // Track LCP (Largest Contentful Paint)
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const metric: WebVitalsMetric = {
          name: "LCP",
          value: lastEntry.renderTime || lastEntry.loadTime || 0,
          unit: "ms",
          timestamp: Date.now(),
          rating: getRating("LCP", lastEntry.renderTime || lastEntry.loadTime || 0),
        };
        reportWebVital(metric);
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {
      console.error("LCP tracking failed:", e);
    }

    // Track CLS (Cumulative Layout Shift)
    try {
      const observer = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          const e = entry as any;
          if (!e.hadRecentInput) {
            clsValue += e.value || 0;
          }
        }
        const metric: WebVitalsMetric = {
          name: "CLS",
          value: clsValue,
          unit: "",
          timestamp: Date.now(),
          rating: getRating("CLS", clsValue),
        };
        reportWebVital(metric);
      });
      observer.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      console.error("CLS tracking failed:", e);
    }

    // Track FCP (First Contentful Paint)
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const metric: WebVitalsMetric = {
            name: "FCP",
            value: entries[0].startTime,
            unit: "ms",
            timestamp: Date.now(),
            rating: getRating("FCP", entries[0].startTime),
          };
          reportWebVital(metric);
        }
      });
      observer.observe({ type: "paint", buffered: true });
    } catch (e) {
      console.error("FCP tracking failed:", e);
    }
  }

  // Track TTFB (Time to First Byte)
  if (typeof window !== "undefined" && window.performance) {
    const perfData = window.performance.timing;
    if (perfData && perfData.responseStart && perfData.fetchStart) {
      const ttfb = perfData.responseStart - perfData.fetchStart;
      const metric: WebVitalsMetric = {
        name: "TTFB",
        value: ttfb,
        unit: "ms",
        timestamp: Date.now(),
        rating: getRating("TTFB", ttfb),
      };
      reportWebVital(metric);
    }
  }
}
