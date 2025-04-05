
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Heart, MessageCircle, Users } from "lucide-react";

const Community = () => {
  return (
    <section id="community" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Plant-Loving Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with plant enthusiasts, share your experiences, and learn from experts around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <Card className="h-full overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold flex items-center mb-1">
                  <Users className="h-5 w-5 mr-2" /> Community Discussions
                </h3>
                <CardDescription>
                  Recently active conversations from our global plant community
                </CardDescription>
              </div>

              <CardContent className="p-0">
                {[
                  {
                    title: "How to save my drooping monstera?",
                    author: "Emily Chen",
                    avatar: "EC",
                    time: "2 hours ago",
                    replies: 8,
                    likes: 12
                  },
                  {
                    title: "Best organic fertilizer for vegetable gardens?",
                    author: "Marcus Johnson",
                    avatar: "MJ",
                    time: "5 hours ago",
                    replies: 14,
                    likes: 23
                  },
                  {
                    title: "Identified these white spots on my succulent leaves",
                    author: "Sophia Williams",
                    avatar: "SW",
                    time: "Yesterday",
                    replies: 6,
                    likes: 9
                  },
                  {
                    title: "My automatic watering system setup - DIY guide",
                    author: "David Miller",
                    avatar: "DM",
                    time: "2 days ago",
                    replies: 31,
                    likes: 47
                  }
                ].map((post, index) => (
                  <div key={index} className="p-4 border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>{post.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{post.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-3 pl-12 text-sm text-muted-foreground">
                      <div className="flex items-center mr-4">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>{post.replies}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-1">PlantGuard Community</h3>
                <CardDescription>Join thousands of plant enthusiasts</CardDescription>
              </div>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex -space-x-4 mb-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Avatar key={i} className="border-2 border-background w-10 h-10">
                        <AvatarFallback className="bg-plantguard-green-light text-plantguard-green-dark">
                          {String.fromCharCode(64 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-background bg-muted text-xs font-medium">
                      +2k
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join our thriving community of plant lovers from around the world
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Active discussions</span>
                    <span className="font-medium">1.2k</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Experts available</span>
                    <span className="font-medium">87</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Plant species covered</span>
                    <span className="font-medium">10k+</span>
                  </div>
                </div>

                <Button className="w-full">Join Community</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
