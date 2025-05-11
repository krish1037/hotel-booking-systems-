import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, MapPin, Calendar, Users, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoomList } from "@/components/room-list"
import { HotelAmenities } from "@/components/hotel-amenities"
import { HotelReviews } from "@/components/hotel-reviews"
import { HotelLocation } from "@/components/hotel-location"

interface Hotel {
  id: number
  name: string
  description: string
  location: string
  address: string
  rating: number
  reviewCount: number
  images: string[]
  amenities: string[]
  policies: {
    checkIn: string
    checkOut: string
    cancellation: string
    children: string
    pets: string
    smoking: string
  }
}

interface PageProps {
  params: {
    id: string
  }
  searchParams: {
    checkIn?: string
    checkOut?: string
    guests?: string
  }
}

// Mock data for hotel details
const hotels: Hotel[] = [
  {
    id: 101,
    name: "Grand Plaza Hotel",
    description:
      "Located in the heart of New York City, Grand Plaza Hotel offers luxurious accommodations with stunning city views. The hotel features elegant rooms, a rooftop restaurant, spa facilities, and a fitness center. Just steps away from major attractions, shopping, and dining.",
    location: "Downtown, New York City",
    address: "123 Broadway, New York, NY 10007",
    rating: 4.8,
    reviewCount: 1243,
    images: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
    ],
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Flat-screen TV",
      "Minibar",
      "Room Service",
      "Restaurant",
      "Bar",
      "Fitness Center",
      "Spa",
      "Swimming Pool",
      "Business Center",
      "Concierge Service",
      "24-hour Front Desk",
      "Parking",
      "Airport Shuttle",
      "Laundry",
    ],
    policies: {
      checkIn: "From 3:00 PM",
      checkOut: "Until 12:00 PM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      children: "Children of all ages are welcome",
      pets: "Pets are not allowed",
      smoking: "No smoking",
    },
  },
]

export default function HotelDetailPage({
  params,
  searchParams,
}: PageProps) {
  const hotelId = Number.parseInt(params.id)
  const hotel = hotels.find((h) => h.id === hotelId)

  if (!hotel) {
    notFound()
  }

  // Get search parameters from URL
  const checkIn = searchParams.checkIn || ""
  const checkOut = searchParams.checkOut || ""
  const guests = searchParams.guests || "2"

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hotel Images Gallery */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image src={hotel.images[0] || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {hotel.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative h-[180px] rounded-lg overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${hotel.name} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Info Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hotel.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{hotel.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({hotel.reviewCount} reviews)</span>
                  </div>
                </div>
                <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                  Excellent
                </Badge>
              </div>

              <p className="text-gray-600 mb-4">{hotel.description}</p>

              <div className="flex flex-wrap gap-2">
                {hotel.amenities.slice(0, 6).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    <span>{amenity}</span>
                  </Badge>
                ))}
                <Badge variant="outline" className="flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  <span>+{hotel.amenities.length - 6} more</span>
                </Badge>
              </div>
            </div>

            {/* Tabs for Details */}
            <Tabs defaultValue="rooms">
              <TabsList className="w-full bg-white rounded-lg shadow-md mb-6">
                <TabsTrigger value="rooms" className="flex-1">
                  Rooms
                </TabsTrigger>
                <TabsTrigger value="amenities" className="flex-1">
                  Amenities
                </TabsTrigger>
                <TabsTrigger value="location" className="flex-1">
                  Location
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="policies" className="flex-1">
                  Policies
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rooms">
                <RoomList hotelId={hotelId} checkIn={checkIn} checkOut={checkOut} guests={guests} />
              </TabsContent>

              <TabsContent value="amenities">
                <HotelAmenities amenities={hotel.amenities} />
              </TabsContent>

              <TabsContent value="location">
                <HotelLocation name={hotel.name} address={hotel.address} location={hotel.location} />
              </TabsContent>

              <TabsContent value="reviews">
                <HotelReviews hotelId={hotelId} rating={hotel.rating} reviewCount={hotel.reviewCount} />
              </TabsContent>

              <TabsContent value="policies">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">Hotel Policies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Check-in/Check-out</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          Check-in: {hotel.policies.checkIn}
                        </li>
                        <li className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          Check-out: {hotel.policies.checkOut}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Cancellation</h4>
                      <p className="text-gray-600">{hotel.policies.cancellation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Children and Pets</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          {hotel.policies.children}
                        </li>
                        <li className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-gray-400" />
                          {hotel.policies.pets}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Other Policies</h4>
                      <p className="text-gray-600">{hotel.policies.smoking}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Book Your Stay</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Check-in</span>
                  </div>
                  <span className="font-medium">{checkIn || "Select date"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Check-out</span>
                  </div>
                  <span className="font-medium">{checkOut || "Select date"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>Guests</span>
                  </div>
                  <span className="font-medium">{guests} guests</span>
                </div>
              </div>

              <div className="border-t border-b py-4 my-4 space-y-2">
                <div className="flex justify-between">
                  <span>Average nightly rate</span>
                  <span className="font-bold">$299</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Taxes &amp; fees</span>
                  <span>$45</span>
                </div>
              </div>

              <Link
                href={{
                  pathname: `/booking/${hotelId}`,
                  query: { checkIn, checkOut, guests },
                }}
              >
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Continue to Book
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 