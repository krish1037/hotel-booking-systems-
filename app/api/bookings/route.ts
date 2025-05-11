import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('hotel_management')
    const booking = await request.json()
    
    // Validate required fields
    if (!booking.hotelId || !booking.checkIn || !booking.checkOut || !booking.guests) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      )
    }

    if (!booking.guestInfo?.firstName || !booking.guestInfo?.lastName || !booking.guestInfo?.email || !booking.guestInfo?.phone) {
      return NextResponse.json(
        { error: 'Missing required guest information' },
        { status: 400 }
      )
    }

    if (!booking.paymentInfo?.method) {
      return NextResponse.json(
        { error: 'Missing payment method' },
        { status: 400 }
      )
    }

    if (!booking.billingAddress?.address || !booking.billingAddress?.city || !booking.billingAddress?.state || !booking.billingAddress?.zip) {
      return NextResponse.json(
        { error: 'Missing required billing address information' },
        { status: 400 }
      )
    }

    // Check if hotel exists
    const hotel = await db.collection('hotels').findOne({ _id: new ObjectId(booking.hotelId) })
    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      )
    }

    // Check if room is available
    if (booking.roomId) {
      const room = await db.collection('rooms').findOne({
        _id: new ObjectId(booking.roomId),
        hotelId: new ObjectId(booking.hotelId)
      })

      if (!room) {
        return NextResponse.json(
          { error: 'Room not found' },
          { status: 404 }
        )
      }

      if (room.available < booking.guests) {
        return NextResponse.json(
          { error: 'Room is not available for the requested number of guests' },
          { status: 400 }
        )
      }
    }

    // Create a new booking
    const result = await db.collection('bookings').insertOne({
      hotelId: new ObjectId(booking.hotelId),
      roomId: booking.roomId ? new ObjectId(booking.roomId) : null,
      checkIn: new Date(booking.checkIn),
      checkOut: new Date(booking.checkOut),
      guests: parseInt(booking.guests),
      guestInfo: booking.guestInfo,
      paymentInfo: {
        method: booking.paymentInfo.method,
        // Don't store sensitive payment information
        cardNumber: booking.paymentInfo.cardNumber ? '****' + booking.paymentInfo.cardNumber.slice(-4) : null,
        nameOnCard: booking.paymentInfo.nameOnCard
      },
      billingAddress: booking.billingAddress,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date()
    })
    
    // Update room availability if room was specified
    if (booking.roomId) {
      await db.collection('rooms').updateOne(
        { _id: new ObjectId(booking.roomId) },
        { $inc: { available: -booking.guests } }
      )
    }
    
    return NextResponse.json({ 
      id: result.insertedId,
      message: 'Booking created successfully'
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    const client = await clientPromise
    const db = client.db('hotel_management')
    
    const bookings = await db.collection('bookings')
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray()
    
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
} 