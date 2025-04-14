
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  LifeBuoy, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileQuestion,
  Users,
  Clock
} from "lucide-react";

const SupportCenter = () => {
  return (
    <ResourceLayout 
      title="Support Center"
      description="Get help and support for all your PlantGuard needs"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <MessageSquare className="h-10 w-10 text-plantguard-green mb-4" />
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-muted-foreground mb-4">
              Chat with our support team for immediate assistance with your plant care questions.
            </p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Mail className="h-10 w-10 text-plantguard-green mb-4" />
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-muted-foreground mb-4">
              Send us an email and we'll get back to you within 24 hours with a solution.
            </p>
            <Button variant="outline" className="w-full">
              <a href="mailto:sahai.kushagra4@gmail.com">Email Us</a>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Phone className="h-10 w-10 text-plantguard-green mb-4" />
            <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
            <p className="text-muted-foreground mb-4">
              Call us directly for premium support and immediate plant care assistance.
            </p>
            <Button variant="outline" className="w-full">
              <a href="tel:8127212469">Call 812-721-2469</a>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-8 mb-10">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-plantguard-green" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Live Chat Support</h4>
                  <p className="text-muted-foreground">Monday - Friday: 8am - 8pm EST</p>
                  <p className="text-muted-foreground">Saturday - Sunday: 9am - 5pm EST</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Phone Support</h4>
                  <p className="text-muted-foreground">Monday - Friday: 9am - 6pm EST</p>
                  <p className="text-muted-foreground">Premium members: 24/7 Support</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Email Response Time</h4>
                  <p className="text-muted-foreground">Within 24 hours (business days)</p>
                  <p className="text-muted-foreground">Premium members: Within 4 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileQuestion className="h-5 w-5 mr-2 text-plantguard-green" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">How accurate is the plant identification?</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI plant identification is over 95% accurate for common houseplants and 90% accurate for rare species.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Can I use PlantGuard offline?</h4>
                  <p className="text-sm text-muted-foreground">
                    Premium subscribers can download plant data for offline use. The identification feature requires an internet connection.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">How do I sync my smart devices?</h4>
                  <p className="text-sm text-muted-foreground">
                    Go to Settings &gt; Connected Devices and follow the pairing instructions for your specific device.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Is my plant data secure?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, we use industry-standard encryption to protect all user data. Your plant information is private and never shared.
                  </p>
                </div>
                
                <Button variant="link" className="p-0">View All FAQs</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <LifeBuoy className="h-5 w-5 mr-2 text-plantguard-green" />
            Contact Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" placeholder="Your name" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input id="subject" placeholder="What is your inquiry about?" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea 
                id="message" 
                placeholder="Please describe your issue in detail" 
                rows={4}
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Submit Support Request</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <div className="grid md:grid-cols-2">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-6">
              Connect with other plant enthusiasts and get help from our community. Share your
              experiences, ask questions, and learn from others.
            </p>
            <div className="flex space-x-4">
              <Button className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Join Community
              </Button>
              <Button variant="outline">View Forums</Button>
            </div>
          </CardContent>
          
          <div className="bg-muted/20 p-6">
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-plantguard-green mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">hello@plantguard.com</p>
                  <p className="text-muted-foreground">sahai.kushagra4@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-plantguard-green mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-muted-foreground">812-721-2469</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 mr-3 text-plantguard-green mt-0.5" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-muted-foreground">Available during support hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ResourceLayout>
  );
};

export default SupportCenter;
