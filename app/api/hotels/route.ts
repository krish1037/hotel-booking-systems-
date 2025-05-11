import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('hotel_management')
    const hotels = await db.collection('hotels').find({}).toArray()
    return NextResponse.json(hotels)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('hotel_management')
    const hotel = await request.json()
    
    const result = await db.collection('hotels').insertOne({
      ...hotel,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create hotel' }, { status: 500 })
  }
} 