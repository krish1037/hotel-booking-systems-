import { notFound } from "next/navigation"
import { BookingForm } from "@/components/booking-form"
import { BookingSummary } from "@/components/booking-summary"

// Mock data for hotels
const hotels = [
  {
    id: 101,
    name: "Grand Plaza Hotel",
    location: "Downtown, New York City",
    address: "123 Broadway, New York, NY 10007",
    image: "/placeholder.svg?height=300&width=500",
  },
]

// Mock data for room types
const rooms = [
  {
    id: 1,
    hotelId: 101,
    name: "Deluxe King Room",
    price: 199,
    capacity: 2,
    bedType: "1 King Bed",
  },
  {
    id: 2,
    hotelId: 101,
    name: "Premium Double Room",
    price: 249,
    capacity: 4,
    bedType: "2 Double Beds",
  },
  {
    id: 3,
    hotelId: 101,
    name: "Executive Suite",
    price: 349,
    capacity: 2,
    bedType: "1 King Bed",
  },
]

export default function BookingPage({
  params,
  searchParams,
}) {
  // Add validation for hotelId
  const hotelId = !isNaN(Number(params.id)) ? Number(params.id) : null
  if (!hotelId) {
    notFound()
  }

  const hotel = hotels.find((h) => h.id === hotelId)
  if (!hotel) {
    notFound()
  }

  // Improve parameter validation
  const roomId = !isNaN(Number(searchParams.roomId)) ? Number(searchParams.roomId) : undefined
  const checkIn = typeof searchParams.checkIn === "string" ? searchParams.checkIn : ""
  const checkOut = typeof searchParams.checkOut === "string" ? searchParams.checkOut : ""
  const guests = typeof searchParams.guests === "string" && !isNaN(Number(searchParams.guests))
    ? searchParams.guests
    : "2"

  // Validate room exists for given hotel
  const selectedRoom = roomId 
    ? rooms.find((r) => r.id === roomId && r.hotelId === hotelId) 
    : undefined

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Booking Form */}
          <div className="w-full lg:w-2/3">
            <BookingForm hotelId={hotelId} roomId={roomId} checkIn={checkIn} checkOut={checkOut} guests={guests} />
          </div>

          {/* Booking Summary */}
          <div className="w-full lg:w-1/3">
            <BookingSummary hotel={hotel} room={selectedRoom} checkIn={checkIn} checkOut={checkOut} guests={guests} />
          </div>
        </div>
      </div>
    </main>
  )
}
