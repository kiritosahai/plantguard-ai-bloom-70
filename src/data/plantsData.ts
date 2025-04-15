
export interface PlantData {
  species: string;
  common_name: string;
  water_requirement: "Low" | "Moderate" | "High";
  water_amount_ml_per_day: number;
  light_requirement: "Low" | "Medium" | "High";
  humidity_preference: "Low" | "Medium" | "High";
  description: string;
  care_tips: string[];
  mature_size: string;
  propagation_methods: string[];
  common_issues: string[];
}

export interface DiseaseData {
  disease_name: string;
  description: string;
  symptoms: string[];
  treatments: string[];
  prevention: string[];
}

export const plantDatabase: PlantData[] = [
  {
    species: "Ficus lyrata",
    common_name: "Fiddle Leaf Fig",
    water_requirement: "Moderate",
    water_amount_ml_per_day: 250,
    light_requirement: "Medium",
    humidity_preference: "Medium",
    description: "Known for its large, violin-shaped leaves, the Fiddle Leaf Fig is a popular indoor tree with an elegant, architectural form.",
    care_tips: [
      "Water when the top inch of soil is dry",
      "Rotate occasionally for even growth",
      "Wipe leaves to remove dust",
      "Avoid moving frequently as they dislike change"
    ],
    mature_size: "6-10 feet tall indoors",
    propagation_methods: ["Stem cuttings", "Air layering"],
    common_issues: ["Leaf drop", "Brown spots", "Root rot"]
  },
  {
    species: "Aloe vera",
    common_name: "Aloe Vera",
    water_requirement: "Low",
    water_amount_ml_per_day: 100,
    light_requirement: "High",
    humidity_preference: "Low",
    description: "A succulent plant species with thick, fleshy leaves containing a gel-like substance known for its medicinal properties.",
    care_tips: [
      "Allow soil to dry completely between waterings",
      "Provide bright, indirect sunlight",
      "Use well-draining soil mix",
      "Protect from frost in winter"
    ],
    mature_size: "1-2 feet tall",
    propagation_methods: ["Offsets", "Division"],
    common_issues: ["Overwatering", "Sunburn", "Pest infestations"]
  },
  {
    species: "Monstera deliciosa",
    common_name: "Swiss Cheese Plant",
    water_requirement: "Moderate",
    water_amount_ml_per_day: 200,
    light_requirement: "Medium",
    humidity_preference: "High",
    description: "Known for its characteristic split leaves with natural holes, this tropical plant is a popular houseplant choice.",
    care_tips: [
      "Water when the top 1-2 inches of soil are dry",
      "Provide indirect light",
      "Support with a moss pole as it grows",
      "Mist regularly for increased humidity"
    ],
    mature_size: "3-8 feet tall indoors",
    propagation_methods: ["Stem cuttings", "Air layering"],
    common_issues: ["Yellowing leaves", "Root rot", "Lack of fenestration"]
  },
  {
    species: "Sansevieria trifasciata",
    common_name: "Snake Plant",
    water_requirement: "Low",
    water_amount_ml_per_day: 80,
    light_requirement: "Low",
    humidity_preference: "Low",
    description: "An extremely hardy plant with tall, stiff leaves that can be dark green with light gray-green cross-banding.",
    care_tips: [
      "Allow soil to dry completely between waterings",
      "Can tolerate low light conditions",
      "Avoid overwatering to prevent root rot",
      "Rarely needs repotting"
    ],
    mature_size: "1-4 feet tall",
    propagation_methods: ["Division", "Leaf cuttings"],
    common_issues: ["Overwatering", "Leaf damage", "Mealybugs"]
  },
  {
    species: "Spathiphyllum wallisii",
    common_name: "Peace Lily",
    water_requirement: "Moderate",
    water_amount_ml_per_day: 150,
    light_requirement: "Low",
    humidity_preference: "High",
    description: "Elegant plant with glossy, dark green leaves and white spathes that are often mistaken for flowers.",
    care_tips: [
      "Keep soil consistently moist but not soggy",
      "Can thrive in low light conditions",
      "Drooping leaves indicate need for water",
      "Mist regularly to maintain humidity"
    ],
    mature_size: "1-3 feet tall",
    propagation_methods: ["Division"],
    common_issues: ["Brown leaf tips", "Yellow leaves", "Failure to bloom"]
  }
];

export const diseaseDatabase: DiseaseData[] = [
  {
    disease_name: "Leaf Spot",
    description: "A common fungal disease characterized by spots on the leaves.",
    symptoms: [
      "Brown or black spots on leaves",
      "Yellowing around the spots",
      "Spots may have a yellow halo",
      "Affected leaves may drop prematurely"
    ],
    treatments: [
      "Remove and destroy affected leaves",
      "Apply fungicidal spray",
      "Ensure good air circulation",
      "Avoid overhead watering"
    ],
    prevention: [
      "Space plants properly for air circulation",
      "Water at the base, not on leaves",
      "Keep leaves dry",
      "Maintain clean growing environment"
    ]
  },
  {
    disease_name: "Powdery Mildew",
    description: "A fungal disease that appears as a white powdery substance on plant surfaces.",
    symptoms: [
      "White powdery patches on leaves, stems or flowers",
      "Distorted new growth",
      "Yellowing or browning of leaves",
      "Premature leaf drop"
    ],
    treatments: [
      "Apply neem oil or fungicide",
      "Remove heavily infected parts",
      "Increase air circulation",
      "Milk solution spray (1:10 milk to water)"
    ],
    prevention: [
      "Provide adequate spacing between plants",
      "Avoid high humidity and poor air circulation",
      "Water in morning so plants dry during day",
      "Use resistant plant varieties when possible"
    ]
  },
  {
    disease_name: "Root Rot",
    description: "A disease caused by overwatering that leads to fungal or bacterial infection of the roots.",
    symptoms: [
      "Wilting despite moist soil",
      "Yellowing leaves",
      "Soft, brown roots",
      "Foul smell from soil"
    ],
    treatments: [
      "Remove plant from soil and trim affected roots",
      "Repot in fresh, well-draining soil",
      "Reduce watering frequency",
      "Apply fungicide for severe cases"
    ],
    prevention: [
      "Use well-draining soil",
      "Water only when top inch of soil is dry",
      "Use pots with drainage holes",
      "Avoid overwatering"
    ]
  },
  {
    disease_name: "Spider Mites",
    description: "Tiny pests that suck plant juices, causing damage to foliage.",
    symptoms: [
      "Fine webbing on leaves",
      "Yellow or brown speckling on leaves",
      "Leaf drop",
      "Stunted growth"
    ],
    treatments: [
      "Spray plants with water to dislodge mites",
      "Apply insecticidal soap or neem oil",
      "Introduce predatory mites",
      "Isolate affected plants"
    ],
    prevention: [
      "Maintain adequate humidity",
      "Regular inspection of plants",
      "Keep plants clean and dust-free",
      "Quarantine new plants before introducing"
    ]
  },
  {
    disease_name: "Aphids",
    description: "Small sap-sucking insects that can cause significant damage to plants.",
    symptoms: [
      "Curled or distorted leaves",
      "Sticky residue on leaves (honeydew)",
      "Black sooty mold",
      "Yellowing leaves and stunted growth"
    ],
    treatments: [
      "Spray with strong stream of water",
      "Apply insecticidal soap or neem oil",
      "Introduce natural predators (ladybugs)",
      "Prune heavily infested areas"
    ],
    prevention: [
      "Regular inspection of plants",
      "Avoid overfertilizing with nitrogen",
      "Remove weeds that may harbor aphids",
      "Use reflective mulch to deter aphids"
    ]
  }
];
