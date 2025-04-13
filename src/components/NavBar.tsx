
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

const NavBar = () => {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-6 h-6 text-plantguard-green" />
            <span className="text-xl font-serif font-semibold">PlantGuard</span>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/sign-in">
            <Button variant="ghost" size="sm" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button size="sm">
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
