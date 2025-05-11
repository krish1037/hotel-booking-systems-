import Image from "next/image"
import { MapPin, Star, Clock, DollarSign } from "lucide-react"

interface CityPlanProps {
  city: string
  attractions: {
    name: string
    description: string
    rating: number
    visitTime: string
    cost: string
    image: string
  }[]
}

const cityPlans: Record<string, CityPlanProps> = {
  "New York": {
    city: "New York",
    attractions: [
      {
        name: "Times Square",
        description: "The heart of Manhattan, known for its bright lights and Broadway theaters",
        rating: 4.8,
        visitTime: "2-3 hours",
        cost: "Free",
        image: "/images/cities/new-york.jpg"
      },
      {
        name: "Central Park",
        description: "Iconic urban park with walking trails, lakes, and recreational areas",
        rating: 4.9,
        visitTime: "3-4 hours",
        cost: "Free",
        image: "/images/cities/new-york.jpg"
      },
      {
        name: "Empire State Building",
        description: "Famous skyscraper with observation decks offering panoramic views",
        rating: 4.7,
        visitTime: "1-2 hours",
        cost: "$38",
        image: "/images/cities/new-york.jpg"
      }
    ]
  },
  "Dubai": {
    city: "Dubai",
    attractions: [
      {
        name: "Burj Khalifa",
        description: "World's tallest building with observation deck and luxury shopping",
        rating: 4.9,
        visitTime: "2-3 hours",
        cost: "$35",
        image: "/images/cities/dubai.jpg"
      },
      {
        name: "Dubai Mall",
        description: "Largest shopping mall in the world with entertainment and dining",
        rating: 4.8,
        visitTime: "4-5 hours",
        cost: "Free entry",
        image: "/images/cities/dubai.jpg"
      },
      {
        name: "Palm Jumeirah",
        description: "Artificial island with luxury hotels and beach resorts",
        rating: 4.7,
        visitTime: "3-4 hours",
        cost: "Free",
        image: "/images/cities/dubai.jpg"
      }
    ]
  },
  "London": {
    city: "London",
    attractions: [
      {
        name: "Big Ben",
        description: "Iconic clock tower and symbol of London",
        rating: 4.8,
        visitTime: "1 hour",
        cost: "Free",
        image: "/images/cities/london.jpg"
      },
      {
        name: "British Museum",
        description: "World-famous museum with vast collection of art and artifacts",
        rating: 4.9,
        visitTime: "3-4 hours",
        cost: "Free",
        image: "/images/cities/london.jpg"
      },
      {
        name: "Tower of London",
        description: "Historic castle and fortress on the north bank of the River Thames",
        rating: 4.7,
        visitTime: "2-3 hours",
        cost: "£29.90",
        image: "/images/cities/london.jpg"
      }
    ]
  }
}

export function CityPlan({ city }: { city: string }) {
  const plan = cityPlans[city]
  
  if (!plan) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-6">City Plan for {city}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plan.attractions.map((attraction, index) => (
          <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={attraction.image}
                alt={attraction.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{attraction.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{attraction.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{attraction.rating} Rating</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{attraction.visitTime}</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{attraction.cost}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 