import { getAllTools } from "@/lib/tools";

export async function GET() {
  const tools = getAllTools().map((t) => ({
    slug: t.slug,
    name: t.name,
  }));
  return Response.json(tools);
}
