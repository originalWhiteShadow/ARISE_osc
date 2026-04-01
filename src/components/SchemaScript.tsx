import { generateOrganizationSchema } from "@/lib/schema";

export function SchemaScript() {
  const schema = generateOrganizationSchema();
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
      suppressHydrationWarning
    />
  );
}
