import * as Yup from "yup";
export interface SidebarLink {
  name: string;
  path?: string;
  icon: string;
  children?: {
    name: string;
    path: string;
  }[];
}
export const defaultLinks: SidebarLink[] = [
  {
    name: "BI",
    path: "/businessIntelligence",
    icon: "ic:round-dashboard-customize",
  },
  {
    name: "Query List",
    icon: "mdi:sql-query",
    path: "/queryList",
  },

  {
    name: "Leads",
    icon: "ic:round-leaderboard",
    path: "/leads",
  },

  {
    name: "Tasks",
    path: "/tasks",
    icon: "ic:baseline-task",
  },
  {
    name: "Todo’s",
    path: "/todos",
    icon: "ic:baseline-today",
  },
  {
    name: "Contacts",
    path: "/contacts",
    icon: "ph:scroll-fill",
  },
];
export const defaultLinks22: any = [
  {
    name: "Define",
    path: "/define",
    icon: "ic:round-dashboard-customize",
  },
];
export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
