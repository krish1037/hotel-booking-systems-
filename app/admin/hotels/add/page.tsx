"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"

declare module 'next/navigation';

interface FormData {
  name: string
  location: string
  description: string
  price: string
  rating: string
  image: string
  tags: string
}

export default function AddHotelPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    description: "",
    price: "",
    rating: "0",
    image: "/placeholder.svg",
    tags: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Hotel name is required"
    if (!formData.location.trim()) return "Location is required"
    if (!formData.price || Number(formData.price) <= 0) return "Valid price is required"
    if (Number(formData.rating) < 0 || Number(formData.rating) > 5) return "Rating must be between 0 and 5"
    return null
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate form
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    try {
      // Convert price and rating to numbers
      const hotelData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        rating: Number.parseFloat(formData.rating),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }

      const response = await fetch("/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to add hotel")
      }

      // Redirect to the hotels list page
      router.push("/admin/hotels")
      router.refresh()
    } catch (err) {
      console.error("Error adding hotel:", err)
      setError(err instanceof Error ? err.message : "Failed to add hotel")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Hotel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Hotel Information</CardTitle>
            <CardDescription>Enter the details for the new hotel listing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Hotel Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Night ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Luxury, Beach Front, Spa"
                />
              </div>

              {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                {loading ? "Adding Hotel..." : "Add Hotel"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <ImageUpload onUploadComplete={handleImageUpload} />

          <Card>
            <CardHeader>
              <CardTitle>Tips for Adding Hotels</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use high-quality images that showcase the hotel&apos;s best features</li>
                <li>• Provide accurate and detailed descriptions</li>
                <li>• Include all amenities and special features in the tags</li>
                <li>• Set competitive pricing based on location and amenities</li>
                <li>• Be honest about the hotel&apos;s rating and features</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 