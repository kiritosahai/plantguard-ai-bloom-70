
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  // Sample blog posts
  const blogPosts = [
    {
      id: 1,
      title: "10 Low Maintenance Plants for Beginners",
      excerpt: "Discover the best plants for those just starting their plant parenthood journey.",
      image: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3",
      date: "April 10, 2025",
      category: "Beginner Tips",
      author: "Maria Chen",
    },
    {
      id: 2,
      title: "Diagnosing Common Houseplant Diseases",
      excerpt: "Learn to identify and treat the most common ailments that affect indoor plants.",
      image: "https://images.unsplash.com/photo-1526565782131-a13074f0b38a?ixlib=rb-4.0.3",
      date: "April 8, 2025",
      category: "Plant Health",
      author: "Dr. James Peterson",
    },
    {
      id: 3,
      title: "Creating the Perfect Indoor Jungle",
      excerpt: "Transform your space into a lush paradise with these arrangement tips.",
      image: "https://images.unsplash.com/photo-1558693168-c370615b54e0?ixlib=rb-4.0.3",
      date: "April 5, 2025",
      category: "Interior Design",
      author: "Sophie Williams",
    },
    {
      id: 4,
      title: "Seasonal Care Guide: Spring Edition",
      excerpt: "How to adjust your plant care routine as temperatures rise and days get longer.",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3",
      date: "April 1, 2025",
      category: "Seasonal Care",
      author: "Marcus Johnson",
    }
  ];

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <ResourceLayout 
      title="Blog"
      description="Expert advice, care tips, and inspiration for plant enthusiasts"
    >
      {/* Featured Post */}
      <Card className="mb-10">
        <div className="grid md:grid-cols-5 overflow-hidden">
          <div className="md:col-span-3">
            <div className="h-64 md:h-full relative">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-background/80 px-3 py-1 rounded-full text-xs font-medium">
                {featuredPost.category}
              </div>
            </div>
          </div>
          <CardContent className="p-6 md:col-span-2 flex flex-col justify-center">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{featuredPost.date}</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
            <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm">By {featuredPost.author}</span>
              <Button>Read More</Button>
            </div>
          </CardContent>
        </div>
      </Card>
      
      {/* Post Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button size="sm" variant="secondary">All Topics</Button>
        <Button size="sm" variant="outline">Plant Care</Button>
        <Button size="sm" variant="outline">Plant Health</Button>
        <Button size="sm" variant="outline">Beginner Tips</Button>
        <Button size="sm" variant="outline">Interior Design</Button>
        <Button size="sm" variant="outline">Seasonal Care</Button>
      </div>
      
      {/* Regular Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs font-medium">
                {post.category}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{post.date}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs">By {post.author}</span>
                <Button variant="link" className="p-0 h-auto">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button>Load More Articles</Button>
      </div>
    </ResourceLayout>
  );
};

export default Blog;
