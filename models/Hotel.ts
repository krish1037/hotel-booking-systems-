import { ObjectId } from 'mongodb'

export interface Hotel {
  _id?: ObjectId
  name: string
  location: string
  description: string
  price: number
  rating: number
  image: string
  images: string[]
  amenities: string[]
  rooms: Room[]
  reviews: Review[]
  createdAt: Date
  updatedAt: Date
}

export interface Room {
  type: string
  price: number
  capacity: number
  available: number
  amenities: string[]
}

export interface Review {
  userId: ObjectId
  rating: number
  comment: string
  createdAt: Date
} 