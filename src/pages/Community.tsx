
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Share2 } from "lucide-react";

const CommunityPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="py-16 bg-gradient-to-b from-white to-plantguard-green-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
                Plant Enthusiast Community
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with fellow plant lovers, share knowledge, and grow together
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-plantguard-blue-light rounded-full flex items-center justify-center mb-4">
                      <MessageSquare className="h-6 w-6 text-plantguard-blue" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Discussion Forums</h3>
                    <p className="text-muted-foreground">
                      Join specialized forums for different plant species, growing techniques, and troubleshooting
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-plantguard-blue-light rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-plantguard-blue" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Local Groups</h3>
                    <p className="text-muted-foreground">
                      Find plant enthusiasts in your area and join local gardening events and meetups
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-plantguard-blue-light rounded-full flex items-center justify-center mb-4">
                      <Share2 className="h-6 w-6 text-plantguard-blue" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Plant Swaps</h3>
                    <p className="text-muted-foreground">
                      Exchange plants, cuttings, and seeds with other enthusiasts to expand your collection
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-center">Featured Community Members</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((member) => (
                  <div key={member} className="bg-white p-4 rounded-lg border">
                    <div className="w-16 h-16 bg-plantguard-green-light/30 rounded-full mx-auto mb-4"></div>
                    <h3 className="font-medium text-center">Plant Expert {member}</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1">Plant Specialist</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <Button size="lg" className="font-medium">
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;
