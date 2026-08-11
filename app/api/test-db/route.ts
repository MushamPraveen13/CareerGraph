import { NextResponse } from "next/server";
import { getNeo4jDriver } from "@/lib/neo4j";

export async function GET() {
  const driver = getNeo4jDriver();
  const session = driver.session();

  try {
    const result = await session.run(
      "RETURN 'Cognodb connection successful!' AS message"
    );

    return NextResponse.json({
      success: true,
      message: result.records[0]?.get("message") ?? "Connected successfully",
    });
  } catch (error) {
    console.error("CognoDB connection error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Could not connect to CognoDB",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}
