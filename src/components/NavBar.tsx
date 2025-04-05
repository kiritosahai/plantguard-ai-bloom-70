
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="w-6 h-6 text-plantguard-green" />
          <span className="text-xl font-serif font-semibold">PlantGuard</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-foreground hover:text-plantguard-green transition-colors">Features</a>
          <a href="#diagnosis" className="text-foreground hover:text-plantguard-green transition-colors">Diagnosis</a>
          <a href="#monitoring" className="text-foreground hover:text-plantguard-green transition-colors">Monitoring</a>
          <a href="#community" className="text-foreground hover:text-plantguard-green transition-colors">Community</a>
          <Button>Get Started</Button>
        </nav>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 top-[61px] p-4 bg-background border-b transform transition-transform duration-300 ease-in-out z-50",
        mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="flex flex-col space-y-4 pt-2 pb-4">
          <a 
            href="#features" 
            className="text-foreground hover:text-plantguard-green py-2" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#diagnosis" 
            className="text-foreground hover:text-plantguard-green py-2" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Diagnosis
          </a>
          <a 
            href="#monitoring" 
            className="text-foreground hover:text-plantguard-green py-2" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Monitoring
          </a>
          <a 
            href="#community" 
            className="text-foreground hover:text-plantguard-green py-2" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Community
          </a>
          <Button className="mt-2">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
