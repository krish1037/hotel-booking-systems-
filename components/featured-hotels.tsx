import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for featured hotels
const featuredHotels = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "New York City",
    price: 299,
    rating: 4.8,
    image: "/images/hotels/grand-plaza.jpg",
    tags: ["Luxury", "City View"],
    description: "Luxurious hotel in the heart of Manhattan with stunning city views and premium amenities."
  },
  {
    id: 2,
    name: "Seaside Resort",
    location: "Miami Beach",
    price: 399,
    rating: 4.9,
    image: "/images/hotels/seaside-resort.jpg",
    tags: ["Beach Front", "Spa"],
    description: "Beachfront resort with private beach access, spa services, and ocean-view rooms."
  },
  {
    id: 3,
    name: "Mountain Lodge",
    location: "Denver",
    price: 199,
    rating: 4.7,
    image: "/images/hotels/mountain-lodge.jpg",
    tags: ["Mountain View", "Ski Access"],
    description: "Cozy mountain retreat with ski-in/ski-out access and panoramic mountain views."
  },
  {
    id: 4,
    name: "Urban Boutique Hotel",
    location: "San Francisco",
    price: 249,
    rating: 4.6,
    image: "/images/hotels/urban-boutique.jpg",
    tags: ["Boutique", "City Center"],
    description: "Stylish boutique hotel in downtown San Francisco with modern amenities."
  },
]

export function FeaturedHotels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredHotels.map((hotel) => (
        <Link
          href={`/hotel/${hotel.id}`}
          key={hotel.id}
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48">
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
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
