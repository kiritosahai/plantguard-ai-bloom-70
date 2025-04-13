
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { SidebarInset } from "@/components/ui/sidebar";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <SidebarInset className="flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </SidebarInset>
  );
};

export default MobileLayout;
