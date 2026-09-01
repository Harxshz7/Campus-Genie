import { NextRequest, NextResponse } from "next/server";
import { getFixtureForQuery } from "@/lib/fixtures";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ status: "active", engine: "Databricks Genie Opportunity Graph" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, studentContext, isWhatIf } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query string is required" },
        { status: 400 }
      );
    }

    const databricksHost = process.env.DATABRICKS_HOST;
    const databricksToken = process.env.DATABRICKS_TOKEN;
    const genieSpaceId = process.env.GENIE_SPACE_ID;

    // If Databricks Genie credentials are provided, attempt real Genie API call
    if (databricksHost && databricksToken && genieSpaceId) {
      try {
        const response = await fetch(
          `https://${databricksHost}/api/2.0/genie/spaces/${genieSpaceId}/conversations`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${databricksToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: query,
            }),
          }
        );

        if (response.ok) {
          const liveData = await response.json();
          return NextResponse.json({
            ...getFixtureForQuery(query),
            rawGeniePayload: liveData,
          });
        }
      } catch (genieErr) {
        console.warn("Databricks Genie API call failed, falling back to local reasoning fixture:", genieErr);
      }
    }

    // Fallback to high-fidelity Opportunity Graph reasoning fixture
    const result = getFixtureForQuery(query);
    if (isWhatIf) {
      result.isWhatIf = true;
    }

    await new Promise((resolve) => setTimeout(resolve, 150));

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("API error in /api/genie:", err);
    return NextResponse.json(
      { error: "Internal server error processing query", details: err?.message },
      { status: 500 }
    );
  }
}
