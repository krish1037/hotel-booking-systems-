import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('hotel_management')
    const { bookingId, amount, paymentMethod } = await request.json()
    
    // Create payment record
    const payment = await db.collection('payments').insertOne({
      bookingId: new ObjectId(bookingId),
      amount,
      paymentMethod,
      status: 'completed',
      createdAt: new Date()
    })
    
    // Update booking status
    await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId) },
      { 
        $set: { 
          paymentStatus: 'completed',
          status: 'confirmed'
        }
      }
    )
    
    return NextResponse.json({ id: payment.insertedId })
  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
} 