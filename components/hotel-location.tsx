import Image from "next/image"
import { MapPin } from "lucide-react"

interface HotelLocationProps {
  name: string
  address: string
  location: string
}

export function HotelLocation({ name, address, location }: HotelLocationProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">Location</h3>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="relative h-64 rounded-lg overflow-hidden mb-4">
            <Image src="/placeholder.svg?height=400&width=600" alt="Map location" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-emerald-600 text-white p-2 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">{address}</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h4 className="font-semibold text-lg mb-4">What's Nearby</h4>

          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">Attractions</h5>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Central Park</span>
                  <span>0.3 miles</span>
                </li>
                <li className="flex justify-between">
                  <span>Times Square</span>
                  <span>0.7 miles</span>
                </li>
                <li className="flex justify-between">
                  <span>Empire State Building</span>
                  <span>1.2 miles</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-2">Transportation</h5>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Grand Central Station</span>
                  <span>0.5 miles</span>
                </li>
                <li className="flex justify-between">
                  <span>Subway Station</span>
                  <span>0.2 miles</span>
                </li>
                <li className="flex justify-between">
                  <span>JFK International Airport</span>
                  <span>15.8 miles</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-2">Dining & Shopping</h5>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Restaurant Row</span>
                  <span>0.4 miles</span>
                </li>
                <li className="flex justify-between">
                  <span>Shopping Mall</span>
                  <span>0.6 miles</span>
                </li>
                <li className="flex justify-between">
                  <span>Grocery Store</span>
                  <span>0.3 miles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
