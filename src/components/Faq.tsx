
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How accurate is the plant identification?",
    answer: "Our AI model has been trained on millions of plant images with over 95% accuracy for the 10,000+ most common plant species. For rare species, accuracy may vary, but our system continuously improves with each submission."
  },
  {
    question: "Can PlantGuard diagnose all plant diseases?",
    answer: "PlantGuard can identify most common plant diseases and nutritional deficiencies. Our database includes over 1,000 plant diseases with specific treatment recommendations. We're constantly adding new diseases to our detection capabilities."
  },
  {
    question: "Do I need special equipment to use PlantGuard?",
    answer: "Not at all! All you need is a smartphone with a camera to get started. For advanced features like environmental monitoring, you can optionally connect compatible smart sensors, but they're not required."
  },
  {
    question: "Is my data private and secure?",
    answer: "Yes, we take data privacy seriously. Your plant images and personal information are encrypted and never shared without your explicit consent. You can delete your data at any time from your account settings."
  },
  {
    question: "Can PlantGuard help with outdoor gardens and indoor plants?",
    answer: "Absolutely! PlantGuard works for both indoor houseplants and outdoor gardens. Our care recommendations are adjusted based on whether your plants are indoors or outdoors."
  },
  {
    question: "How do I connect environmental sensors to PlantGuard?",
    answer: "PlantGuard is compatible with most major smart garden sensors. In the app, navigate to Settings > Connected Devices, and follow the instructions to pair your specific sensor models."
  },
  {
    question: "Does PlantGuard work offline?",
    answer: "Basic features like viewing your saved plant profiles and care schedules work offline. However, plant identification, disease diagnosis, and community features require an internet connection."
  },
  {
    question: "Can I share access with family members or team members?",
    answer: "Yes! Premium users can share access with up to 5 family members. Business plan users can add unlimited team members with customizable permission levels."
  }
];

const Faq = () => {
  return (
    <section id="faq" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about PlantGuard
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">
            Still have questions? We're here to help!
          </p>
          <div className="inline-flex gap-4">
            <Button variant="outline" className="bg-white">
              Contact Support
            </Button>
            <Button>
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
