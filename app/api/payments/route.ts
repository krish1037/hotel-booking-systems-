import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('hotel_management')
    const { bookingId, amount, paymentMethod } = await request.json()
    
    // Validate required fields
    if (!bookingId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required payment information' },
        { status: 400 }
      )
    }

    // Check if booking exists and is pending
    const booking = await db.collection('bookings').findOne({
      _id: new ObjectId(bookingId),
      status: 'pending',
      paymentStatus: 'pending'
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found or already processed' },
        { status: 404 }
      )
    }

    // In a real implementation, you would:
    // 1. Process the payment through a payment gateway (e.g., Stripe)
    // 2. Handle different payment methods
    // 3. Implement proper error handling for failed payments
    
    // For demonstration, we'll simulate a successful payment
    const payment = await db.collection('payments').insertOne({
      bookingId: new ObjectId(bookingId),
      amount: parseFloat(amount),
      paymentMethod,
      status: 'completed',
      transactionId: `TXN${Date.now()}`,
      createdAt: new Date()
    })
    
    // Update booking status
    await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId) },
      { 
        $set: { 
          paymentStatus: 'completed',
          status: 'confirmed',
          paymentId: payment.insertedId
        }
      }
    )
    
    return NextResponse.json({ 
      id: payment.insertedId,
      message: 'Payment processed successfully'
    })
  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json(
      { error: 'Payment failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('bookingId')
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      )
    }
    
    const client = await clientPromise
    const db = client.db('hotel_management')
    
    const payment = await db.collection('payments').findOne({
      bookingId: new ObjectId(bookingId)
    })
    
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(payment)
  } catch (error) {
    console.error('Error fetching payment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment' },
      { status: 500 }
    )
  }
} 