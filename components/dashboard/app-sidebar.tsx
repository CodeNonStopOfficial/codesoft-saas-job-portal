"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  adminNavItems,
  candidateNavItems,
  dataProfileNav,
  employerNavItems,
} from "@/lib/nav-items";
import { UserRole } from "@/lib/generated/prisma/client";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    email: string;
    id: string;
    name: string | null;
    image : string | null;
    role: UserRole;
  } | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const navItems =
    user?.role === "ADMIN"
      ? adminNavItems
      : user?.role === "COMPANY"
        ? employerNavItems
        : user?.role === "JOB_SEEKER"
          ? candidateNavItems
          : [];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={dataProfileNav.teams} role={user?.role}  />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user}/>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
