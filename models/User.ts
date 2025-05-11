import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  bookings: Booking[]
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  hotelId: ObjectId
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  paymentStatus: 'pending' | 'completed' | 'failed'
  createdAt: Date
} 