import { Wifi, Coffee, Utensils, Car, Dumbbell, Waves, Briefcase, Clock, Plane, Shirt, Users, Ban } from "lucide-react"

interface HotelAmenitiesProps {
  amenities: string[]
}

// Helper function to get icon for amenity
const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "Free WiFi":
      return <Wifi className="h-5 w-5" />
    case "Breakfast":
    case "Breakfast Included":
      return <Coffee className="h-5 w-5" />
    case "Restaurant":
      return <Utensils className="h-5 w-5" />
    case "Parking":
      return <Car className="h-5 w-5" />
    case "Fitness Center":
      return <Dumbbell className="h-5 w-5" />
    case "Swimming Pool":
      return <Waves className="h-5 w-5" />
    case "Business Center":
      return <Briefcase className="h-5 w-5" />
    case "24-hour Front Desk":
      return <Clock className="h-5 w-5" />
    case "Airport Shuttle":
      return <Plane className="h-5 w-5" />
    case "Laundry":
      return <Shirt className="h-5 w-5" />
    case "Concierge Service":
      return <Users className="h-5 w-5" />
    default:
      return <Ban className="h-5 w-5" />
  }
}

export function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  // Group amenities by category
  const categories = {
    "Internet & Entertainment": ["Free WiFi", "Flat-screen TV"],
    "Food & Drink": ["Breakfast Included", "Restaurant", "Bar", "Minibar", "Room Service"],
    "Wellness & Recreation": ["Fitness Center", "Spa", "Swimming Pool"],
    Services: ["Concierge Service", "24-hour Front Desk", "Airport Shuttle", "Laundry", "Business Center"],
    "Parking & Transportation": ["Parking", "Airport Shuttle"],
    "Room Features": ["Air Conditioning", "Minibar", "Safe", "Bathtub"],
  }

  // Create a map of amenities for quick lookup
  const amenitySet = new Set(amenities)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">Hotel Amenities</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(categories).map(([category, categoryAmenities]) => {
          // Filter amenities that exist in this hotel
          const availableAmenities = categoryAmenities.filter((amenity) => amenitySet.has(amenity))

          if (availableAmenities.length === 0) return null

          return (
            <div key={category}>
              <h4 className="font-semibold text-lg mb-4">{category}</h4>
              <ul className="space-y-3">
                {availableAmenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    <div className="text-emerald-600">{getAmenityIcon(amenity)}</div>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
