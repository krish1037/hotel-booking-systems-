"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Calendar, Shield } from "lucide-react"

interface BookingFormProps {
  hotelId: number
  roomId?: number
  checkIn: string
  checkOut: string
  guests: string
}

export function BookingForm({ hotelId, roomId, checkIn, checkOut, guests }: BookingFormProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call with actual booking data
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotelId,
          roomId,
          checkIn,
          checkOut,
          guests: parseInt(guests),
          paymentMethod,
          // Add other form data here
        }),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const data = await response.json();
      router.push(`/booking/confirmation?bookingId=${data.bookingId}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error state here
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Booking Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
          <CardDescription>Review your booking details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Check-in</Label>
              <p className="text-sm font-medium">{checkIn}</p>
            </div>
            <div>
              <Label>Check-out</Label>
              <p className="text-sm font-medium">{checkOut}</p>
            </div>
          </div>
          <div>
            <Label>Guests</Label>
            <p className="text-sm font-medium">{guests} guests</p>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
          <CardDescription>Please enter the guest details for this reservation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special-requests">Special Requests (optional)</Label>
            <Input id="special-requests" />
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Select your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
            </TabsList>

            <TabsContent value="credit-card" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                  <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <div className="relative">
                    <Input id="expiry" placeholder="MM/YY" required />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name-on-card">Name on Card</Label>
                <Input id="name-on-card" required />
              </div>
            </TabsContent>

            <TabsContent value="paypal" className="mt-4">
              <div className="text-center py-8">
                <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                <Button type="button" variant="outline" className="mx-auto">
                  Continue with PayPal
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
          <CardDescription>Enter the billing address associated with your payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country/Region</Label>
            <Select defaultValue="us">
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input id="address" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input id="state" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP/Postal Code</Label>
              <Input id="zip" required />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" required />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </Label>
              <p className="text-sm text-gray-500">
                By checking this box, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
        {loading ? "Processing..." : "Complete Booking"}
      </Button>

      <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
        <Shield className="h-4 w-4 mr-1" />
        <span>Secure payment processing</span>
      </div>
    </form>
  )
}
