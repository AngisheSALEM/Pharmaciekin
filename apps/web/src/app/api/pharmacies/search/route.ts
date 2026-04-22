import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lng = parseFloat(searchParams.get('lng') || '0')
  const radius = parseFloat(searchParams.get('radius') || '5000') // in meters

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 })
  }

  try {
    // PostGIS query to find pharmacies within radius
    // ST_DWithin(location, ST_SetSRID(ST_MakePoint(lng, lat), 4326), radius)
    const pharmacies = await prisma.$queryRaw`
      SELECT id, name, address, phone, latitude, longitude, "is24h", "isOnDuty",
      ST_Distance(
        location,
        ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography
      ) as distance
      FROM "Pharmacy"
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
        ${radius}
      )
      ORDER BY distance ASC
    `

    return NextResponse.json(pharmacies)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Failed to search pharmacies' }, { status: 500 })
  }
}
