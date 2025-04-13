
import React from "react";
import ResourceLayout from "@/components/ResourceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const ApiDocumentation = () => {
  return (
    <ResourceLayout 
      title="API Documentation"
      description="Integrate PlantGuard's AI capabilities into your own applications"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardHeader className="pb-2">
              <CardTitle>API Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <Button variant="link" className="p-0 h-auto">Introduction</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">Authentication</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">Rate Limits</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto font-medium text-plantguard-green">Plant Identification</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">Disease Detection</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">Plant Library</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">Care Recommendations</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">Webhooks</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">Error Handling</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">SDKs & Libraries</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Plant Identification API</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                The Plant Identification API allows you to identify plants from images. 
                Upload an image, and our AI will return the most likely plant species along with confidence scores.
              </p>
              
              <h3 className="text-lg font-semibold mb-4">Endpoint</h3>
              <div className="bg-muted p-4 rounded-md mb-6 font-mono text-sm">
                POST https://api.plantguard.com/v1/identify
              </div>
              
              <h3 className="text-lg font-semibold mb-4">Request Parameters</h3>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-semibold">Parameter</th>
                      <th className="text-left py-2 px-4 font-semibold">Type</th>
                      <th className="text-left py-2 px-4 font-semibold">Required</th>
                      <th className="text-left py-2 px-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">image</td>
                      <td className="py-2 px-4">File</td>
                      <td className="py-2 px-4">Yes</td>
                      <td className="py-2 px-4">Image file of the plant to identify</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">details</td>
                      <td className="py-2 px-4">Boolean</td>
                      <td className="py-2 px-4">No</td>
                      <td className="py-2 px-4">Include detailed plant information (default: false)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">care_guide</td>
                      <td className="py-2 px-4">Boolean</td>
                      <td className="py-2 px-4">No</td>
                      <td className="py-2 px-4">Include care instructions (default: false)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <Tabs defaultValue="curl" className="mb-6">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="php">PHP</TabsTrigger>
                </TabsList>
                
                <TabsContent value="curl" className="mt-4">
                  <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
{`curl -X POST \\
  https://api.plantguard.com/v1/identify \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "image=@plant.jpg" \\
  -F "details=true" \\
  -F "care_guide=true"`}
                  </div>
                </TabsContent>
                
                <TabsContent value="python" className="mt-4">
                  <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
{`import requests

url = "https://api.plantguard.com/v1/identify"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
files = {
    "image": open("plant.jpg", "rb")
}
data = {
    "details": "true",
    "care_guide": "true"
}

response = requests.post(url, headers=headers, files=files, data=data)
print(response.json())`}
                  </div>
                </TabsContent>
                
                <TabsContent value="javascript" className="mt-4">
                  <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
{`const form = new FormData();
form.append("image", imageFile);
form.append("details", "true");
form.append("care_guide", "true");

fetch("https://api.plantguard.com/v1/identify", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: form
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));`}
                  </div>
                </TabsContent>
                
                <TabsContent value="php" className="mt-4">
                  <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
{`<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.plantguard.com/v1/identify",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer YOUR_API_KEY"
  ],
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => [
    "image" => new CURLFile("plant.jpg"),
    "details" => "true",
    "care_guide" => "true"
  ]
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;
?>`}
                  </div>
                </TabsContent>
              </Tabs>
              
              <h3 className="text-lg font-semibold mb-4">Response Example</h3>
              <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap mb-6">
{`{
  "result": {
    "plant": {
      "name": "Monstera Deliciosa",
      "scientific_name": "Monstera deliciosa",
      "family": "Araceae",
      "confidence": 0.97,
      "description": "Monstera deliciosa is a species of flowering plant native to tropical forests of southern Mexico, south to Panama.",
      "care_instructions": {
        "watering": "Allow soil to dry out between waterings. Water thoroughly when the top 1-2 inches of soil feel dry.",
        "sunlight": "Bright, indirect light. Avoid direct sunlight which can burn the leaves.",
        "temperature": "65-85°F (18-30°C). Not cold hardy, protect from temperatures below 55°F (13°C).",
        "fertilizing": "Feed with a balanced houseplant fertilizer diluted to half strength every 4-6 weeks during growing season."
      }
    }
  },
  "status": "success"
}`}
              </div>
              
              <h3 className="text-lg font-semibold mb-4">Error Responses</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-semibold">Status Code</th>
                      <th className="text-left py-2 px-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">401</td>
                      <td className="py-2 px-4">Invalid API key</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">400</td>
                      <td className="py-2 px-4">Bad request, missing required parameters</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">413</td>
                      <td className="py-2 px-4">Image file too large (max 10MB)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">429</td>
                      <td className="py-2 px-4">Rate limit exceeded</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">500</td>
                      <td className="py-2 px-4">Internal server error</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Get API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                To use the PlantGuard API, you'll need to obtain an API key. Register for a developer account
                and create an API key in your dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1">Register for API Access</Button>
                <Button variant="outline" className="flex-1">View Documentation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResourceLayout>
  );
};

export default ApiDocumentation;
