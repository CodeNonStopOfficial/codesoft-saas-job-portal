import {
  Tags,
  MapPin,
  ShieldCheck,
  Flag,
  ChartNoAxesCombined,
  AudioWaveform,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  LayoutDashboard,
  Building2,
  PlusCircle,
  BriefcaseBusiness,
  Users,
  FileText,
  Bookmark,
  BarChart3,
  CreditCard,
  Settings,
  MessageSquare,
  CalendarDays,
  Search,
  UserRound,
  Bell,
  FileUser,
} from "lucide-react";

export const employerNavItems = [
  {
    title: "Dashboard",
    url: "/employer/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Company Profile",
    url: "/employer/profile",
    icon: Building2,
  },
  {
    title: "Post a Job",
    url: "/employer/post-jobs",
    icon: PlusCircle,
  },
  {
    title: "Manage Jobs",
    url: "/employer/manage-jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applicants",
    url: "/employer/applicants",
    icon: Users,
  },
  {
    title: "Applications",
    url: "/employer/applications",
    icon: FileText,
  },
  {
    title: "Saved Candidates",
    url: "/employer/saved-candidates",
    icon: Bookmark,
  },
  {
    title: "Interviews",
    url: "/employer/interviews",
    icon: CalendarDays,
  },
  {
    title: "Messages",
    url: "/employer/messages",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    url: "/employer/analytics",
    icon: BarChart3,
  },
  {
    title: "Subscription & Billing",
    url: "/employer/subscription",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/employer/settings",
    icon: Settings,
  },
];

export const adminNavItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Companies",
    url: "/admin/companies",
    icon: Building2,
  },
  {
    title: "Manage Jobs",
    url: "/admin/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    url: "/admin/applications",
    icon: FileText,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Tags,
  },
  {
    title: "Locations",
    url: "/admin/locations",
    icon: MapPin,
  },
  {
    title: "Job Approvals",
    url: "/admin/job-approvals",
    icon: ShieldCheck,
  },
  {
    title: "Reports & Complaints",
    url: "/admin/reports",
    icon: Flag,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export const dataProfileNav = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "CarrerHub Tech",
      logo: GalleryVerticalEnd,
      plan: "Admin",
    },
    {
      name: "CarrerHub Tech.",
      logo: AudioWaveform,
      plan: "JobSeeker",
    },
  ],
};


export const candidateNavItems = [
  {
    title: "Dashboard",
    url: "/candidate/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Find Jobs",
    url: "/jobs",
    icon: Search,
  },
  {
    title: "My Profile",
    url: "/candidate/profile",
    icon: UserRound,
  },
  {
    title: "My Applications",
    url: "/candidate/applications",
    icon: FileText,
  },
  {
    title: "Saved Jobs",
    url: "/candidate/saved-jobs",
    icon: Bookmark,
  },
  {
    title: "Job Alerts",
    url: "/candidate/job-alerts",
    icon: Bell,
  },
  {
    title: "My Resume",
    url: "/candidate/resume",
    icon: FileUser,
  },
  {
    title: "Messages",
    url: "/candidate/messages",
    icon: MessageSquare,
  },
  {
    title: "Interviews",
    url: "/candidate/interviews",
    icon: CalendarDays,
  },
  {
    title: "Settings",
    url: "/candidate/settings",
    icon: Settings,
  },
];
