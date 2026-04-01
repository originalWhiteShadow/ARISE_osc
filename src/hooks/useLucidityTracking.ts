import { useEffect } from "react";
import { useLucidity } from "@/store/lucidity";

export function useLucidityTracking() {
  const { addPageTime } = useLucidity();

  useEffect(() => {
    let timeSpent = 0;

    // Increment page time every 5 seconds
    const interval = setInterval(() => {
      timeSpent += 5;
      addPageTime(5);
    }, 5000);

    return () => {
      clearInterval(interval);
      // Add remaining time on unmount
      if (timeSpent % 5 !== 0) {
        addPageTime(timeSpent % 5);
      }
    };
  }, [addPageTime]);
}
