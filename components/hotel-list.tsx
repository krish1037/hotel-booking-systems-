"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Wifi, Coffee, Utensils, Car } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Hotel {
  id: number
  name: string
  location: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  image: string
  amenities: string[]
  distance: number
}

interface HotelListProps {
  location: string
  checkIn: string
  checkOut: string
  guests: string
}

// Mock data with proper typing
const hotels: Hotel[] = [
  {
    id: 101,
    name: "Grand Plaza Hotel",
    location: "Downtown, New York City",
    price: 199,
    originalPrice: 249,
    rating: 4.8,
    reviewCount: 1243,
    image: "/images/hotels/grand-plaza.jpg", // Updated image path
    amenities: ["Free WiFi", "Breakfast", "Restaurant", "Parking"],
    distance: 0.5,
  },
  {
    id: 102,
    name: "Riverside Suites",
    location: "Upper East Side, New York City",
    price: 179,
    originalPrice: 199,
    rating: 4.6,
    reviewCount: 867,
    image: "/images/hotels/riverside-suites.jpg", // Updated image path
    amenities: ["Free WiFi", "Kitchen", "Gym", "Laundry"],
    distance: 1.2,
  },
  {
    id: 103,
    name: "Metropolitan Boutique Hotel",
    location: "Chelsea, New York City",
    price: 229,
    originalPrice: 259,
    rating: 4.9,
    reviewCount: 532,
    image: "/placeholder.svg?height=300&width=500",
    amenities: ["Free WiFi", "Breakfast", "Spa", "Bar"],
    distance: 0.8,
  },
  {
    id: 104,
    name: "Central Park Inn",
    location: "Midtown, New York City",
    price: 159,
    originalPrice: 189,
    rating: 4.5,
    reviewCount: 976,
    image: "/placeholder.svg?height=300&width=500",
    amenities: ["Free WiFi", "Restaurant", "Gym", "Parking"],
    distance: 0.3,
  },
  {
    id: 105,
    name: "Skyline Hotel & Suites",
    location: "Financial District, New York City",
    price: 209,
    originalPrice: 239,
    rating: 4.7,
    reviewCount: 1102,
    image: "/placeholder.svg?height=300&width=500",
    amenities: ["Free WiFi", "Breakfast", "Pool", "Spa"],
    distance: 1.5,
  },
]

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case "free wifi":
      return <Wifi className="h-4 w-4" />
    case "breakfast":
      return <Coffee className="h-4 w-4" />
    case "restaurant":
      return <Utensils className="h-4 w-4" />
    case "parking":
      return <Car className="h-4 w-4" />
    default:
      return null
  }
}

export function HotelList({ location: searchLocation, checkIn, checkOut, guests }: HotelListProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Add useEffect to simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter hotels based on search location
  const filteredHotels = hotels.filter(hotel => 
    hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    )
  }

  if (filteredHotels.length === 0) {
    return (
      <div className="text-center py-8">
        No hotels found for "{searchLocation}"
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{filteredHotels.length} hotels found</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select className="text-sm border rounded-md p-1">
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {filteredHotels.map((hotel) => (
        <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
          <div className="relative h-64 md:h-auto md:w-1/3">
            <Image 
              src={hotel.image} 
              alt={hotel.name} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {hotel.originalPrice > hotel.price && (
              <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                Save ${(hotel.originalPrice - hotel.price).toFixed(2)}
              </Badge>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-bold">{hotel.name}</h3>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{hotel.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({hotel.reviewCount})</span>
              </div>
            </div>

            <div className="flex items-center text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {hotel.location} • {hotel.distance} miles from center
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </Badge>
              ))}
            </div>

            <div className="mt-auto flex justify-between items-end">
              <div>
                <div className="flex items-center">
                  {hotel.originalPrice > hotel.price && (
                    <span className="text-sm text-gray-500 line-through mr-2">${hotel.originalPrice}</span>
                  )}
                  <span className="text-2xl font-bold text-emerald-600">${hotel.price}</span>
                </div>
                <p className="text-sm text-gray-500">per night • {guests} guests</p>
              </div>

              <Link 
                href={{
                  pathname: `/hotel/${hotel.id}`,
                  query: { checkIn, checkOut, guests }
                }}
              >
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
