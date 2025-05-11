"use client"
import React from 'react'
import Image from 'next/image'
import { SearchBox } from "@/components/search-box"
import { FeaturedHotels } from "@/components/featured-hotels"
import { PopularDestinations } from "@/components/popular-destinations"
import { HotelOffers } from "@/components/hotel-offers"
import { HotelCard } from "@/components/hotel-card"

const featuredHotels = [
  {
    name: "Luxury Resort & Spa",
    location: "Maldives",
    price: 450,
    rating: 4.8,
    image: "/images/hotel1.jpg",
    description: "Experience ultimate luxury in our beachfront resort with private pools and world-class spa services."
  },
  {
    name: "Mountain View Lodge",
    location: "Swiss Alps",
    price: 320,
    rating: 4.6,
    image: "/images/hotel2.jpg",
    description: "Cozy mountain retreat with stunning views and premium amenities for the perfect winter getaway."
  },
  {
    name: "Urban Boutique Hotel",
    location: "New York City",
    price: 280,
    rating: 4.5,
    image: "/images/hotel3.jpg",
    description: "Modern boutique hotel in the heart of Manhattan, offering luxury accommodations and city views."
  }
]

const cityImages = [
  { src: "/images/hotel1.jpg", alt: "Maldives" },
  { src: "/images/hotel2.jpg", alt: "Swiss Alps" },
  { src: "/images/hotel3.jpg", alt: "New York City" },
]

const destinations = [
  { name: "New York", country: "United States", hotels: 1243, image: "new-york.jpg" },
  { name: "Paris", country: "France", hotels: 986, image: "paris.jpg" },
  { name: "Tokyo", country: "Japan", hotels: 1567, image: "tokyo.jpg" },
  { name: "Dubai", country: "UAE", hotels: 1100, image: "dubai.jpg" },
  { name: "London", country: "United Kingdom", hotels: 900, image: "london.jpg" },
  { name: "Sydney", country: "Australia", hotels: 800, image: "sydney.jpg" },
]

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Next.js Image background */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Luxury Hotel Background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Stay</h1>
            <p className="text-xl text-white/90">Search hotels and accommodations across the world</p>
          </div>
          <SearchBox />
          {/* Decorative city images below the search box */}
          <div className="flex justify-center gap-6 mt-8">
            {cityImages.map((img, idx) => (
              <div key={idx} className="w-32 h-20 rounded-lg overflow-hidden shadow-lg border-2 border-white">
                <Image src={img.src} alt={img.alt} width={128} height={80} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel, index) => (
              <HotelCard key={index} {...hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Destinations</h2>
          <PopularDestinations />
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Special Offers</h2>
          <HotelOffers />
        </div>
      </section>
    </main>
  )
} 