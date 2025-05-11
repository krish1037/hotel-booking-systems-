import Link from "next/link"
import { CheckCircle, Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface SearchParams {
  bookingId?: string
}

interface ConfirmationPageProps {
  searchParams: SearchParams
}

export default function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  // Get booking ID from URL
  const bookingId = typeof searchParams.bookingId === "string" ? searchParams.bookingId : "BOOKING123456"

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your reservation has been successfully processed.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="font-medium">Booking Reference</div>
              <div className="text-right">
                <span className="font-bold">{bookingId}</span>
                <p className="text-xs text-gray-500">Please save this for your records</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Check-in / Check-out</div>
                  <p className="text-gray-600">July 15, 2023 - July 18, 2023 (3 nights)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Grand Plaza Hotel</div>
                  <p className="text-gray-600">123 Broadway, New York, NY 10007</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Room Details</div>
                  <p className="text-gray-600">Deluxe King Room • 2 Guests</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div className="font-medium">Total Amount</div>
              <div className="text-right">
                <span className="font-bold text-lg">$702</span>
                <p className="text-xs text-gray-500">Includes taxes and fees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">What&apos;s Next?</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              We&apos;ve sent a confirmation email to your registered email address with all the details of your booking.
            </p>
            <p className="text-gray-600">
              You can manage your reservation, make changes, or cancel (subject to the cancellation policy) by logging
              into your account.
            </p>
            <p className="text-gray-600">
              If you have any questions or need assistance, please contact our customer support team.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
          <Link href="/account/bookings">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Manage Booking
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
} 