"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define the hotel type
interface Hotel {
  id: number
  name: string
  location: string
  price: number
  rating: number
  image: string
  tags: string[]
}

export function FeaturedHotelsClient() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch hotels from the API
    const fetchHotels = async () => {
      try {
        const response = await fetch("/api/hotels")

        if (!response.ok) {
          throw new Error("Failed to fetch hotels")
        }

        const data = await response.json()
        setHotels(data.hotels)
      } catch (err) {
        setError("Error loading hotels. Please try again later.")
        console.error("Error fetching hotels:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="flex gap-1 mb-3">
                <div className="h-5 bg-gray-200 rounded w-16"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-5 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {hotels.map((hotel) => (
        <Link
          href={`/hotel/${hotel.id}`}
          key={hotel.id}
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48">
            <Image
              src={hotel.image || "/placeholder.svg"}
              alt={hotel.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg group-hover:text-emerald-600 transition-colors">{hotel.name}</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm ml-1">{hotel.rating}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-2">{hotel.location}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {hotel.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-emerald-600">
                ${hotel.price}
                <span className="text-sm font-normal text-gray-500"> / night</span>
              </p>
              <span className="text-sm text-gray-500 underline">View Details</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
