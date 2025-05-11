import { Star, ThumbsUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Mock data for reviews
const reviews = [
  {
    id: 1,
    hotelId: 101,
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "United States",
    },
    rating: 5,
    date: "June 15, 2023",
    title: "Excellent stay, highly recommend!",
    comment:
      "We had an amazing experience at this hotel. The staff was incredibly friendly and helpful. The room was spacious, clean, and had a beautiful view. The location is perfect for exploring the city. Will definitely stay here again!",
    helpful: 24,
    stayType: "Family vacation",
  },
  {
    id: 2,
    hotelId: 101,
    user: {
      name: "Emma Johnson",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "United Kingdom",
    },
    rating: 4,
    date: "May 28, 2023",
    title: "Great location, comfortable rooms",
    comment:
      "The hotel is in a prime location, walking distance to many attractions. The room was comfortable and well-appointed. The only minor issue was some noise from the street, but that's expected in a central location. Breakfast was delicious with many options.",
    helpful: 18,
    stayType: "Business trip",
  },
  {
    id: 3,
    hotelId: 101,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "Canada",
    },
    rating: 5,
    date: "April 10, 2023",
    title: "Exceptional service and amenities",
    comment:
      "From check-in to check-out, the service was impeccable. The staff went above and beyond to make our stay special. The room was luxurious and the hotel amenities, especially the spa and restaurant, were top-notch. Highly recommend for a special occasion.",
    helpful: 32,
    stayType: "Couple's getaway",
  },
]

// Rating distribution for visualization
const ratingDistribution = {
  5: 65,
  4: 25,
  3: 7,
  2: 2,
  1: 1,
}

interface HotelReviewsProps {
  hotelId: number
  rating: number
  reviewCount: number
}

export function HotelReviews({ hotelId, rating, reviewCount }: HotelReviewsProps) {
  // Filter reviews by hotel ID
  const hotelReviews = reviews.filter((review) => review.hotelId === hotelId)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">Guest Reviews</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Overall Rating */}
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Overall Rating</h4>
          <div className="text-5xl font-bold text-emerald-600 mb-2">{rating}</div>
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Based on {reviewCount} reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Rating Distribution</h4>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center mb-2">
              <div className="w-12 text-sm">{star} stars</div>
              <div className="flex-grow mx-2">
                <Progress value={ratingDistribution[star as keyof typeof ratingDistribution]} className="h-2" />
              </div>
              <div className="w-12 text-sm text-right">
                {ratingDistribution[star as keyof typeof ratingDistribution]}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {hotelReviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.user.name}</div>
                  <div className="text-sm text-gray-500">{review.user.country}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{review.date}</div>
            </div>

            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">{review.stayType}</span>
            </div>

            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-gray-600 mb-3">{review.comment}</p>

            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful ({review.helpful})</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
