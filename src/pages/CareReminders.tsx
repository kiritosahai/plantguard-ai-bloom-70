
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Calendar, Repeat, MoreHorizontal, Droplet, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CareReminders = () => {
  // Sample reminders data
  const reminders = [
    {
      id: 1,
      plant: "Monstera Deliciosa",
      type: "Water",
      icon: <Droplet className="h-5 w-5 text-blue-500" />,
      due: "Today",
      image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3",
    },
    {
      id: 2,
      plant: "Peace Lily",
      type: "Fertilize",
      icon: <Sparkles className="h-5 w-5 text-green-500" />,
      due: "Tomorrow",
      image: "https://images.unsplash.com/photo-1620803366004-119b57f54cd6?ixlib=rb-4.0.3",
    },
    {
      id: 3,
      plant: "Snake Plant",
      type: "Rotate",
      icon: <Repeat className="h-5 w-5 text-amber-500" />,
      due: "In 2 days",
      image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?ixlib=rb-4.0.3",
    },
  ];

  return (
    <ResourceLayout 
      title="Care Reminders"
      description="Never forget to water, fertilize, or care for your plants again"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <BellRing className="h-5 w-5 mr-2 text-plantguard-green" />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={reminder.image} alt={reminder.plant} />
                      <AvatarFallback>PL</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        {reminder.icon}
                        <span className="ml-2 font-medium">{reminder.type} {reminder.plant}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Due: {reminder.due}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button className="w-full mt-2">
                  View All Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-plantguard-green" />
                Care Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                View your plant care schedule at a glance with our interactive calendar.
                Plan ahead and ensure all your plants get the attention they need.
              </p>
              <div className="bg-muted rounded-md p-4 mb-4 text-center">
                <p className="text-muted-foreground">Calendar view will be displayed here</p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  Monthly View
                </Button>
                <Button className="flex-1">
                  Weekly View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Set Up Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Create custom care reminders for all your plants based on their specific needs.
              </p>
              <Button className="w-full mb-4">
                Add New Reminder
              </Button>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <span>Watering</span>
                  <span className="text-muted-foreground">Every 3-7 days</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <span>Fertilizing</span>
                  <span className="text-muted-foreground">Monthly</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <span>Rotation</span>
                  <span className="text-muted-foreground">Weekly</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <span>Repotting</span>
                  <span className="text-muted-foreground">Annually</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Get Notifications</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Receive reminders via push notifications, email, or text messages.
                Never miss an important plant care task again.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <Button variant="ghost" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Reminders</span>
                  <Button variant="ghost" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS Reminders</span>
                  <Button variant="ghost" size="sm">Enable</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResourceLayout>
  );
};

export default CareReminders;
