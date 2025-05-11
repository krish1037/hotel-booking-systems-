import { SearchBox } from "@/components/search-box"
import { HotelList } from "@/components/hotel-list"
import { FilterSidebar } from "@/components/filter-sidebar"

export default function SearchPage({
  searchParams,
}) {
  // Get search parameters from URL
  const location = typeof searchParams.location === "string" ? searchParams.location : ""
  const checkIn = typeof searchParams.checkIn === "string" ? searchParams.checkIn : ""
  const checkOut = typeof searchParams.checkOut === "string" ? searchParams.checkOut : ""
  const guests = typeof searchParams.guests === "string" ? searchParams.guests : "2"

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="bg-emerald-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-4">
            {location ? `Hotels in ${location}` : "Search Results"}
          </h1>
          <SearchBox />
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <FilterSidebar />
          </div>

          {/* Hotel Listings */}
          <div className="w-full lg:w-3/4">
            <HotelList location={location} checkIn={checkIn} checkOut={checkOut} guests={guests} />
          </div>
        </div>
      </section>
    </main>
  )
}
