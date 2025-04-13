
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Share2, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommunitySupport = () => {
  return (
    <ResourceLayout 
      title="Community & Support"
      description="Connect with plant enthusiasts and experts around the world"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 mr-2 text-plantguard-green" />
              <h2 className="text-xl font-semibold">Join Our Community</h2>
            </div>
            <p className="mb-6">
              Connect with thousands of plant enthusiasts and experts. Share your experiences,
              ask questions, and learn from others in our thriving community.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="px-3 py-1 bg-plantguard-green/10 rounded-full text-sm">
                #HousePlants
              </div>
              <div className="px-3 py-1 bg-plantguard-green/10 rounded-full text-sm">
                #UrbanJungle
              </div>
              <div className="px-3 py-1 bg-plantguard-green/10 rounded-full text-sm">
                #PlantCare
              </div>
              <div className="px-3 py-1 bg-plantguard-green/10 rounded-full text-sm">
                #RarePlants
              </div>
              <div className="px-3 py-1 bg-plantguard-green/10 rounded-full text-sm">
                #PropagationTips
              </div>
            </div>
            
            <Link to="/community">
              <Button className="w-full">
                Explore Community
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <div className="aspect-video relative">
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
              alt="Plant community" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Expert Support</h2>
            <p className="mb-4">
              Get personalized help from our team of plant experts. Whether you're dealing with pests,
              diseases, or just need some care advice, we're here to help.
            </p>
            <div className="flex justify-between mt-4">
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Live Chat
              </Button>
              <Button>
                Contact Experts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Community Highlights</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 20}`} />
                  <AvatarFallback>PL</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Plant Lover {i}</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <p className="mb-4">
                {i === 1 && "My Monstera has grown so much after following the care tips from PlantGuard!"}
                {i === 2 && "The disease detection feature saved my orchids from spider mites. Thank you!"}
                {i === 3 && "Love connecting with fellow plant enthusiasts. This community is amazing!"}
              </p>
              <div className="flex justify-between text-muted-foreground text-sm">
                <button className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>24</span>
                </button>
                <button className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>12</span>
                </button>
                <button className="flex items-center">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-plantguard-green" />
            Plant Expert Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Share your knowledge and help others in our community by becoming a verified Plant Expert.
            Unlock exclusive features and build your reputation in the PlantGuard community.
          </p>
          <Button variant="outline">
            Learn More About Expert Program
          </Button>
        </CardContent>
      </Card>
    </ResourceLayout>
  );
};

export default CommunitySupport;
