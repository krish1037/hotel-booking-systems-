import Image from "next/image"
import Link from "next/link"
import { Check, Users, Coffee, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data for room types
const rooms = [
  {
    id: 1,
    hotelId: 101,
    name: "Deluxe King Room",
    description: "Spacious room with a king-sized bed, city view, and modern amenities.",
    price: 199,
    capacity: 2,
    size: "35 m²",
    bedType: "1 King Bed",
    image: "/placeholder.svg?height=300&width=500",
    amenities: ["Free WiFi", "Breakfast Included", "Air Conditioning", "Flat-screen TV", "Minibar"],
    available: true,
  },
  {
    id: 2,
    hotelId: 101,
    name: "Premium Double Room",
    description: "Comfortable room with two double beds, perfect for families or groups.",
    price: 249,
    capacity: 4,
    size: "40 m²",
    bedType: "2 Double Beds",
    image: "/placeholder.svg?height=300&width=500",
    amenities: ["Free WiFi", "Breakfast Included", "Air Conditioning", "Flat-screen TV", "Minibar"],
    available: true,
  },
  {
    id: 3,
    hotelId: 101,
    name: "Executive Suite",
    description: "Luxury suite with separate living area, premium amenities, and panoramic city views.",
    price: 349,
    capacity: 2,
    size: "55 m²",
    bedType: "1 King Bed",
    image: "/placeholder.svg?height=300&width=500",
    amenities: [
      "Free WiFi",
      "Breakfast Included",
      "Air Conditioning",
      "Flat-screen TV",
      "Minibar",
      "Bathtub",
      "Lounge Access",
    ],
    available: true,
  },
  {
    id: 4,
    hotelId: 101,
    name: "Family Suite",
    description: "Spacious suite with two bedrooms, perfect for families with children.",
    price: 399,
    capacity: 6,
    size: "70 m²",
    bedType: "1 King Bed + 2 Twin Beds",
    image: "/placeholder.svg?height=300&width=500",
    amenities: ["Free WiFi", "Breakfast Included", "Air Conditioning", "Flat-screen TV", "Minibar", "Kitchenette"],
    available: false,
  },
]

interface RoomListProps {
  hotelId: number
  checkIn: string
  checkOut: string
  guests: string
}

export function RoomList({ hotelId, checkIn, checkOut, guests }: RoomListProps) {
  // Filter rooms by hotel ID
  const hotelRooms = rooms.filter((room) => room.hotelId === hotelId)

  return (
    <div className="space-y-6">
      {hotelRooms.map((room) => (
        <div
          key={room.id}
          className={`bg-white rounded-lg shadow-md overflow-hidden ${!room.available ? "opacity-70" : ""}`}
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative h-64 md:h-auto md:w-1/3">
              <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-bold">{room.name}</h3>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">Up to {room.capacity} guests</span>
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-2">
                {room.size} • {room.bedType}
              </div>

              <p className="text-gray-600 mb-4">{room.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {room.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                    {amenity === "Free WiFi" ? (
                      <Wifi className="h-3 w-3" />
                    ) : amenity === "Breakfast Included" ? (
                      <Coffee className="h-3 w-3" />
                    ) : (
                      <Check className="h-3 w-3" />
                    )}
                    <span>{amenity}</span>
                  </Badge>
                ))}
              </div>

              <div className="mt-auto flex justify-between items-end">
                <div>
                  <span className="text-2xl font-bold text-emerald-600">${room.price}</span>
                  <p className="text-sm text-gray-500">per night • includes taxes & fees</p>
                </div>

                {room.available ? (
                  <Link
                    href={`/booking/${hotelId}?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                  >
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Book Now</Button>
                  </Link>
                ) : (
                  <Button disabled className="bg-gray-400">
                    Sold Out
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
