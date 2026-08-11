import { NextResponse } from "next/server";
import { getNeo4jDriver } from "@/lib/neo4j";  

export async function GET() {
  const driver = getNeo4jDriver();
const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (c:Career)
      RETURN c.title AS title
      ORDER BY c.title
    `);

    const careers = result.records.map((record) => ({
      title: record.get("title"),
    }));

    return NextResponse.json({
      success: true,
      careers,
    });
  } catch (error) {
    console.error("Career fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch careers from CognoDB",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}
