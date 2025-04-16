
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <div className="flex items-center p-2 bg-background border-b">
          <SidebarTrigger className="mr-2" />
          <NavBar />
        </div>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </SidebarInset>
    </div>
  );
};

export default MobileLayout;
