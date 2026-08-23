export type Member = {
  name: string;
  role: string;
  subRole?: string;
  category?: string;
  image?: string;
  aiHint?: string;
};

export type Chapter = {
  name: string;
  image: string;
};

export type TeamCategory = {
  categoryName: string;
  members: Member[];
};

export const CHAPTERS_DATA: Chapter[] = [
  {
    name: "Frisco High School Chapter",
    image: "/nn1.png",
  },
  {
    name: "Lone Star Chapter",
    image: "/nn2.png",
  },
  {
    name: "Blair High School Chapter",
    image: "/nn3.png",
  },
];

export const FOUNDER_DATA: Member = {
  name: "Simran Karir",
  role: "Founder & Executive Director",
  subRole: "Founder",
  image: "/simran.png",
  aiHint: "Simran Karir portrait",
};

export const TEAM_GROUPS: TeamCategory[] = [
  {
    categoryName: "Secretaries",
    members: [
      {
        name: "Maya Lin",
        role: "Head Secretary",
        category: "Secretaries",
      },
      {
        name: "Nathan Chen",
        role: "Associate Secretary",
        category: "Secretaries",
      },
      {
        name: "Elena Rossi",
        role: "Records & Governance Officer",
        category: "Secretaries",
      },
    ],
  },
  {
    categoryName: "Chapter Managers",
    members: [
      {
        name: "Chloe Davis",
        role: "Lead Chapter Director",
        category: "Chapter Managers",
      },
      {
        name: "Lucas Gomez",
        role: "Regional Chapter Coordinator",
        category: "Chapter Managers",
      },
      {
        name: "Aiden Taylor",
        role: "Chapter Onboarding Specialist",
        category: "Chapter Managers",
      },
      {
        name: "Samantha Wu",
        role: "Global Chapter Liaison",
        category: "Chapter Managers",
      },
    ],
  },
  {
    categoryName: "Public Outreach",
    members: [
      {
        name: "Sophia Ramirez",
        role: "Director of Public Outreach",
        category: "Public Outreach",
      },
      {
        name: "Daniel Brooks",
        role: "Community Engagement Lead",
        category: "Public Outreach",
      },
      {
        name: "Rachel Evans",
        role: "Youth Outreach Coordinator",
        category: "Public Outreach",
      },
    ],
  },
  {
    categoryName: "Research and Symposium Coordinators",
    members: [
      {
        name: "Alex Rivera",
        role: "Head Research Coordinator",
        category: "Research and Symposium Coordinators",
      },
      {
        name: "Ethan Zhang",
        role: "Symposium Logistics Lead",
        category: "Research and Symposium Coordinators",
      },
      {
        name: "Priya Sharma",
        role: "Academic Curriculum Specialist",
        category: "Research and Symposium Coordinators",
      },
      {
        name: "Marcus Vance",
        role: "Journal & Peer-Review Lead",
        category: "Research and Symposium Coordinators",
      },
    ],
  },
  {
    categoryName: "Communications Team",
    members: [
      {
        name: "Olivia Zhang",
        role: "Director of Communications",
        category: "Communications",
      },
      {
        name: "Harrison Cole",
        role: "Press & Publications Lead",
        category: "Communications",
      },
      {
        name: "Hannah Moore",
        role: "Newsletter & Content Editor",
        category: "Communications",
      },
    ],
  },
  {
    categoryName: "Social Media Team",
    members: [
      {
        name: "Liam Nguyen",
        role: "Head of Social Strategy",
        category: "Social Media Team",
      },
      {
        name: "Ananya Sharma",
        role: "Creative Content Director",
        category: "Social Media Team",
      },
      {
        name: "Jessica Wu",
        role: "Digital Media Manager",
        category: "Social Media Team",
      },
      {
        name: "Noah Kim",
        role: "Graphic & Video Producer",
        category: "Social Media Team",
      },
    ],
  },
];

export type TeamData = {
  [year: string]: {
    management: Member[];
    chapters: Chapter[];
  };
};

export const TEAM_DATA: TeamData = {
  "2026-2027": {
    management: [
      FOUNDER_DATA,
      ...TEAM_GROUPS.flatMap((g) => g.members),
    ],
    chapters: CHAPTERS_DATA,
  },
};
