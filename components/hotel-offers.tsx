import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data for hotel offers
const offers = [
  {
    id: 1,
    title: "Summer Getaway Special",
    description: "Enjoy 20% off on all beach resorts for summer bookings",
    image: "/placeholder.svg?height=300&width=600",
    discount: "20% OFF",
    validUntil: "Aug 31, 2023",
  },
  {
    id: 2,
    title: "Weekend City Escape",
    description: "Book a 2-night stay in any city hotel and get the 3rd night free",
    image: "/placeholder.svg?height=300&width=600",
    discount: "3rd Night Free",
    validUntil: "Dec 15, 2023",
  },
]

export function HotelOffers() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {offers.map((offer) => (
        <div key={offer.id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
          <div className="relative h-48 md:h-auto md:w-1/2">
            <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
            <Badge className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-700">{offer.discount}</Badge>
          </div>
          <div className="p-6 md:w-1/2 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <p className="text-sm text-gray-500">Valid until: {offer.validUntil}</p>
            </div>
            <div className="mt-4">
              <Link href="/offers">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">View Offer</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
