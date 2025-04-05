
import React from "react";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-5">
              <Leaf className="h-6 w-6 text-plantguard-green" />
              <span className="text-xl font-serif font-semibold">PlantGuard</span>
            </div>
            <p className="text-muted-foreground mb-6">
              AI-powered plant health and care assistant, helping you grow thriving plants with minimal effort.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-plantguard-green" />
                <span>123 Botanic Avenue, Green City</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-plantguard-green" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-plantguard-green" />
                <span>hello@plantguard.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-5">Features</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#features" className="hover:text-plantguard-green transition-colors">AI Identification</a></li>
              <li><a href="#diagnosis" className="hover:text-plantguard-green transition-colors">Disease Detection</a></li>
              <li><a href="#monitoring" className="hover:text-plantguard-green transition-colors">Environmental Monitoring</a></li>
              <li><a href="#community" className="hover:text-plantguard-green transition-colors">Community & Support</a></li>
              <li><a href="#" className="hover:text-plantguard-green transition-colors">Care Reminders</a></li>
              <li><a href="#" className="hover:text-plantguard-green transition-colors">Plant Library</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-5">Resources</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-plantguard-green transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-plantguard-green transition-colors">Plant Care Guides</a></li>
              <li><a href="#" className="hover:text-plantguard-green transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-plantguard-green transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-plantguard-green transition-colors">Support Center</a></li>
              <li><a href="#" className="hover:text-plantguard-green transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-5">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with the latest plant care tips and PlantGuard features.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PlantGuard. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-plantguard-green transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-plantguard-green transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-plantguard-green transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
