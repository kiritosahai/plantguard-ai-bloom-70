
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-16 bg-plantguard-green relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="lg:w-2/3 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to transform your plant care experience?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {[
                "AI-powered disease detection",
                "Personalized care recommendations",
                "Environmental monitoring",
                "Community support & expertise",
                "Growing plant database",
                "Smart care reminders"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-white" />
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 lg:pl-12">
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-2">Get Started Today</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of plant lovers who have transformed their gardening experience.
              </p>
              <div className="space-y-4">
                <Button className="w-full" size="lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="w-full" size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Pricing Plans
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-plantguard-green-dark/30 transform skew-x-12"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-plantguard-green-dark/20 rounded-full blur-2xl"></div>
    </section>
  );
};

export default CtaSection;
