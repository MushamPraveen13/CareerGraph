"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Status =
  | "Applied"
  | "Shortlisted"
  | "Interview"
  | "Offer"
  | "Rejected";

type Level = 1 | 2 | 3;

type Project = {
  title: string;
  description: string;
  tools: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

type Question = {
  question: string;
  answer: string;
};

type Career = {
  title: string;
  icon: string;
  description: string;
  skills: string[];
  roadmap: string[];
  projects: Project[];
  resources: Record<string, string>;
  interview: Question[];
};

type Application = {
  id: number;
  company: string;
  role: string;
  date: string;
  status: Status;
  notes: string;
  followUp: string;
};

const statuses: Status[] = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Offer",
  "Rejected",
];

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const resumeItems = [
  "Update contact information",
  "Write a strong career summary",
  "Add relevant skills",
  "Add projects",
  "Add internships and experience",
  "Check ATS formatting",
];

const jobReadyItems = [
  "Complete your core skills",
  "Complete your roadmap",
  "Build portfolio projects",
  "Prepare your resume",
  "Practice interview questions",
  "Start applying",
];

const projectSteps: Record<string, string[]> = {
  "Sales Dashboard": [
    "Collect or download a sales dataset",
    "Clean the data and define KPIs",
    "Build charts and an interactive dashboard",
    "Write 3-5 business insights",
    "Publish the project to your portfolio",
  ],

  "Customer Churn Analysis": [
    "Load and clean the customer dataset",
    "Explore churn patterns",
    "Identify important churn factors",
    "Create useful visualizations",
    "Document recommendations",
  ],

  "E-commerce Data Analysis": [
    "Clean orders and customer data",
    "Analyze sales and product trends",
    "Use SQL/Excel for business questions",
    "Build a dashboard",
    "Summarize actionable insights",
  ],

  "Employee Performance Dashboard": [
    "Clean employee and attendance data",
    "Define performance KPIs",
    "Compare teams and departments",
    "Build an interactive dashboard",
    "Write management recommendations",
  ],

  "Business Requirements Document": [
    "Choose a sample business problem",
    "Identify stakeholders",
    "Document business requirements",
    "Add functional requirements",
    "Review and finalize the BRD",
  ],

  "Sales Performance Analysis": [
    "Collect sales data",
    "Define business KPIs",
    "Analyze trends and performance",
    "Create a dashboard",
    "Recommend improvements",
  ],

  "SEO Audit": [
    "Choose a website",
    "Review technical SEO",
    "Review on-page SEO",
    "Identify content opportunities",
    "Create an actionable audit report",
  ],

  "Social Media Campaign": [
    "Define campaign objective",
    "Identify target audience",
    "Create content calendar",
    "Define campaign KPIs",
    "Review performance and insights",
  ],
};

const careers: Career[] = [
  {
    title: "Data Analyst",
    icon: "📊",
    description:
      "Learn Excel, SQL, Power BI, Python and data visualization to become job ready.",

    skills: [
      "Excel",
      "SQL",
      "Power BI",
      "Python",
      "Data Visualization",
    ],

    roadmap: [
      "Learn Excel",
      "Learn SQL",
      "Learn Power BI",
      "Learn Python",
      "Learn Data Visualization",
      "Build Portfolio Projects",
      "Prepare for Interviews",
    ],

    projects: [
      {
        title: "Sales Dashboard",
        description:
          "Create a dashboard to analyze sales, revenue, products and regions.",
        tools: ["Excel", "Power BI"],
        difficulty: "Beginner",
      },
      {
        title: "Customer Churn Analysis",
        description:
          "Analyze customer behavior and identify factors responsible for churn.",
        tools: ["Python", "Pandas", "Power BI"],
        difficulty: "Intermediate",
      },
      {
        title: "E-commerce Data Analysis",
        description:
          "Analyze orders, customers, products and revenue trends.",
        tools: ["SQL", "Excel", "Power BI"],
        difficulty: "Intermediate",
      },
      {
        title: "Employee Performance Dashboard",
        description:
          "Analyze employee performance, attendance and department-level KPIs.",
        tools: ["Excel", "Power BI"],
        difficulty: "Beginner",
      },
    ],

    resources: {
      Excel:
        "Practice formulas, XLOOKUP, Pivot Tables, charts, conditional formatting and data cleaning.",

      SQL:
        "Practice SELECT, WHERE, JOIN, GROUP BY, subqueries and window functions.",

      "Power BI":
        "Learn Power Query, data modeling, DAX, KPIs and dashboard design.",

      Python:
        "Learn Python basics, Pandas, NumPy and data analysis.",

      "Data Visualization":
        "Choose the right chart, highlight KPIs and tell a clear story.",
    },

    interview: [
      {
        question: "Tell me about yourself.",
        answer:
          "Give a short introduction covering your education, skills, projects, internships and why you want to become a Data Analyst.",
      },
      {
        question: "What is data cleaning?",
        answer:
          "Data cleaning means identifying and correcting missing, duplicate, inconsistent or incorrect data.",
      },
      {
        question: "What is a Pivot Table?",
        answer:
          "A Pivot Table summarizes and analyzes large amounts of data quickly in Excel.",
      },
      {
        question: "What is a LEFT JOIN?",
        answer:
          "A LEFT JOIN returns all records from the left table and matching records from the right table.",
      },
      {
        question:
          "What is the difference between WHERE and HAVING?",
        answer:
          "WHERE filters rows before grouping, while HAVING filters grouped results.",
      },
      {
        question: "What makes a good dashboard?",
        answer:
          "A good dashboard is simple, focused on important KPIs and helps users make decisions.",
      },
    ],
  },

  {
    title: "Business Analyst",
    icon: "💼",
    description:
      "Learn business analysis, requirements gathering, reporting and decision making.",

    skills: [
      "Excel",
      "SQL",
      "Power BI",
      "Business Analysis",
      "Requirements Gathering",
    ],

    roadmap: [
      "Learn Excel",
      "Learn SQL",
      "Learn Business Analysis",
      "Learn Requirements Gathering",
      "Learn Documentation",
      "Build Business Case Studies",
      "Prepare for Interviews",
    ],

    projects: [
      {
        title: "Business Requirements Document",
        description:
          "Create a complete BRD for a sample business application.",
        tools: ["Excel", "Word", "PowerPoint"],
        difficulty: "Beginner",
      },
      {
        title: "Sales Performance Analysis",
        description:
          "Analyze sales performance and identify opportunities for improvement.",
        tools: ["Excel", "Power BI"],
        difficulty: "Beginner",
      },
      {
        title: "Customer Journey Analysis",
        description:
          "Map the customer journey and identify customer pain points.",
        tools: ["PowerPoint", "Excel"],
        difficulty: "Intermediate",
      },
      {
        title: "Business Process Improvement",
        description:
          "Analyze an existing process and propose practical improvements.",
        tools: ["Excel", "PowerPoint"],
        difficulty: "Intermediate",
      },
    ],

    resources: {
      Excel:
        "Practice Pivot Tables, formulas, charts and business reporting.",

      SQL:
        "Learn basic queries, joins, grouping and filtering.",

      "Power BI":
        "Learn dashboards, KPIs and business reporting.",

      "Business Analysis":
        "Learn stakeholder analysis, process analysis and problem solving.",

      "Requirements Gathering":
        "Learn interviews, workshops, documentation and requirement validation.",
    },

    interview: [
      {
        question: "What does a Business Analyst do?",
        answer:
          "A Business Analyst understands business problems, gathers requirements and helps teams create suitable solutions.",
      },
      {
        question: "What is requirement gathering?",
        answer:
          "It is the process of understanding, collecting, analyzing and documenting stakeholder needs.",
      },
      {
        question: "What is a BRD?",
        answer:
          "BRD stands for Business Requirements Document and describes the business needs and objectives of a project.",
      },
      {
        question: "What are functional requirements?",
        answer:
          "They describe what a system or product should do.",
      },
      {
        question: "How do you handle conflicting requirements?",
        answer:
          "Understand stakeholders, evaluate business impact, prioritize requirements and work toward an agreed solution.",
      },
    ],
  },

  {
    title: "Digital Marketing",
    icon: "📱",
    description:
      "Learn SEO, social media, content marketing and analytics.",

    skills: [
      "SEO",
      "Social Media",
      "Content Marketing",
      "Analytics",
      "Email Marketing",
    ],

    roadmap: [
      "Learn SEO",
      "Learn Social Media Marketing",
      "Learn Content Marketing",
      "Learn Marketing Analytics",
      "Learn Email Marketing",
      "Build Campaign Projects",
      "Prepare for Interviews",
    ],

    projects: [
      {
        title: "SEO Audit",
        description:
          "Perform an SEO audit and identify technical and content improvements.",
        tools: ["Google Search Console", "Excel"],
        difficulty: "Beginner",
      },
      {
        title: "Social Media Campaign",
        description:
          "Create a social media campaign with content and performance KPIs.",
        tools: ["Canva", "Instagram", "Excel"],
        difficulty: "Beginner",
      },
      {
        title: "Content Marketing Plan",
        description:
          "Create a monthly content calendar and content strategy.",
        tools: ["Canva", "Excel"],
        difficulty: "Beginner",
      },
      {
        title: "Marketing Analytics Dashboard",
        description:
          "Track traffic, leads, engagement and conversions.",
        tools: ["Excel", "Power BI"],
        difficulty: "Intermediate",
      },
    ],

    resources: {
      SEO:
        "Practice keyword research, on-page SEO, technical SEO and search performance tracking.",

      "Social Media":
        "Create content calendars, audience profiles, engagement plans and campaign KPIs.",

      "Content Marketing":
        "Practice content strategy, copywriting, storytelling and monthly content calendars.",

      Analytics:
        "Track traffic, engagement, leads, conversion rate and campaign performance.",

      "Email Marketing":
        "Practice segmentation, campaign planning, subject lines and performance tracking.",
    },

    interview: [
      {
        question: "What is SEO?",
        answer:
          "SEO is the process of improving a website's visibility in organic search results.",
      },
      {
        question: "What is social media marketing?",
        answer:
          "It uses social media platforms to build awareness, engage audiences and support business goals.",
      },
      {
        question: "What are digital marketing KPIs?",
        answer:
          "Common KPIs include traffic, engagement, conversion rate, leads, CPA and ROAS.",
      },
      {
        question: "How would you measure a campaign?",
        answer:
          "Define the objective, select suitable KPIs and compare actual performance with the target.",
      },
    ],
  },
];

const roadmapTips: Record<string, string> = {
  "Learn Excel":
    "Focus on formulas, XLOOKUP, Pivot Tables, charts, conditional formatting and data cleaning.",

  "Learn SQL":
    "Practice SELECT, filtering, JOINs, GROUP BY, subqueries and window functions using real datasets.",

  "Learn Power BI":
    "Learn Power Query, data modeling, DAX measures, KPIs and clean dashboard design.",

  "Learn Python":
    "Practice Python basics, Pandas, NumPy, data cleaning and exploratory data analysis.",

  "Learn Data Visualization":
    "Choose the right chart, highlight KPIs and tell a clear story with your visuals.",

  "Build Portfolio Projects":
    "Complete projects with a problem statement, dataset, analysis, insights and portfolio link.",

  "Prepare for Interviews":
    "Practice technical, behavioral and project questions and explain your work clearly.",

  "Learn Business Analysis":
    "Practice stakeholder analysis, process mapping, problem solving and business case thinking.",

  "Learn Requirements Gathering":
    "Practice interviews, workshops, documentation and validation.",

  "Learn Documentation":
    "Learn BRDs, user stories, acceptance criteria and clear process documentation.",

  "Build Business Case Studies":
    "Create case studies showing the problem, analysis, recommendation and expected impact.",

  "Learn SEO":
    "Practice keyword research, on-page SEO, technical SEO and search performance tracking.",

  "Learn Social Media Marketing":
    "Create content calendars, audience profiles, engagement plans and campaign KPIs.",

  "Learn Content Marketing":
    "Practice content strategy, copywriting, storytelling and monthly content calendars.",

  "Learn Marketing Analytics":
    "Track traffic, engagement, leads, conversion rate and campaign performance.",

  "Learn Email Marketing":
    "Practice segmentation, campaign planning, subject lines and performance tracking.",

  "Build Campaign Projects":
    "Build campaigns with objectives, target audience, content, KPIs and performance analysis.",
};

const calculateProgress = (
  completed: number,
  total: number
) =>
  total === 0
    ? 0
    : Math.round((completed / total) * 100);

function ProgressBar({
  value,
}: {
  value: number;
}) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
      <div
        className="h-full rounded-full bg-cyan-400 transition-all duration-500"
        style={{
          width: `${Math.max(
            0,
            Math.min(100, value)
          )}%`,
        }}
      />
    </div>
  );
}

export default function Home() {
  const [loggedIn, setLoggedIn] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [authMode, setAuthMode] =
    useState<"login" | "signup">("login");

  const [authError, setAuthError] =
    useState("");

  const [careerName, setCareerName] =
    useState("Data Analyst");

  const [careerSearch, setCareerSearch] =
    useState("");

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const career =
    careers.find(
      (item) =>
        item.title === careerName
    ) || careers[0];

  const [skills, setSkills] =
    useState<string[]>([]);

  const [roadmap, setRoadmap] =
    useState<string[]>([]);

  const [projects, setProjects] =
    useState<string[]>([]);

  const [interview, setInterview] =
    useState<string[]>([]);

  const [resume, setResume] =
    useState<string[]>([]);

  const [jobReady, setJobReady] =
    useState<string[]>([]);

  const [skillLevels, setSkillLevels] =
    useState<Record<string, Level>>({});

  const [projectLinks, setProjectLinks] =
    useState<Record<string, string>>({});

  const [mockScore, setMockScore] =
    useState(0);

  const [applications, setApplications] =
    useState<Application[]>([]);

  const [company, setCompany] =
    useState("");

  const [role, setRole] =
    useState("");

  const [applicationDate, setApplicationDate] =
    useState("");

  const [applicationStatus, setApplicationStatus] =
    useState<Status>("Applied");

  const [notes, setNotes] =
    useState("");

  const [followUp, setFollowUp] =
    useState("");

  const [applicationSearch, setApplicationSearch] =
    useState("");

  const [applicationFilter, setApplicationFilter] =
    useState<"All" | Status>("All");

  const [toast, setToast] =
    useState("");

  const [showProfile, setShowProfile] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showResource, setShowResource] =
    useState<string | null>(null);

  const [showProject, setShowProject] =
    useState<string | null>(null);

  const [loadedKey, setLoadedKey] =
    useState<string | null>(null);

  const storageKey =
    "careergraph_" +
    careerName
      .replace(/\s+/g, "_")
      .toLowerCase();

  useEffect(() => {
    setLoggedIn(
      localStorage.getItem(
        "careergraph_logged_in"
      ) === "true"
    );

    setName(
      localStorage.getItem(
        "careergraph_name"
      ) || ""
    );

    setEmail(
      localStorage.getItem(
        "careergraph_email"
      ) || ""
    );

    const savedCareer =
      localStorage.getItem(
        "careergraph_career"
      );

    if (
      savedCareer &&
      careers.some(
        (item) =>
          item.title === savedCareer
      )
    ) {
      setCareerName(savedCareer);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) return;

    setLoadedKey(null);

    try {
      setSkills(
        JSON.parse(
          localStorage.getItem(
            `${storageKey}_skills`
          ) || "[]"
        )
      );

      setRoadmap(
        JSON.parse(
          localStorage.getItem(
            `${storageKey}_roadmap`
          ) || "[]"
        )
      );

      setProjects(
        JSON.parse(
          localStorage.getItem(
            `${storageKey}_projects`
          ) || "[]"
        )
      );

      setInterview(
        JSON.parse(
          localStorage.getItem(
            `${storageKey}_interview`
          ) || "[]"
        )
      );

      setResume(
        JSON.parse(
          localStorage.getItem(
            `${storageKey}_resume`
          ) || "[]"
        )
      );

      setJobReady(
        JSON.parse(
          localStorage.getItem(
            `${storageKey}_jobready`
          ) || "[]"
        )
      );

      setSkillLevels(
        JSON.parse(
          localStorage.getItem(
            `${storageKey}_skill_levels`
          ) || "{}"
        )
      );

      setProjectLinks(
        JSON.parse(
          localStorage.getItem(
            `${storageKey}_project_links`
          ) || "{}"
        )
      );

      setMockScore(
        Number(
          localStorage.getItem(
            `${storageKey}_mock_score`
          ) || "0"
        )
      );

      setApplications(
        JSON.parse(
          localStorage.getItem(
            "careergraph_applications"
          ) || "[]"
        )
      );
    } catch {
      setSkills([]);
      setRoadmap([]);
      setProjects([]);
      setInterview([]);
      setResume([]);
      setJobReady([]);
      setSkillLevels({});
      setProjectLinks({});
      setMockScore(0);
      setApplications([]);
    } finally {
      setLoadedKey(storageKey);
    }
  }, [
    loggedIn,
    careerName,
    storageKey,
  ]);

  useEffect(() => {
    if (
      !loggedIn ||
      loadedKey !== storageKey
    ) {
      return;
    }

    localStorage.setItem(
      `${storageKey}_skills`,
      JSON.stringify(skills)
    );

    localStorage.setItem(
      `${storageKey}_roadmap`,
      JSON.stringify(roadmap)
    );

    localStorage.setItem(
      `${storageKey}_projects`,
      JSON.stringify(projects)
    );

    localStorage.setItem(
      `${storageKey}_interview`,
      JSON.stringify(interview)
    );

    localStorage.setItem(
      `${storageKey}_resume`,
      JSON.stringify(resume)
    );

    localStorage.setItem(
      `${storageKey}_jobready`,
      JSON.stringify(jobReady)
    );

    localStorage.setItem(
      `${storageKey}_skill_levels`,
      JSON.stringify(skillLevels)
    );

    localStorage.setItem(
      `${storageKey}_project_links`,
      JSON.stringify(projectLinks)
    );

    localStorage.setItem(
      `${storageKey}_mock_score`,
      String(mockScore)
    );

    localStorage.setItem(
      "careergraph_applications",
      JSON.stringify(applications)
    );

    localStorage.setItem(
      "careergraph_career",
      careerName
    );
  }, [
    loggedIn,
    loadedKey,
    storageKey,
    careerName,
    skills,
    roadmap,
    projects,
    interview,
    resume,
    jobReady,
    skillLevels,
    projectLinks,
    mockScore,
    applications,
  ]);

  const skillProgress =
    calculateProgress(
      skills.length,
      career.skills.length
    );

  const roadmapProgress =
    calculateProgress(
      roadmap.length,
      career.roadmap.length
    );

  const projectProgress =
    calculateProgress(
      projects.length,
      career.projects.length
    );

  const interviewProgress =
    calculateProgress(
      interview.length,
      career.interview.length
    );

  const resumeProgress =
    calculateProgress(
      resume.length,
      resumeItems.length
    );

  const jobReadyProgress =
    calculateProgress(
      jobReady.length,
      jobReadyItems.length
    );

  const readiness =
    Math.round(
      (
        skillProgress +
        roadmapProgress +
        projectProgress +
        interviewProgress +
        resumeProgress +
        jobReadyProgress
      ) / 6
    );

  const applicationCounts =
    useMemo(() => {
      return statuses.reduce(
        (result, status) => {
          result[status] =
            applications.filter(
              (item) =>
                item.status === status
            ).length;

          return result;
        },
        {} as Record<Status, number>
      );
    }, [applications]);

  const responseRate =
    applications.length === 0
      ? 0
      : calculateProgress(
          applicationCounts.Shortlisted +
            applicationCounts.Interview +
            applicationCounts.Offer,
          applications.length
        );

  const offerRate =
    applications.length === 0
      ? 0
      : calculateProgress(
          applicationCounts.Offer,
          applications.length
        );

  const linkedProjects =
    career.projects.filter(
      (project) =>
        Boolean(
          projectLinks[
            project.title
          ]?.trim()
        )
    ).length;

  const portfolioProgress =
    calculateProgress(
      linkedProjects,
      career.projects.length
    );

  const upcomingFollowUps =
    useMemo(() => {
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      return applications
        .filter(
          (item) =>
            item.followUp &&
            item.followUp >= today &&
            item.status !== "Rejected" &&
            item.status !== "Offer"
        )
        .sort((a, b) =>
          a.followUp.localeCompare(
            b.followUp
          )
        );
    }, [applications]);

  const nextAction =
    useMemo(() => {
      const nextSkill =
        career.skills.find(
          (item) =>
            !skills.includes(item)
        );

      if (nextSkill) {
        return {
          text: `Complete ${nextSkill}`,
          description:
            `Learn ${nextSkill} and mark it complete in your skill tracker.`,
          section: "skills",
        };
      }

      const nextRoadmap =
        career.roadmap.find(
          (item) =>
            !roadmap.includes(item)
        );

      if (nextRoadmap) {
        return {
          text: nextRoadmap,
          description:
            "Complete this roadmap step to continue your career path.",
          section: "roadmap",
        };
      }

      const nextProject =
        career.projects.find(
          (item) =>
            !projects.includes(
              item.title
            )
        );

      if (nextProject) {
        return {
          text: `Build ${nextProject.title}`,
          description:
            "Complete this portfolio project and add it to your portfolio.",
          section: "projects",
        };
      }

      if (
        interview.length <
        career.interview.length
      ) {
        return {
          text:
            "Practice interview questions",
          description:
            "Practice the questions for your selected career.",
          section: "interview",
        };
      }

      if (
        resume.length <
        resumeItems.length
      ) {
        return {
          text:
            "Complete your resume checklist",
          description:
            "Finish the important resume tasks before applying.",
          section: "resume",
        };
      }

      if (
        jobReady.length <
        jobReadyItems.length
      ) {
        return {
          text:
            "Complete your job-ready checklist",
          description:
            "Finish the final checklist before seriously applying.",
          section: "jobready",
        };
      }

      return {
        text: "Start applying for jobs",
        description:
          "Your preparation is complete. Start tracking applications.",
        section: "applications",
      };
    }, [
      career,
      skills,
      roadmap,
      projects,
      interview,
      resume,
      jobReady,
    ]);

  const readinessStatus =
    readiness === 100
      ? [
          "Job Ready! 🎉",
          "Excellent work. You have completed your CareerGraph journey.",
        ]
      : readiness >= 80
      ? [
          "Almost Job Ready 🚀",
          "You are very close. Finish the remaining tasks and start applying.",
        ]
      : readiness >= 50
      ? [
          "You're Building Momentum 💪",
          "You have made good progress. Keep completing your roadmap and projects.",
        ]
      : readiness > 0
      ? [
          "You're Getting Started 🌱",
          "Keep completing your skills and roadmap one step at a time.",
        ]
      : [
          "Let's Get Started 🚀",
          "Start with your first recommended action to begin your career journey.",
        ];

  const filteredCareers =
    careers.filter((item) =>
      `${item.title} ${item.skills.join(
        " "
      )}`
        .toLowerCase()
        .includes(
          careerSearch.toLowerCase()
        )
    );

  const filteredApplications =
    applications.filter((item) => {
      const query =
        applicationSearch
          .toLowerCase()
          .trim();

      const matchesSearch =
        !query ||
        `${item.company} ${item.role}`
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        applicationFilter === "All" ||
        item.status ===
          applicationFilter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  function notify(message: string) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  }

  function toggleItem(
    value: string,
    list: string[],
    setter: (
      value: string[]
    ) => void
  ) {
    if (list.includes(value)) {
      setter(
        list.filter(
          (item) =>
            item !== value
        )
      );

      notify(
        "Marked incomplete"
      );
    } else {
      setter([
        ...list,
        value,
      ]);

      notify(
        "Completed ✓"
      );
    }
  }

  function changeSkillLevel(
    skill: string,
    direction: 1 | -1
  ) {
    setSkillLevels(
      (current) => {
        const currentLevel =
          current[skill] || 1;

        const nextLevel =
          Math.min(
            3,
            Math.max(
              1,
              currentLevel +
                direction
            )
          ) as Level;

        return {
          ...current,
          [skill]: nextLevel,
        };
      }
    );

    notify(
      "Skill level updated ✓"
    );
  }

  function goTo(section: string) {
    setActiveSection(section);
    setMobileMenu(false);

    setTimeout(() => {
      document
        .getElementById(section)
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 30);
  }

  function submitAuth(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setAuthError("");

    if (
      !email.trim() ||
      !password
    ) {
      setAuthError(
        "Please enter email and password."
      );
      return;
    }

    if (
      authMode === "signup" &&
      !name.trim()
    ) {
      setAuthError(
        "Please enter your name."
      );
      return;
    }

    if (password.length < 6) {
      setAuthError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    localStorage.setItem(
      "careergraph_logged_in",
      "true"
    );

    localStorage.setItem(
      "careergraph_name",
      name.trim() || "User"
    );

    localStorage.setItem(
      "careergraph_email",
      email.trim()
    );

    localStorage.setItem(
      "careergraph_career",
      careerName
    );

    setLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem(
      "careergraph_logged_in"
    );

    setLoggedIn(false);
  }

  function exportProgress() {
    const snapshot = {
      exportedAt:
        new Date().toISOString(),

      user: {
        name,
        email,
        career: careerName,
      },

      readiness: {
        overall: readiness,
        skills: skillProgress,
        roadmap: roadmapProgress,
        projects: projectProgress,
        interview: interviewProgress,
        resume: resumeProgress,
        jobReady:
          jobReadyProgress,
        mockInterviewScore:
          mockScore,
      },

      completed: {
        skills,
        roadmap,
        projects,
        interview,
        resume,
        jobReady,
      },

      skillLevels,
      projectLinks,
      applications,
    };

    const blob =
      new Blob(
        [
          JSON.stringify(
            snapshot,
            null,
            2
          ),
        ],
        {
          type: "application/json",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const anchor =
      document.createElement(
        "a"
      );

    anchor.href = url;

    anchor.download =
      `careergraph-${careerName
        .replace(
          /\s+/g,
          "-"
        )
        .toLowerCase()}-progress.json`;

    anchor.click();

    URL.revokeObjectURL(
      url
    );

    notify(
      "Progress exported ✓"
    );
  }

  function resetCareerProgress() {
    const confirmed =
      window.confirm(
        `Reset all ${careerName} progress? This cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    [
      "skills",
      "roadmap",
      "projects",
      "interview",
      "resume",
      "jobready",
      "skill_levels",
      "project_links",
      "mock_score",
    ].forEach(
      (suffix) => {
        localStorage.removeItem(
          `${storageKey}_${suffix}`
        );
      }
    );

    setSkills([]);
    setRoadmap([]);
    setProjects([]);
    setInterview([]);
    setResume([]);
    setJobReady([]);
    setSkillLevels({});
    setProjectLinks({});
    setMockScore(0);

    notify(
      "Career progress reset"
    );
  }

  function addApplication() {
    if (
      !company.trim() ||
      !role.trim()
    ) {
      notify(
        "Enter company and job title"
      );
      return;
    }

    const newApplication: Application =
      {
        id: Date.now(),
        company:
          company.trim(),
        role: role.trim(),
        date:
          applicationDate ||
          new Date()
            .toISOString()
            .split("T")[0],
        status:
          applicationStatus,
        notes:
          notes.trim(),
        followUp,
      };

    setApplications(
      (current) => [
        newApplication,
        ...current,
      ]
    );

    setCompany("");
    setRole("");
    setApplicationDate("");
    setApplicationStatus(
      "Applied"
    );
    setNotes("");
    setFollowUp("");

    notify(
      "Application added ✓"
    );
  }

  function updateApplicationStatus(
    id: number,
    status: Status
  ) {
    setApplications(
      (current) =>
        current.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  status,
                }
              : item
        )
    );

    notify(
      "Application updated ✓"
    );
  }

  function deleteApplication(
    id: number
  ) {
    if (
      !window.confirm(
        "Delete this application?"
      )
    ) {
      return;
    }

    setApplications(
      (current) =>
        current.filter(
          (item) =>
            item.id !== id
        )
    );

    notify(
      "Application deleted"
    );
  }

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold">
              Career
              <span className="text-cyan-400">
                Graph
              </span>
            </h1>

            <p className="mt-3 text-slate-400">
              Build your career.
              Track your progress.
              Get job ready.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl">
            <div className="mb-6 flex rounded-xl bg-slate-950 p-1">
              <button
                type="button"
                onClick={() =>
                  setAuthMode(
                    "login"
                  )
                }
                className={`flex-1 rounded-lg py-3 font-bold ${
                  authMode ===
                  "login"
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-400"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() =>
                  setAuthMode(
                    "signup"
                  )
                }
                className={`flex-1 rounded-lg py-3 font-bold ${
                  authMode ===
                  "signup"
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-400"
                }`}
              >
                Sign Up
              </button>
            </div>

            <h2 className="text-2xl font-bold">
              {authMode ===
              "login"
                ? "Welcome back 👋"
                : "Create your account 🚀"}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {authMode ===
              "login"
                ? "Login to continue your career journey."
                : "Create an account to start your career journey."}
            </p>

            <form
              onSubmit={
                submitAuth
              }
              className="mt-6 space-y-4"
            >
              {authMode ===
                "signup" && (
                <input
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target
                        .value
                    )
                  }
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
                />
              )}

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target
                      .value
                  )
                }
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target
                      .value
                  )
                }
                placeholder="Password (6+ characters)"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />

              {authMode ===
                "signup" && (
                <select
                  value={
                    careerName
                  }
                  onChange={(event) =>
                    setCareerName(
                      event.target
                        .value
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                >
                  {careers.map(
                    (item) => (
                      <option
                        key={
                          item.title
                        }
                        value={
                          item.title
                        }
                      >
                        {item.icon}{" "}
                        {item.title}
                      </option>
                    )
                  )}
                </select>
              )}

              {authError && (
                <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-300">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-400 py-3 font-bold text-slate-950 hover:bg-cyan-300"
              >
                {authMode ===
                "login"
                  ? "Login"
                  : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-full border border-cyan-400/30 bg-slate-900 px-5 py-3 text-sm font-bold text-cyan-300 shadow-2xl">
          {toast}
        </div>
      )}

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
          <button
            type="button"
            onClick={() =>
              goTo("dashboard")
            }
            className="text-2xl font-bold"
          >
            Career
            <span className="text-cyan-400">
              Graph
            </span>
          </button>

          <nav className="hidden gap-4 text-sm text-slate-300 lg:flex">
            {[
              "dashboard",
              "careers",
              "roadmap",
              "skills",
              "projects",
              "interview",
              "resume",
              "applications",
            ].map((id) => (
              <button
                type="button"
                key={id}
                onClick={() =>
                  goTo(id)
                }
                className={
                  activeSection ===
                  id
                    ? "font-bold text-cyan-400"
                    : "hover:text-cyan-400"
                }
              >
                {id
                  .charAt(0)
                  .toUpperCase() +
                  id.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="rounded-xl border border-slate-700 px-3 py-2"
            >
              🔔
              {upcomingFollowUps.length >
                0 && (
                <span className="ml-1 text-cyan-400">
                  {
                    upcomingFollowUps.length
                  }
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }
              className="rounded-xl border border-slate-700 px-3 py-2 lg:hidden"
            >
              ☰
            </button>

            <button
              type="button"
              onClick={() =>
                setShowProfile(
                  true
                )
              }
              className="rounded-xl border border-slate-700 px-3 py-2"
            >
              👤{" "}
              {name || "User"}
            </button>

            <button
              type="button"
              onClick={logout}
              className="rounded-xl bg-red-500/10 px-3 py-2 text-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      {mobileMenu && (
        <div className="sticky top-[69px] z-40 border-b border-slate-800 bg-slate-950 p-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {[
              "dashboard",
              "careers",
              "roadmap",
              "skills",
              "projects",
              "interview",
              "resume",
              "applications",
            ].map((id) => (
              <button
                type="button"
                key={id}
                onClick={() =>
                  goTo(id)
                }
                className="rounded-xl bg-slate-900 p-3 text-left"
              >
                {id
                  .charAt(0)
                  .toUpperCase() +
                  id.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* NOTIFICATIONS */}

      {showNotifications && (
        <div className="fixed right-5 top-20 z-[100] w-[min(92vw,380px)] rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl">
          <div className="flex justify-between">
            <b>
              Notifications 🔔
            </b>

            <button
              type="button"
              onClick={() =>
                setShowNotifications(
                  false
                )
              }
            >
              ×
            </button>
          </div>

          {upcomingFollowUps.length >
          0 ? (
            <div className="mt-4 space-y-2">
              {upcomingFollowUps
                .slice(0, 5)
                .map(
                  (item) => (
                    <button
                      type="button"
                      key={
                        item.id
                      }
                      onClick={() => {
                        setShowNotifications(
                          false
                        );
                        goTo(
                          "applications"
                        );
                      }}
                      className="w-full rounded-xl bg-slate-950 p-3 text-left"
                    >
                      <b>
                        Follow up:{" "}
                        {
                          item.company
                        }
                      </b>

                      <p className="text-xs text-cyan-400">
                        {item.role} ·{" "}
                        {
                          item.followUp
                        }
                      </p>
                    </button>
                  )
                )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">
              No upcoming
              follow-ups.
            </p>
          )}
        </div>
      )}

      {/* PROFILE */}

      {showProfile && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 px-5"
          onClick={() =>
            setShowProfile(
              false
            )
          }
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-7"
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">
                Profile 👤
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowProfile(
                    false
                  )
                }
                className="text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500">
                  Name
                </p>

                <input
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target
                        .value
                    )
                  }
                  onBlur={() =>
                    localStorage.setItem(
                      "careergraph_name",
                      name
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <input
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target
                        .value
                    )
                  }
                  onBlur={() =>
                    localStorage.setItem(
                      "careergraph_email",
                      email
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Selected Career
                </p>

                <select
                  value={
                    careerName
                  }
                  onChange={(event) =>
                    setCareerName(
                      event.target
                        .value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                >
                  {careers.map(
                    (item) => (
                      <option
                        key={
                          item.title
                        }
                        value={
                          item.title
                        }
                      >
                        {item.icon}{" "}
                        {item.title}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="rounded-2xl bg-slate-950 p-5">
                <p className="text-sm text-slate-500">
                  Career Readiness
                </p>

                <p className="mt-2 text-4xl font-bold text-cyan-400">
                  {readiness}%
                </p>

                <div className="mt-3">
                  <ProgressBar
                    value={
                      readiness
                    }
                  />
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  {
                    readinessStatus[0]
                  }
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={
                    exportProgress
                  }
                  className="rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950"
                >
                  Export My Progress
                </button>

                <button
                  type="button"
                  onClick={
                    resetCareerProgress
                  }
                  className="rounded-xl border border-red-400/40 px-4 py-3 font-bold text-red-300"
                >
                  Reset Career Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}

      <section
        id="dashboard"
        className="mx-auto max-w-7xl px-5 py-20 text-center"
      >
        <p className="font-bold text-cyan-400">
          WELCOME BACK,{" "}
          {(name || "USER").toUpperCase()}
        </p>

        <h1 className="mt-5 text-5xl font-bold leading-tight md:text-7xl">
          Build the career{" "}
          <span className="text-cyan-400">
            that fits you.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-slate-400">
          Explore careers,
          complete skills,
          follow your roadmap,
          build projects,
          prepare for interviews
          and track your job
          applications.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() =>
              goTo("careers")
            }
            className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950"
          >
            Explore Careers
          </button>

          <button
            type="button"
            onClick={() =>
              goTo(
                nextAction.section
              )
            }
            className="rounded-xl border border-cyan-400 px-6 py-3 font-bold text-cyan-400"
          >
            Continue Journey →
          </button>
        </div>
      </section>

      {/* CAREERS */}

      <section
        id="careers"
        className="border-y border-slate-800 bg-slate-900/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="font-bold text-cyan-400">
            CAREER PATHS
          </p>

          <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-bold">
                Choose your career
              </h2>

              <p className="mt-2 text-slate-400">
                Select a career to
                get a personalized
                roadmap.
              </p>
            </div>

            <input
              value={careerSearch}
              onChange={(event) =>
                setCareerSearch(
                  event.target
                    .value
                )
              }
              placeholder="Search career or skill..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 md:max-w-sm"
            />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {filteredCareers.map(
              (item) => (
                <div
                  key={
                    item.title
                  }
                  className={`rounded-2xl border p-6 ${
                    item.title ===
                    careerName
                      ? "border-cyan-400 bg-cyan-400/5"
                      : "border-slate-800 bg-slate-950"
                  }`}
                >
                  <div className="text-4xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-4 text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {
                      item.description
                    }
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map(
                      (skill) => (
                        <span
                          key={
                            skill
                          }
                          className="rounded-full bg-slate-800 px-3 py-1 text-xs"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCareerName(
                        item.title
                      );
                      goTo(
                        "dashboard"
                      );
                      notify(
                        `${item.title} selected ✓`
                      );
                    }}
                    className={`mt-5 w-full rounded-xl py-3 font-bold ${
                      item.title ===
                      careerName
                        ? "bg-green-400 text-slate-950"
                        : "bg-cyan-400 text-slate-950"
                    }`}
                  >
                    {item.title ===
                    careerName
                      ? "Selected ✓"
                      : "Choose Career"}
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* DASHBOARD */}

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-7">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="font-bold text-cyan-400">
                YOUR DASHBOARD
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {career.icon}{" "}
                {career.title}
              </h2>

              <p className="mt-2 text-slate-400">
                {career.description}
              </p>

              <p className="mt-3 font-bold text-cyan-300">
                {readinessStatus[0]}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-500">
                Overall Readiness
              </p>

              <p className="text-5xl font-bold text-cyan-400">
                {readiness}%
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ProgressBar
              value={
                readiness
              }
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              [
                "Skills",
                skillProgress,
              ],
              [
                "Roadmap",
                roadmapProgress,
              ],
              [
                "Projects",
                projectProgress,
              ],
              [
                "Interview",
                interviewProgress,
              ],
              [
                "Resume",
                resumeProgress,
              ],
              [
                "Job Ready",
                jobReadyProgress,
              ],
            ].map(
              ([label, value]) => (
                <div
                  key={
                    String(
                      label
                    )
                  }
                  className="rounded-xl bg-slate-950 p-4"
                >
                  <p className="text-xs text-slate-500">
                    {label}
                  </p>

                  <p className="mt-1 text-xl font-bold text-cyan-400">
                    {value}%
                  </p>
                </div>
              )
            )}
          </div>

          <div className="mt-5 rounded-2xl bg-slate-950 p-5">
            <p className="text-sm font-bold text-cyan-300">
              YOUR NEXT ACTION 🎯
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {nextAction.text}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {
                nextAction.description
              }
            </p>

            <button
              type="button"
              onClick={() =>
                goTo(
                  nextAction.section
                )
              }
              className="mt-4 rounded-xl bg-cyan-400 px-5 py-2 font-bold text-slate-950"
            >
              Start Next Step →
            </button>
          </div>
        </div>
      </section>

      {/* CAREER INSIGHTS */}

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold text-cyan-400">
                CAREER INSIGHTS
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Know what to improve
                next
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Preparation progress and
                job-search activity in one
                view.
              </p>
            </div>

            <button
              type="button"
              onClick={
                exportProgress
              }
              className="rounded-xl border border-cyan-400 px-4 py-2 font-bold text-cyan-400"
            >
              Export Progress ↓
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Portfolio Links",
                `${portfolioProgress}%`,
              ],
              [
                "Response Rate",
                `${responseRate}%`,
              ],
              [
                "Offer Rate",
                `${offerRate}%`,
              ],
              [
                "Follow-ups",
                String(
                  upcomingFollowUps.length
                ),
              ],
            ].map(
              ([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-slate-950 p-5"
                >
                  <p className="text-sm text-slate-500">
                    {label}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-cyan-400">
                    {value}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ROADMAP */}

      <section
        id="roadmap"
        className="border-y border-slate-800 bg-slate-900/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="font-bold text-cyan-400">
            ROADMAP
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Your {career.title} Roadmap
          </h2>

          <div className="mt-5 max-w-2xl">
            <ProgressBar
              value={
                roadmapProgress
              }
            />

            <div className="mt-2 flex justify-between text-sm text-slate-400">
              <span>
                {roadmap.length} of{" "}
                {
                  career.roadmap
                    .length
                }
              </span>

              <span>
                {roadmapProgress}%
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {career.roadmap.map(
              (step, index) => {
                const done =
                  roadmap.includes(
                    step
                  );

                return (
                  <button
                    type="button"
                    key={step}
                    onClick={() =>
                      toggleItem(
                        step,
                        roadmap,
                        setRoadmap
                      )
                    }
                    className={`rounded-2xl border p-5 text-left ${
                      done
                        ? "border-green-400/30 bg-green-400/5"
                        : "border-slate-800 bg-slate-950 hover:border-cyan-400/50"
                    }`}
                  >
                    <span className="text-2xl font-bold text-cyan-400">
                      {done
                        ? "✓"
                        : String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                    </span>

                    <h3 className="mt-3 font-bold">
                      {step}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {done
                        ? "Completed ✓"
                        : "Click to mark this step completed."}
                    </p>

                    <p className="mt-3 rounded-xl bg-slate-900 p-3 text-xs leading-5 text-slate-500">
                      <b className="text-cyan-400">
                        Focus:
                      </b>{" "}
                      {roadmapTips[
                        step
                      ] ||
                        "Practice this skill and keep evidence in your portfolio."}
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* SKILLS */}

      <section
        id="skills"
        className="mx-auto max-w-7xl px-5 py-16"
      >
        <p className="font-bold text-cyan-400">
          SKILL TRACKER
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          Skills to learn
        </h2>

        <p className="mt-2 text-slate-400">
          Track completion and grow
          from Beginner to Advanced.
        </p>

        <div className="mt-5 max-w-2xl">
          <ProgressBar
            value={
              skillProgress
            }
          />

          <p className="mt-2 text-sm text-slate-400">
            {skills.length} of{" "}
            {career.skills.length}{" "}
            completed ·{" "}
            {skillProgress}%
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {career.skills.map(
            (skill) => {
              const done =
                skills.includes(
                  skill
                );

              const level =
                skillLevels[
                  skill
                ] || 1;

              return (
                <div
                  key={skill}
                  className={`rounded-2xl border p-5 ${
                    done
                      ? "border-green-400/30 bg-green-400/5"
                      : "border-slate-800 bg-slate-900"
                  }`}
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <h3 className="font-bold">
                        {done
                          ? "✓ "
                          : "○ "}
                        {skill}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Level:{" "}
                        <span className="text-cyan-400">
                          {
                            levels[
                              level - 1
                            ]
                          }
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          changeSkillLevel(
                            skill,
                            -1
                          )
                        }
                        className="h-8 w-8 rounded-lg border border-slate-700"
                      >
                        −
                      </button>

                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs">
                        {
                          levels[
                            level - 1
                          ]
                        }
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          changeSkillLevel(
                            skill,
                            1
                          )
                        }
                        className="h-8 w-8 rounded-lg border border-slate-700"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleItem(
                            skill,
                            skills,
                            setSkills
                          )
                        }
                        className={`rounded-xl px-4 py-2 text-sm font-bold ${
                          done
                            ? "bg-green-400 text-slate-950"
                            : "bg-cyan-400 text-slate-950"
                        }`}
                      >
                        {done
                          ? "Completed"
                          : "Complete"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-1">
                    {[1, 2, 3].map(
                      (item) => (
                        <div
                          key={
                            item
                          }
                          className={`h-2 flex-1 rounded-full ${
                            item <=
                            level
                              ? "bg-cyan-400"
                              : "bg-slate-800"
                          }`}
                        />
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowResource(
                        showResource ===
                          skill
                          ? null
                          : skill
                      )
                    }
                    className="mt-4 text-sm text-cyan-400"
                  >
                    {showResource ===
                    skill
                      ? "Hide learning tip"
                      : "View learning tip →"}
                  </button>

                  {showResource ===
                    skill && (
                    <p className="mt-3 rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-400">
                      {
                        career
                          .resources[
                          skill
                        ]
                      }
                    </p>
                  )}
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* PROJECTS */}

      <section
        id="projects"
        className="border-y border-slate-800 bg-slate-900/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="font-bold text-cyan-400">
            PROJECT BUILDER
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Build your portfolio 🚀
          </h2>

          <p className="mt-2 text-slate-400">
            Complete projects, save
            links and build evidence
            for your resume.
          </p>

          <div className="mt-5 max-w-2xl">
            <ProgressBar
              value={
                projectProgress
              }
            />

            <p className="mt-2 text-sm text-slate-400">
              {projects.length} of{" "}
              {
                career.projects
                  .length
              }{" "}
              completed ·{" "}
              {projectProgress}%
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {career.projects.map(
              (project) => {
                const done =
                  projects.includes(
                    project.title
                  );

                const open =
                  showProject ===
                  project.title;

                return (
                  <div
                    key={
                      project.title
                    }
                    className={`rounded-2xl border p-5 ${
                      done
                        ? "border-green-400/30 bg-green-400/5"
                        : "border-slate-800 bg-slate-950"
                    }`}
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">
                          {
                            project.title
                          }
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {
                            project.description
                          }
                        </p>
                      </div>

                      <span className="h-fit rounded-full bg-slate-800 px-2 py-1 text-xs">
                        {
                          project.difficulty
                        }
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tools.map(
                        (tool) => (
                          <span
                            key={
                              tool
                            }
                            className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
                          >
                            {tool}
                          </span>
                        )
                      )}
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          toggleItem(
                            project.title,
                            projects,
                            setProjects
                          )
                        }
                        className={`rounded-xl px-4 py-2 font-bold ${
                          done
                            ? "bg-green-400 text-slate-950"
                            : "bg-cyan-400 text-slate-950"
                        }`}
                      >
                        {done
                          ? "Completed ✓"
                          : "Mark Completed"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowProject(
                            open
                              ? null
                              : project.title
                          )
                        }
                        className="rounded-xl border border-slate-700 px-4 py-2"
                      >
                        {open
                          ? "Hide"
                          : "Details"}
                      </button>
                    </div>

                    {open && (
                      <div className="mt-5 rounded-xl bg-slate-900 p-4 text-sm text-slate-400">
                        <b className="text-white">
                          Project Steps
                        </b>

                        <ol className="mt-3 space-y-2">
                          {(
                            projectSteps[
                              project.title
                            ] || [
                              "Define the problem",
                              "Collect data",
                              "Analyze",
                              "Create output",
                              "Document results",
                            ]
                          ).map(
                            (
                              step,
                              index
                            ) => (
                              <li
                                key={
                                  step
                                }
                              >
                                <span className="mr-2 text-cyan-400">
                                  {index +
                                    1}
                                  .
                                </span>
                                {
                                  step
                                }
                              </li>
                            )
                          )}
                        </ol>

                        <label className="mt-5 block font-bold text-white">
                          GitHub /
                          Portfolio
                          Link
                        </label>

                        <input
                          value={
                            projectLinks[
                              project.title
                            ] || ""
                          }
                          onChange={(
                            event
                          ) =>
                            setProjectLinks(
                              (
                                current
                              ) => ({
                                ...current,
                                [project.title]:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="https://github.com/..."
                          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                        />

                        {projectLinks[
                          project.title
                        ] && (
                          <a
                            href={
                              projectLinks[
                                project.title
                              ]
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-cyan-400"
                          >
                            Open project
                            link →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* INTERVIEW */}

      <section
        id="interview"
        className="mx-auto max-w-7xl px-5 py-16"
      >
        <p className="font-bold text-cyan-400">
          INTERVIEW PREPARATION
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          Prepare for interviews 🎤
        </h2>

        <div className="mt-5 max-w-2xl">
          <ProgressBar
            value={
              interviewProgress
            }
          />

          <p className="mt-2 text-sm text-slate-400">
            {interview.length} of{" "}
            {
              career.interview
                .length
            }{" "}
            practiced ·{" "}
            {interviewProgress}%
          </p>
        </div>

        <div className="mt-7 flex flex-col justify-between gap-5 rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 md:flex-row md:items-center">
          <div>
            <p className="font-bold text-cyan-400">
              MOCK INTERVIEW SCORE
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Rate your current
              confidence
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Update this after a
              practice session.
            </p>
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold text-cyan-400">
              {mockScore}/100
            </p>

            <input
              type="range"
              min="0"
              max="100"
              value={mockScore}
              onChange={(event) =>
                setMockScore(
                  Number(
                    event.target
                      .value
                  )
                )
              }
              className="mt-2 w-56 accent-cyan-400"
            />
          </div>
        </div>

        <div className="mt-7 space-y-4">
          {career.interview.map(
            (item, index) => {
              const done =
                interview.includes(
                  item.question
                );

              return (
                <div
                  key={
                    item.question
                  }
                  className={`rounded-2xl border p-5 ${
                    done
                      ? "border-green-400/30 bg-green-400/5"
                      : "border-slate-800 bg-slate-900"
                  }`}
                >
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400 font-bold text-slate-950">
                      {index + 1}
                    </span>

                    <div>
                      <h3 className="font-bold">
                        {
                          item.question
                        }
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {
                          item.answer
                        }
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          toggleItem(
                            item.question,
                            interview,
                            setInterview
                          )
                        }
                        className={`mt-3 rounded-xl px-4 py-2 font-bold ${
                          done
                            ? "bg-green-400 text-slate-950"
                            : "border border-cyan-400 text-cyan-400"
                        }`}
                      >
                        {done
                          ? "Practiced ✓"
                          : "Mark Practiced"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* RESUME */}

      <section
        id="resume"
        className="border-y border-slate-800 bg-slate-900/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="font-bold text-cyan-400">
            RESUME BUILDER
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Make your resume job ready 📄
          </h2>

          <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-sm text-slate-400">
            <b className="text-cyan-300">
              Resume tip:
            </b>{" "}
            Focus on measurable
            results, relevant skills,
            strong project descriptions
            and ATS-friendly formatting.
          </div>

          <div className="mt-5 max-w-2xl">
            <ProgressBar
              value={
                resumeProgress
              }
            />

            <p className="mt-2 text-sm text-slate-400">
              {resume.length} of{" "}
              {resumeItems.length}{" "}
              completed ·{" "}
              {resumeProgress}%
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {resumeItems.map(
              (item) => {
                const done =
                  resume.includes(
                    item
                  );

                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() =>
                      toggleItem(
                        item,
                        resume,
                        setResume
                      )
                    }
                    className={`rounded-2xl border p-5 text-left ${
                      done
                        ? "border-green-400/30 bg-green-400/5"
                        : "border-slate-800 bg-slate-950"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <b>
                          {item}
                        </b>

                        <p className="mt-1 text-sm text-slate-500">
                          {done
                            ? "Completed ✓"
                            : "Click to mark complete"}
                        </p>
                      </div>

                      <span className="text-cyan-400">
                        {done
                          ? "✓"
                          : "○"}
                      </span>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* JOB READY */}

      <section
        id="jobready"
        className="mx-auto max-w-7xl px-5 py-16"
      >
        <p className="font-bold text-cyan-400">
          JOB READY CHECKLIST
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          Are you job ready? 🚀
        </h2>

        <p className="mt-2 text-slate-400">
          Complete the checklist before
          applying seriously.
        </p>

        <div className="mt-5 max-w-2xl">
          <ProgressBar
            value={
              jobReadyProgress
            }
          />

          <p className="mt-2 text-sm text-slate-400">
            {jobReady.length} of{" "}
            {jobReadyItems.length}{" "}
            completed ·{" "}
            {jobReadyProgress}%
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {jobReadyItems.map(
            (item) => {
              const done =
                jobReady.includes(
                  item
                );

              return (
                <button
                  type="button"
                  key={item}
                  onClick={() =>
                    toggleItem(
                      item,
                      jobReady,
                      setJobReady
                    )
                  }
                  className={`rounded-2xl border p-5 text-left ${
                    done
                      ? "border-green-400/30 bg-green-400/5"
                      : "border-slate-800 bg-slate-900"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <b>
                        {item}
                      </b>

                      <p className="mt-1 text-sm text-slate-500">
                        {done
                          ? "Completed ✓"
                          : "Click to complete"}
                      </p>
                    </div>

                    <span className="text-cyan-400">
                      {done
                        ? "✓"
                        : "○"}
                    </span>
                  </div>
                </button>
              );
            }
          )}
        </div>
      </section>

      {/* APPLICATION TRACKER */}

      <section
        id="applications"
        className="border-y border-slate-800 bg-slate-900/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="font-bold text-cyan-400">
            JOB SEARCH
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Application Tracker 📋
          </h2>

          <p className="mt-2 text-slate-400">
            Track applications, statuses and
            follow-ups in one place.
          </p>

          <div className="mt-7 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
            <h3 className="text-2xl font-bold">
              Add New Application
            </h3>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <input
                value={company}
                onChange={(event) =>
                  setCompany(
                    event.target
                      .value
                  )
                }
                placeholder="Company"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
              />

              <input
                value={role}
                onChange={(event) =>
                  setRole(
                    event.target
                      .value
                  )
                }
                placeholder="Job Title"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
              />

              <input
                type="date"
                value={
                  applicationDate
                }
                onChange={(event) =>
                  setApplicationDate(
                    event.target
                      .value
                  )
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
              />

              <select
                value={
                  applicationStatus
                }
                onChange={(event) =>
                  setApplicationStatus(
                    event.target
                      .value as Status
                  )
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
              >
                {statuses.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}
              </select>

              <input
                type="date"
                value={followUp}
                onChange={(event) =>
                  setFollowUp(
                    event.target
                      .value
                  )
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
              />

              <input
                value={notes}
                onChange={(event) =>
                  setNotes(
                    event.target
                      .value
                  )
                }
                placeholder="Notes"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
              />
            </div>

            <button
              type="button"
              onClick={
                addApplication
              }
              className="mt-4 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950"
            >
              + Add Application
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <input
              value={
                applicationSearch
              }
              onChange={(event) =>
                setApplicationSearch(
                  event.target
                    .value
                )
              }
              placeholder="Search company or role..."
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
            />

            <select
              value={
                applicationFilter
              }
              onChange={(event) =>
                setApplicationFilter(
                  event.target
                    .value as
                    | "All"
                    | Status
                )
              }
              className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
            >
              <option value="All">
                All
              </option>

              {statuses.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {statuses.map(
              (status) => (
                <div
                  key={status}
                  className="rounded-2xl bg-slate-950 p-4"
                >
                  <p className="text-xs text-slate-500">
                    {status}
                  </p>

                  <p className="mt-1 text-2xl font-bold text-cyan-400">
                    {
                      applicationCounts[
                        status
                      ]
                    }
                  </p>
                </div>
              )
            )}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Total Applications
              </p>

              <p className="mt-1 text-3xl font-bold text-cyan-400">
                {
                  applications.length
                }
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Response Rate
              </p>

              <p className="mt-1 text-3xl font-bold text-cyan-400">
                {responseRate}%
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Upcoming Follow-ups
              </p>

              <p className="mt-1 text-3xl font-bold text-yellow-400">
                {
                  upcomingFollowUps.length
                }
              </p>
            </div>
          </div>

          {upcomingFollowUps.length >
            0 && (
            <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">
              <b className="text-yellow-300">
                Follow-ups to remember
                📅
              </b>

              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {upcomingFollowUps
                  .slice(0, 6)
                  .map(
                    (item) => (
                      <div
                        key={
                          item.id
                        }
                        className="rounded-xl bg-slate-950 p-3"
                      >
                        <b>
                          {
                            item.company
                          }
                        </b>

                        <p className="text-xs text-slate-400">
                          {
                            item.role
                          }
                        </p>

                        <p className="text-xs text-yellow-400">
                          Follow up:{" "}
                          {
                            item.followUp
                          }
                        </p>
                      </div>
                    )
                  )}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-3">
            {filteredApplications.length ===
            0 ? (
              <div className="rounded-3xl border border-dashed border-slate-700 p-12 text-center">
                <div className="text-4xl">
                  📭
                </div>

                <b className="mt-3 block">
                  No applications yet
                </b>

                <p className="mt-1 text-sm text-slate-500">
                  Add your first
                  application above.
                </p>
              </div>
            ) : (
              filteredApplications.map(
                (item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                      <div>
                        <h3 className="text-xl font-bold">
                          {item.role}
                        </h3>

                        <p className="text-cyan-400">
                          {
                            item.company
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Applied:{" "}
                          {item.date}
                        </p>

                        {item.followUp && (
                          <p className="mt-1 text-xs text-yellow-400">
                            Follow-up:{" "}
                            {
                              item.followUp
                            }
                          </p>
                        )}

                        {item.notes && (
                          <p className="mt-2 text-sm text-slate-400">
                            {
                              item.notes
                            }
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <select
                          value={
                            item.status
                          }
                          onChange={(
                            event
                          ) =>
                            updateApplicationStatus(
                              item.id,
                              event
                                .target
                                .value as Status
                            )
                          }
                          className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2"
                        >
                          {statuses.map(
                            (status) => (
                              <option
                                key={
                                  status
                                }
                                value={
                                  status
                                }
                              >
                                {status}
                              </option>
                            )
                          )}
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            deleteApplication(
                              item.id
                            )
                          }
                          className="rounded-xl border border-red-400/30 px-3 py-2 text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </section>

      {/* FINAL READINESS */}

      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/5 p-8 text-center">
          <p className="font-bold text-cyan-400">
            CAREER READINESS
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {readiness ===
            100
              ? "You are job ready! 🎉"
              : readiness >=
                80
              ? "You are almost job ready! 🚀"
              : "Keep building your career 🚀"}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            {
              readinessStatus[1]
            }
          </p>

          <div className="mx-auto mt-7 max-w-xl">
            <div className="flex justify-between text-sm">
              <span>
                Overall Readiness
              </span>

              <b className="text-cyan-400">
                {readiness}%
              </b>
            </div>

            <div className="mt-2">
              <ProgressBar
                value={
                  readiness
                }
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-xs text-slate-500">
                Skills
              </p>

              <p className="mt-1 text-2xl font-bold text-cyan-400">
                {skillProgress}%
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-xs text-slate-500">
                Projects
              </p>

              <p className="mt-1 text-2xl font-bold text-cyan-400">
                {projectProgress}%
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-xs text-slate-500">
                Mock Interview
              </p>

              <p className="mt-1 text-2xl font-bold text-cyan-400">
                {mockScore}/100
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() =>
                goTo(
                  nextAction.section
                )
              }
              className="rounded-xl bg-cyan-400 px-7 py-3 font-bold text-slate-950"
            >
              Continue →
            </button>

            <button
              type="button"
              onClick={
                exportProgress
              }
              className="rounded-xl border border-cyan-400 px-7 py-3 font-bold text-cyan-400"
            >
              Export Progress
            </button>

            <button
              type="button"
              onClick={() =>
                goTo("dashboard")
              }
              className="rounded-xl border border-slate-700 px-7 py-3 font-bold"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* DATA MANAGEMENT */}

      <section className="mx-auto max-w-7xl px-5 pb-8">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:flex-row md:items-center">
          <div>
            <b>
              Manage your CareerGraph
              data
            </b>

            <p className="mt-1 text-sm text-slate-500">
              Progress is stored locally
              in this browser.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={
                exportProgress
              }
              className="rounded-xl border border-cyan-400 px-4 py-2 text-cyan-400"
            >
              Export JSON
            </button>

            <button
              type="button"
              onClick={
                resetCareerProgress
              }
              className="rounded-xl border border-red-400/30 px-4 py-2 text-red-300"
            >
              Reset Current Career
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-800 px-5 py-8 text-center text-sm text-slate-500">
        © 2026 CareerGraph · Build your
        path. Shape your future.
      </footer>
    </main>
  );
}