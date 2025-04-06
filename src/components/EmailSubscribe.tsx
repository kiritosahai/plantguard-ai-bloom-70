
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const EmailSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "You've been added to our newsletter.",
      });
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-plantguard-green-light/10 p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-2 flex items-center">
        <Mail className="w-5 h-5 mr-2" />
        Subscribe to our Newsletter
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Get plant care tips, disease alerts, and seasonal advice delivered to your inbox.
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit" disabled={loading} className="whitespace-nowrap">
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default EmailSubscribe;
