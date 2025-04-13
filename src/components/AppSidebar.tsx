
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
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Leaf, ImagePlus, Sprout, Activity, FileStack, Users, Droplet, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  
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
      icon: Sprout,
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
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-plantguard-green" />
            <span className={cn(
              "text-xl font-serif font-semibold transition-opacity duration-200",
              state === "collapsed" && "opacity-0"
            )}>PlantGuard</span>
          </div>
          <SidebarTrigger className="ml-auto">
            <ChevronLeft className={cn(
              "h-5 w-5 transition-transform duration-300",
              state === "collapsed" && "rotate-180"
            )} />
          </SidebarTrigger>
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
        <div className={cn(
          "text-xs text-muted-foreground transition-opacity duration-200",
          state === "collapsed" && "opacity-0"
        )}>
          <p>© 2025 PlantGuard AI</p>
          <p>Version 1.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
