
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  BookOpen, 
  Lightbulb, 
  Bug, 
  Sprout, 
  Sparkles,
  ThumbsUp
} from "lucide-react";

const KnowledgeBase = () => {
  // Sample popular articles
  const popularArticles = [
    {
      id: 1,
      title: "Diagnosing Yellow Leaves on Houseplants",
      category: "Plant Health",
      views: 1245,
      icon: <Bug className="h-5 w-5 text-red-500" />
    },
    {
      id: 2,
      title: "How to Propagate Plants in Water",
      category: "Propagation",
      views: 982,
      icon: <Sprout className="h-5 w-5 text-plantguard-green" />
    },
    {
      id: 3,
      title: "Understanding Plant Light Requirements",
      category: "Basic Care",
      views: 876,
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />
    },
    {
      id: 4,
      title: "Natural Fertilizers for Houseplants",
      category: "Plant Care",
      views: 654,
      icon: <Sparkles className="h-5 w-5 text-plantguard-green" />
    }
  ];

  // Sample categories
  const categories = [
    "Plant Health", "Propagation", "Basic Care", "Pest Control", 
    "Plant Identification", "Environmental Factors", "Advanced Care",
    "Container Gardening", "Seasonal Care", "Plant Science"
  ];

  return (
    <ResourceLayout 
      title="Knowledge Base"
      description="Find answers to all your plant care questions and learn from our extensive resources"
    >
      {/* Search Section */}
      <div className="bg-muted/30 p-8 rounded-lg mb-10">
        <h2 className="text-xl font-semibold mb-6 text-center">What plant question can we help with today?</h2>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Search our knowledge base..." 
            className="pl-10 py-6 text-lg"
          />
          <Button className="absolute right-1 top-1 bottom-1">
            Search
          </Button>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Popular searches:</span>
          <Button variant="link" size="sm" className="h-auto p-0">yellow leaves</Button>
          <span className="text-muted-foreground">&bull;</span>
          <Button variant="link" size="sm" className="h-auto p-0">overwatering</Button>
          <span className="text-muted-foreground">&bull;</span>
          <Button variant="link" size="sm" className="h-auto p-0">spider mites</Button>
          <span className="text-muted-foreground">&bull;</span>
          <Button variant="link" size="sm" className="h-auto p-0">propagation</Button>
        </div>
      </div>
      
      {/* Popular Articles */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Articles</h2>
          <Button variant="link">View All Articles</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <div className="mr-4">
                  {article.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold mb-1">{article.title}</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{article.category}</span>
                    <span className="flex items-center text-muted-foreground">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {article.views}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="justify-start h-auto py-3"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Quick Help Section */}
      <Card>
        <div className="grid md:grid-cols-2">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quick Help Guides</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <Bug className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium">Pest Identification</h3>
                  <p className="text-sm text-muted-foreground">Identify and treat common plant pests</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium">Light Troubleshooting</h3>
                  <p className="text-sm text-muted-foreground">Fix light-related plant issues</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Droplet className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Watering Problems</h3>
                  <p className="text-sm text-muted-foreground">Solutions for over or under-watering</p>
                </div>
              </div>
            </div>
            <Button>View All Quick Guides</Button>
          </CardContent>
          
          <CardContent className="bg-muted/20 p-6">
            <h2 className="text-2xl font-bold mb-4">Can't Find Your Answer?</h2>
            <p className="mb-6">
              Our plant experts are ready to help with any questions not covered in our knowledge base.
            </p>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full">
                Join Community Discussion
              </Button>
              <Button className="w-full">
                Ask an Expert
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </ResourceLayout>
  );
};

export default KnowledgeBase;
