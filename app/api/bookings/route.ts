import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('hotel_management')
    const booking = await request.json()
    
    // Create a new booking
    const result = await db.collection('bookings').insertOne({
      ...booking,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date()
    })
    
    // Update hotel availability
    await db.collection('hotels').updateOne(
      { _id: new ObjectId(booking.hotelId) },
      { $inc: { 'rooms.0.available': -booking.guests } }
    )
    
    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    const client = await clientPromise
    const db = client.db('hotel_management')
    
    const bookings = await db.collection('bookings')
      .find({ userId: new ObjectId(userId) })
      .toArray()
    
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
} 