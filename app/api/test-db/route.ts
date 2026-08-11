import { NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function GET() {
  try {
    const session = driver.session();

    const result = await session.run(
      "RETURN 'CognoDB connection successful!' AS message"
    );

    await session.close();

    return NextResponse.json({
      success: true,
      message: result.records[0].get("message"),
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
  }
}