
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Leaf, ImagePlus, Seedling, Activity, FileStack, Users, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: "Home",
      icon: Leaf,
      path: "/",
    },
    {
      title: "Plant Identification",
      icon: Seedling,
      path: "/plant-identification",
    },
    {
      title: "Disease Diagnosis",
      icon: Activity,
      path: "/disease-diagnosis",
    },
    {
      title: "Plant Analyzer",
      icon: ImagePlus,
      path: "/plant-analyzer",
    },
    {
      title: "Monitoring",
      icon: Droplet,
      path: "/monitoring",
    },
    {
      title: "Encyclopedia",
      icon: FileStack,
      path: "/plant-encyclopedia",
    },
    {
      title: "Community",
      icon: Users,
      path: "/community",
    },
  ];

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <Leaf className="h-6 w-6 text-plantguard-green" />
          <span className="text-xl font-serif font-semibold">PlantGuard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path} className={cn(
                      "flex items-center",
                      isActive(item.path) && "text-plantguard-green"
                    )}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2 py-4">
        <div className="text-xs text-muted-foreground">
          <p>© 2025 PlantGuard AI</p>
          <p>Version 1.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
