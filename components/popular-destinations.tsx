import Image from "next/image"
import Link from "next/link"

// Mock data for popular destinations
const destinations = [
  {
    id: 1,
    name: "New York",
    country: "United States",
    hotelCount: 1243,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    hotelCount: 986,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    hotelCount: 1567,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    name: "Dubai",
    country: "UAE",
    hotelCount: 732,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    name: "London",
    country: "United Kingdom",
    hotelCount: 1089,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    name: "Sydney",
    country: "Australia",
    hotelCount: 645,
    image: "/placeholder.svg?height=300&width=400",
  },
]

export function PopularDestinations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <Link
          href={`/search?location=${encodeURIComponent(destination.name)}`}
          key={destination.id}
          className="group relative h-64 rounded-lg overflow-hidden shadow-md"
        >
          <Image
            src={destination.image || "/placeholder.svg"}
            alt={destination.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-xl font-bold">{destination.name}</h3>
            <p className="text-sm text-white/80">{destination.country}</p>
            <p className="text-sm mt-1">{destination.hotelCount} hotels</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
