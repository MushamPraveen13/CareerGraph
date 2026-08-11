import { NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function GET() {
  const session = driver.session();

  try {
    // Clear the old CareerGraph data
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    // Create careers
    await session.run(`
      CREATE
        (da:Career {
          title: "Data Analyst",
          level: "Beginner → Job Ready"
        }),

        (ba:Career {
          title: "Business Analyst",
          level: "Beginner → Job Ready"
        }),

        (dm:Career {
          title: "Digital Marketing",
          level: "Beginner → Job Ready"
        })
    `);

    // Create skills
    await session.run(`
      MATCH (da:Career {title: "Data Analyst"})
      MATCH (ba:Career {title: "Business Analyst"})
      MATCH (dm:Career {title: "Digital Marketing"})

      CREATE
        (excel:Skill {name: "Excel"}),
        (sql:Skill {name: "SQL"}),
        (powerbi:Skill {name: "Power BI"}),
        (python:Skill {name: "Python"}),

        (businessStrategy:Skill {name: "Business Strategy"}),

        (seo:Skill {name: "SEO"}),
        (socialMedia:Skill {name: "Social Media"}),
        (analytics:Skill {name: "Analytics"}),
        (content:Skill {name: "Content"}),

        (da)-[:REQUIRES]->(excel),
        (da)-[:REQUIRES]->(sql),
        (da)-[:REQUIRES]->(powerbi),
        (da)-[:REQUIRES]->(python),

        (ba)-[:REQUIRES]->(excel),
        (ba)-[:REQUIRES]->(sql),
        (ba)-[:REQUIRES]->(powerbi),
        (ba)-[:REQUIRES]->(businessStrategy),

        (dm)-[:REQUIRES]->(seo),
        (dm)-[:REQUIRES]->(socialMedia),
        (dm)-[:REQUIRES]->(analytics),
        (dm)-[:REQUIRES]->(content)
    `);

    // Create roadmap steps
    await session.run(`
      MATCH (da:Career {title: "Data Analyst"})
      MATCH (ba:Career {title: "Business Analyst"})
      MATCH (dm:Career {title: "Digital Marketing"})

      CREATE
        (da1:RoadmapStep {
          number: "01",
          title: "Learn Excel",
          description: "Master Excel formulas, functions, pivot tables, and data cleaning."
        }),
        (da2:RoadmapStep {
          number: "02",
          title: "Learn SQL",
          description: "Learn queries, joins, filtering, grouping, and data analysis."
        }),
        (da3:RoadmapStep {
          number: "03",
          title: "Learn Power BI",
          description: "Build dashboards, reports, and interactive data visualizations."
        }),
        (da4:RoadmapStep {
          number: "04",
          title: "Build Projects",
          description: "Create real-world data analysis projects and prepare your resume."
        }),

        (ba1:RoadmapStep {
          number: "01",
          title: "Learn Excel",
          description: "Master Excel, data analysis, and reporting."
        }),
        (ba2:RoadmapStep {
          number: "02",
          title: "Learn SQL",
          description: "Learn databases, queries, joins, and business data analysis."
        }),
        (ba3:RoadmapStep {
          number: "03",
          title: "Learn Business Strategy",
          description: "Understand requirements, processes, KPIs, and business decisions."
        }),
        (ba4:RoadmapStep {
          number: "04",
          title: "Get Job Ready",
          description: "Build projects, prepare your resume, and start applying."
        }),

        (dm1:RoadmapStep {
          number: "01",
          title: "Learn SEO",
          description: "Learn keyword research, on-page SEO, and search optimization."
        }),
        (dm2:RoadmapStep {
          number: "02",
          title: "Learn Social Media",
          description: "Learn content planning, social media strategy, and engagement."
        }),
        (dm3:RoadmapStep {
          number: "03",
          title: "Learn Analytics",
          description: "Understand website, campaign, and marketing performance data."
        }),
        (dm4:RoadmapStep {
          number: "04",
          title: "Get Job Ready",
          description: "Build a portfolio, prepare your resume, and start applying."
        }),

        (da)-[:HAS_STEP]->(da1),
        (da)-[:HAS_STEP]->(da2),
        (da)-[:HAS_STEP]->(da3),
        (da)-[:HAS_STEP]->(da4),

        (ba)-[:HAS_STEP]->(ba1),
        (ba)-[:HAS_STEP]->(ba2),
        (ba)-[:HAS_STEP]->(ba3),
        (ba)-[:HAS_STEP]->(ba4),

        (dm)-[:HAS_STEP]->(dm1),
        (dm)-[:HAS_STEP]->(dm2),
        (dm)-[:HAS_STEP]->(dm3),
        (dm)-[:HAS_STEP]->(dm4)
    `);

    return NextResponse.json({
      success: true,
      message: "CareerGraph database seeded successfully!",
    });
  } catch (error) {
    console.error("Seed error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Could not seed CareerGraph database",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}