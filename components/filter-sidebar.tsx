"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([50, 500])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      <Accordion type="multiple" defaultValue={["price", "rating", "amenities"]}>
        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              <Slider value={priceRange} min={0} max={1000} step={10} onValueChange={setPriceRange} />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Star Rating */}
        <AccordionItem value="rating">
          <AccordionTrigger>Star Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center">
                    {rating} {rating === 1 ? "Star" : "Stars"}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Amenities */}
        <AccordionItem value="amenities">
          <AccordionTrigger>Amenities</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                "Free WiFi",
                "Breakfast Included",
                "Swimming Pool",
                "Parking",
                "Fitness Center",
                "Restaurant",
                "Spa",
                "Pet Friendly",
              ].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox id={`amenity-${amenity.replace(/\s+/g, "-").toLowerCase()}`} />
                  <Label htmlFor={`amenity-${amenity.replace(/\s+/g, "-").toLowerCase()}`}>{amenity}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Property Type */}
        <AccordionItem value="property-type">
          <AccordionTrigger>Property Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Hotel", "Resort", "Apartment", "Villa", "Hostel", "Guest House"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type.toLowerCase()}`} />
                  <Label htmlFor={`type-${type.toLowerCase()}`}>{type}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-2">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
