import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface HotelCardProps {
  name: string
  location: string
  price: number
  rating: number
  image: string
  description: string
}

export function HotelCard({ name, location, price, rating, image, description }: HotelCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">${price}/night</span>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 