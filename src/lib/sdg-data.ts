
import images from '@/app/lib/placeholder-images.json';

export type SdgGoal = {
  id: number;
  name: string;
  color: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  aiHint: string;
  unLink: string;
};

export const SDG_GOALS: SdgGoal[] = [
  {
    id: 1,
    name: "No Poverty",
    color: "#E5243B",
    description: "End poverty in all its forms everywhere.",
    longDescription: "Goal 1 is about ending poverty in all its manifestations, including extreme poverty, over the next 15 years.",
    imageUrl: images.sdgGoals["1"].url,
    aiHint: images.sdgGoals["1"].hint,
    unLink: 'https://sdgs.un.org/goals/goal1'
  },
  {
    id: 2,
    name: "Zero Hunger",
    color: "#DDA63A",
    description: "End hunger, achieve food security and improved nutrition.",
    longDescription: "Goal 2 aims to end hunger and all forms of malnutrition by 2030.",
    imageUrl: images.sdgGoals["2"].url,
    aiHint: images.sdgGoals["2"].hint,
    unLink: 'https://sdgs.un.org/goals/goal2'
  },
  {
    id: 3,
    name: "Good Health and Well-being",
    color: "#4C9F38",
    description: "Ensure healthy lives and promote well-being for all.",
    longDescription: "Goal 3 seeks to ensure health and well-being for all, at every stage of life.",
    imageUrl: images.sdgGoals["3"].url,
    aiHint: images.sdgGoals["3"].hint,
    unLink: 'https://sdgs.un.org/goals/goal3'
  },
  {
    id: 4,
    name: "Quality Education",
    color: "#C5192D",
    description: "Ensure inclusive and equitable quality education.",
    longDescription: "Goal 4 is about ensuring inclusive and equitable quality education and promoting lifelong learning.",
    imageUrl: images.sdgGoals["4"].url,
    aiHint: images.sdgGoals["4"].hint,
    unLink: 'https://sdgs.un.org/goals/goal4'
  },
  {
    id: 5,
    name: "Gender Equality",
    color: "#FF3A21",
    description: "Achieve gender equality and empower all women and girls.",
    longDescription: "Goal 5 aims to achieve gender equality and empower all women and girls.",
    imageUrl: images.sdgGoals["5"].url,
    aiHint: images.sdgGoals["5"].hint,
    unLink: 'https://sdgs.un.org/goals/goal5'
  },
  {
    id: 6,
    name: "Clean Water and Sanitation",
    color: "#26BDE2",
    description: "Ensure availability and sustainable management of water.",
    longDescription: "Goal 6 is about ensuring access to safe and affordable drinking water for all.",
    imageUrl: images.sdgGoals["6"].url,
    aiHint: images.sdgGoals["6"].hint,
    unLink: 'https://sdgs.un.org/goals/goal6'
  },
  {
    id: 7,
    name: "Affordable and Clean Energy",
    color: "#FCC30B",
    description: "Ensure access to affordable, reliable energy for all.",
    longDescription: "Goal 7 aims to ensure access to affordable, reliable, and modern energy.",
    imageUrl: images.sdgGoals["7"].url,
    aiHint: images.sdgGoals["7"].hint,
    unLink: 'https://sdgs.un.org/goals/goal7'
  },
  {
    id: 8,
    name: "Decent Work and Economic Growth",
    color: "#A21942",
    description: "Promote sustained and sustainable economic growth.",
    longDescription: "Goal 8 is about promoting inclusive and sustainable economic growth and decent work.",
    imageUrl: images.sdgGoals["8"].url,
    aiHint: images.sdgGoals["8"].hint,
    unLink: 'https://sdgs.un.org/goals/goal8'
  },
  {
    id: 9,
    name: "Industry, Innovation and Infrastructure",
    color: "#FD6925",
    description: "Build resilient infrastructure and foster innovation.",
    longDescription: "Goal 9 focuses on building resilient infrastructure and promoting innovation.",
    imageUrl: images.sdgGoals["9"].url,
    aiHint: images.sdgGoals["9"].hint,
    unLink: 'https://sdgs.un.org/goals/goal9'
  },
  {
    id: 10,
    name: "Reduced Inequality",
    color: "#DD1367",
    description: "Reduce inequality within and among countries.",
    longDescription: "Goal 10 calls for reducing inequalities in income and status.",
    imageUrl: images.sdgGoals["10"].url,
    aiHint: images.sdgGoals["10"].hint,
    unLink: 'https://sdgs.un.org/goals/goal10'
  },
  {
    id: 11,
    name: "Sustainable Cities and Communities",
    color: "#FD9D24",
    description: "Make cities and settlements inclusive and safe.",
    longDescription: "Goal 11 aims to make cities inclusive, safe, resilient and sustainable.",
    imageUrl: images.sdgGoals["11"].url,
    aiHint: images.sdgGoals["11"].hint,
    unLink: 'https://sdgs.un.org/goals/goal11'
  },
  {
    id: 12,
    name: "Responsible Consumption and Production",
    color: "#BF8B2E",
    description: "Ensure sustainable consumption and production.",
    longDescription: "Goal 12 is about ensuring sustainable consumption and production patterns.",
    imageUrl: images.sdgGoals["12"].url,
    aiHint: images.sdgGoals["12"].hint,
    unLink: 'https://sdgs.un.org/goals/goal12'
  },
  {
    id: 13,
    name: "Climate Action",
    color: "#3F7E44",
    description: "Take urgent action to combat climate change.",
    longDescription: "Goal 13 is a call for urgent action to combat climate change and its impacts.",
    imageUrl: images.sdgGoals["13"].url,
    aiHint: images.sdgGoals["13"].hint,
    unLink: 'https://sdgs.un.org/goals/goal13'
  },
  {
    id: 14,
    name: "Life Below Water",
    color: "#0A97D9",
    description: "Conserve and sustainably use the oceans.",
    longDescription: "Goal 14 aims to conserve and sustainably use the world’s oceans.",
    imageUrl: images.sdgGoals["14"].url,
    aiHint: images.sdgGoals["14"].hint,
    unLink: 'https://sdgs.un.org/goals/goal14'
  },
  {
    id: 15,
    name: "Life on Land",
    color: "#56C02B",
    description: "Protect and restore terrestrial ecosystems.",
    longDescription: "Goal 15 is about protecting, restoring and promoting sustainable use of land.",
    imageUrl: images.sdgGoals["15"].url,
    aiHint: images.sdgGoals["15"].hint,
    unLink: 'https://sdgs.un.org/goals/goal15'
  },
  {
    id: 16,
    name: "Peace, Justice, and Strong Institutions",
    color: "#00689D",
    description: "Promote peaceful and inclusive societies.",
    longDescription: "Goal 16 is dedicated to the promotion of peaceful and inclusive societies.",
    imageUrl: images.sdgGoals["16"].url,
    aiHint: images.sdgGoals["16"].hint,
    unLink: 'https://sdgs.un.org/goals/goal16'
  },
  {
    id: 17,
    name: "Partnerships for the Goals",
    color: "#19486A",
    description: "Revitalize the global partnership for sustainable development.",
    longDescription: "Goal 17 aims to revitalize the global partnership for sustainable development.",
    imageUrl: images.sdgGoals["17"].url,
    aiHint: images.sdgGoals["17"].hint,
    unLink: 'https://sdgs.un.org/goals/goal17'
  }
];
