
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Leaf className="w-6 h-6 text-plantguard-green" />
          <span className="text-xl font-serif font-semibold">PlantGuard</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            className="text-foreground hover:text-plantguard-green transition-colors"
            onClick={() => scrollToSection('features')}
          >
            Features
          </button>
          <button 
            className="text-foreground hover:text-plantguard-green transition-colors"
            onClick={() => scrollToSection('diagnosis')}
          >
            Diagnosis
          </button>
          <button 
            className="text-foreground hover:text-plantguard-green transition-colors"
            onClick={() => scrollToSection('monitoring')}
          >
            Monitoring
          </button>
          <button 
            className="text-foreground hover:text-plantguard-green transition-colors"
            onClick={() => scrollToSection('community')}
          >
            Community
          </button>
          <Button onClick={() => scrollToSection('diagnosis')}>Get Started</Button>
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
          <button 
            className="text-foreground hover:text-plantguard-green py-2" 
            onClick={() => scrollToSection('features')}
          >
            Features
          </button>
          <button 
            className="text-foreground hover:text-plantguard-green py-2" 
            onClick={() => scrollToSection('diagnosis')}
          >
            Diagnosis
          </button>
          <button 
            className="text-foreground hover:text-plantguard-green py-2" 
            onClick={() => scrollToSection('monitoring')}
          >
            Monitoring
          </button>
          <button 
            className="text-foreground hover:text-plantguard-green py-2" 
            onClick={() => scrollToSection('community')}
          >
            Community
          </button>
          <Button className="mt-2" onClick={() => scrollToSection('diagnosis')}>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
