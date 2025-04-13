
import React, { useState } from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send,
  CheckCircle
} from "lucide-react";

const ContactUs = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible. Thank you!",
      });
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <ResourceLayout 
      title="Contact Us"
      description="Get in touch with our team for any inquiries, feedback, or support"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Enter your name" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Enter your email" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="What is your message about?" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-muted p-3 rounded-full">
                      <Mail className="h-5 w-5 text-plantguard-green" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@plantguard.com</p>
                    <p className="text-muted-foreground">sahai.kushagra4@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-muted p-3 rounded-full">
                      <Phone className="h-5 w-5 text-plantguard-green" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">812-721-2469</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-muted p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-plantguard-green" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">123 Botanic Avenue</p>
                    <p className="text-muted-foreground">Green City, GP 12345</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-muted p-3 rounded-full">
                      <MessageSquare className="h-5 w-5 text-plantguard-green" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Live Chat</h3>
                    <p className="text-muted-foreground">Monday - Friday: 8am - 8pm EST</p>
                    <p className="text-muted-foreground">Weekends: 9am - 5pm EST</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <p className="text-muted-foreground mb-4">
                Stay connected with us on social media for the latest updates, plant care tips, and community features.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Our Location</h2>
          <div className="aspect-[16/9] bg-muted rounded-md overflow-hidden mb-6">
            {/* This would be a map in a real application */}
            <div className="w-full h-full flex items-center justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Map would be displayed here</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">PlantGuard Headquarters</h3>
              <p className="text-muted-foreground">123 Botanic Avenue</p>
              <p className="text-muted-foreground">Green City, GP 12345</p>
              <p className="text-muted-foreground">United States</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Office Hours</h3>
              <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
              <p className="text-muted-foreground">Saturday: 10am - 4pm</p>
              <p className="text-muted-foreground">Sunday: Closed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ResourceLayout>
  );
};

export default ContactUs;
