import Image from "next/image"
import { format, differenceInDays } from "date-fns"
import { Calendar, Users, CreditCard, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Hotel {
  id: number
  name: string
  location: string
  address: string
  image: string
}

interface Room {
  id: number
  hotelId: number
  name: string
  price: number
  capacity: number
  bedType: string
}

interface BookingSummaryProps {
  hotel: Hotel
  room?: Room
  checkIn: string
  checkOut: string
  guests: string
  hotelName: string
  address: string
  roomType: string
  price: number
  taxes: number
}

export function BookingSummary({
  hotel,
  room,
  checkIn,
  checkOut,
  guests,
  hotelName,
  address,
  roomType,
  price,
  taxes,
}: BookingSummaryProps) {
  // Calculate number of nights
  const nights = checkIn && checkOut ? differenceInDays(new Date(checkOut), new Date(checkIn)) : 1

  // Calculate total price
  const roomPrice = room ? room.price : 199 // Default price if no room selected
  const subtotal = roomPrice * nights
  const total = subtotal + taxes

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Hotel Info */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium">{hotelName}</div>
              <p className="text-gray-600">{address}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span className="font-medium">
                    {checkIn ? format(new Date(checkIn), "MMM d, yyyy") : "Not selected"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span className="font-medium">
                    {checkOut ? format(new Date(checkOut), "MMM d, yyyy") : "Not selected"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-medium">{guests}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Room type:</span>
                  <span className="font-medium">{room ? room.name : "Standard Room"}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                ${roomPrice} x {nights} {nights === 1 ? "night" : "nights"}
              </span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Taxes & fees</span>
              <span>${taxes}</span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <p className="text-xs text-gray-500 mt-1">Charged in USD</p>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-gray-50 p-3 rounded-md text-sm">
            <p className="font-medium mb-1">Cancellation Policy</p>
            <p className="text-gray-600 text-xs">
              Free cancellation until 24 hours before check-in. After that, you will be charged the first night's rate.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
