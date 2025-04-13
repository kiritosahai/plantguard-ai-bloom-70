
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, User, BookOpen, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // If we're on the home page, scroll to the section
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      // Otherwise navigate to the home page with the section as hash
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-6 h-6 text-plantguard-green" />
            <span className="text-xl font-serif font-semibold">PlantGuard</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/plant-identification"
            className="text-foreground hover:text-plantguard-green transition-colors"
          >
            Identification
          </Link>
          <Link 
            to="/disease-diagnosis"
            className="text-foreground hover:text-plantguard-green transition-colors"
          >
            Diagnosis
          </Link>
          <Link 
            to="/monitoring"
            className="text-foreground hover:text-plantguard-green transition-colors"
          >
            Monitoring
          </Link>
          <Link 
            to="/plant-encyclopedia"
            className="text-foreground hover:text-plantguard-green transition-colors"
          >
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              Encyclopedia
            </div>
          </Link>
          <Link 
            to="/plant-analyzer"
            className="text-foreground hover:text-plantguard-green transition-colors"
          >
            <div className="flex items-center">
              <ImagePlus className="h-4 w-4 mr-1" />
              Analyzer
            </div>
          </Link>
          <Link 
            to="/community"
            className="text-foreground hover:text-plantguard-green transition-colors"
          >
            Community
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/sign-in">
            <Button variant="ghost" size="sm" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

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
          <Link 
            to="/plant-identification"
            className="text-foreground hover:text-plantguard-green py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Identification
          </Link>
          <Link 
            to="/disease-diagnosis"
            className="text-foreground hover:text-plantguard-green py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Diagnosis
          </Link>
          <Link 
            to="/monitoring"
            className="text-foreground hover:text-plantguard-green py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Monitoring
          </Link>
          <Link 
            to="/plant-encyclopedia"
            className="text-foreground hover:text-plantguard-green py-2 flex items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Encyclopedia
          </Link>
          <Link 
            to="/plant-analyzer"
            className="text-foreground hover:text-plantguard-green py-2 flex items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <ImagePlus className="h-4 w-4 mr-1" />
            Analyzer
          </Link>
          <Link 
            to="/community"
            className="text-foreground hover:text-plantguard-green py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Community
          </Link>
          <div className="border-t pt-4 mt-2 flex flex-col space-y-3">
            <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
