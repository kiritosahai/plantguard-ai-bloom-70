
import React from "react";
import { Helmet } from "react-helmet";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface ResourceLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const ResourceLayout: React.FC<ResourceLayoutProps> = ({ 
  children, 
  title, 
  description,
  className
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{title} | PlantGuard</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <NavBar />
      <main className={cn("flex-grow py-8 px-4 sm:px-6 lg:px-8", className)}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          {description && (
            <p className="text-lg text-muted-foreground mb-8">{description}</p>
          )}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResourceLayout;
