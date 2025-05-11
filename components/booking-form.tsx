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
import { toast } from "sonner"

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    country: "us",
    address: "",
    city: "",
    state: "",
    zip: "",
    termsAccepted: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        throw new Error('Please fill in all required guest information')
      }

      if (paymentMethod === 'credit-card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.nameOnCard)) {
        throw new Error('Please fill in all required payment information')
      }

      if (!formData.address || !formData.city || !formData.state || !formData.zip) {
        throw new Error('Please fill in all required billing address information')
      }

      if (!formData.termsAccepted) {
        throw new Error('Please accept the terms and conditions')
      }

      // Create booking
      const bookingResponse = await fetch('/api/bookings', {
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
          guestInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            specialRequests: formData.specialRequests
          },
          paymentInfo: {
            method: paymentMethod,
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            nameOnCard: formData.nameOnCard
          },
          billingAddress: {
            country: formData.country,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip
          }
        }),
      })

      if (!bookingResponse.ok) {
        const error = await bookingResponse.json()
        throw new Error(error.message || 'Failed to create booking')
      }

      const bookingData = await bookingResponse.json()

      // Process payment
      const paymentResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingData.id,
          amount: 299, // This should be calculated based on room price and duration
          paymentMethod
        }),
      })

      if (!paymentResponse.ok) {
        throw new Error('Payment processing failed')
      }

      toast.success('Booking confirmed successfully!')
      router.push(`/booking/confirmation?bookingId=${bookingData.id}`)
    } catch (error) {
      console.error('Error creating booking:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to create booking')
    } finally {
      setLoading(false)
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
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                type="tel" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (optional)</Label>
            <Input 
              id="specialRequests" 
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
            />
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
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input 
                    id="cardNumber" 
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456" 
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required 
                  />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <div className="relative">
                    <Input 
                      id="expiryDate" 
                      name="expiryDate"
                      placeholder="MM/YY" 
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required 
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    name="cvv"
                    placeholder="123" 
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input 
                  id="nameOnCard" 
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  required 
                />
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
            <Select 
              value={formData.country} 
              onValueChange={(value) => handleSelectChange('country', value)}
            >
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
            <Input 
              id="address" 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input 
                id="state" 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP/Postal Code</Label>
              <Input 
                id="zip" 
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))
              }
              required 
            />
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
