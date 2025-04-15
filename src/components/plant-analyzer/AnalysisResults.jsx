
import React from "react";

const AnalysisResults = ({ result }) => {
  if (!result) {
    return null;
  }

  const { plant, disease, confidence } = result;

  return (
    <div className="mt-6">
      <div className="mb-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Analysis Results</h3>
          <span className="text-sm text-muted-foreground">
            {(confidence * 100).toFixed(1)}% confidence
          </span>
        </div>
      </div>

      {plant && (
        <div className="grid gap-4 mb-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Plant Identification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Species</p>
                <p className="font-medium">{plant.species}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Common Name</p>
                <p className="font-medium">{plant.common_name}</p>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Care Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Water</p>
                <p className="font-medium">{plant.water_requirement}</p>
                <p className="text-xs text-muted-foreground">{plant.water_amount_ml_per_day}ml per day</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Light</p>
                <p className="font-medium">{plant.light_requirement}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-medium">{plant.humidity_preference}</p>
              </div>
            </div>
          </div>

          {plant.description && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm">{plant.description}</p>
            </div>
          )}

          {plant.propagation_methods && plant.propagation_methods.length > 0 && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Propagation Methods</h3>
              <ul className="list-disc ml-5 text-sm">
                {plant.propagation_methods.map((method, index) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>
            </div>
          )}

          {plant.care_tips && plant.care_tips.length > 0 && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Care Tips</h3>
              <ul className="list-disc ml-5 text-sm">
                {plant.care_tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {disease && (
        <div className="grid gap-4">
          <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Health Alert: {disease.disease_name}</h3>
            <p className="text-sm text-yellow-700">{disease.description}</p>
          </div>

          {disease.symptoms && disease.symptoms.length > 0 && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Symptoms</h3>
              <ul className="list-disc ml-5 text-sm">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>
          )}

          {disease.treatments && disease.treatments.length > 0 && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Treatments</h3>
              <ul className="list-disc ml-5 text-sm">
                {disease.treatments.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </div>
          )}

          {disease.prevention && disease.prevention.length > 0 && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Prevention</h3>
              <ul className="list-disc ml-5 text-sm">
                {disease.prevention.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
