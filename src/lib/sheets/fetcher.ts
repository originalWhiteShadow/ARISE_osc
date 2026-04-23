// src/lib/sheets/fetcher.ts

/**
 * Fetches a published Google Sheet as CSV and parses it into an array of objects.
 * 
 * @param documentId The long ID of the published Google Sheet (the "e/..." part)
 * @param gid The specific tab ID (gid). Defaults to '0' (the first tab).
 * @returns An array of objects where keys are the column headers.
 */
export async function fetchGoogleSheet(documentId: string, gid: string = "0"): Promise<any[]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/e/${documentId}/pub?gid=${gid}&single=true&output=csv`;
    
    // We use Next.js fetch with a brief revalidation period so it updates frequently
    // without hitting the actual URL on every single user request.
    const res = await fetch(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      console.error("Failed to fetch Google Sheet data:", res.statusText);
      return [];
    }

    const csvText = await res.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Error fetching Google Sheet:", error);
    return [];
  }
}

/**
 * A lightweight, dependency-free CSV parser.
 * Handles basic quotes and commas.
 */
function parseCSV(csvText: string): any[] {
  if (!csvText) return [];

  // Split into lines, accounting for potential \r\n
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== "");
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const obj: any = {};
    
    // Skip empty rows
    if (values.length === 0 || (values.length === 1 && !values[0])) continue;

    headers.forEach((header, index) => {
      // Clean headers to be safe object keys
      const key = header.trim().replace(/[^a-zA-Z0-9_]/g, '');
      obj[key] = values[index] ? values[index].trim() : "";
    });
    
    // Only add if the object has at least one actual value
    if (Object.values(obj).some(val => val !== "")) {
      results.push(obj);
    }
  }

  return results;
}

/**
 * Parses a single line of CSV, respecting double quotes.
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let currentVal = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      // Toggle quote state
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      // Strip surrounding quotes if present before pushing
      result.push(currentVal.replace(/^"|"$/g, ''));
      currentVal = "";
    } else {
      currentVal += char;
    }
  }
  
  result.push(currentVal.replace(/^"|"$/g, ''));
  return result;
}

/**
 * Extracts a Google Drive File ID from a public link and converts it to safe image URLs.
 * Returns an object with 'src' (for the img tag using thumbnail API to bypass CORS/restrictions) 
 * and 'href' (for the a tag to view the full resolution image).
 */
export function parseGoogleDriveImageLinks(rawLinks: string): { id: string, src: string, href: string }[] {
  if (!rawLinks) return [];
  
  // Split by comma in case the user pastes multiple links
  const links = rawLinks.split(',').map(l => l.trim()).filter(l => l !== "");
  
  return links.map(url => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    const fileId = match ? match[1] : null;
    
    // If it's just a raw ID instead of a link
    const finalId = fileId || (url.length > 15 && !url.includes('/') ? url : null);
    
    if (finalId) {
      return {
        id: finalId,
        src: `https://drive.google.com/thumbnail?id=${finalId}&sz=w1000`,
        href: `https://drive.google.com/uc?export=view&id=${finalId}`
      };
    }
    return { id: url, src: url, href: url }; // fallback
  });
}
