import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const pharmacy = await prisma.pharmacy.findUnique({
      where: { id },
      include: {
        schedules: true,
      },
    })

    if (!pharmacy) {
      return NextResponse.json({ error: 'Pharmacy not found' }, { status: 404 })
    }

    return NextResponse.json(pharmacy)
  } catch (error) {
    console.error('Get pharmacy error:', error)
    return NextResponse.json({ error: 'Failed to fetch pharmacy' }, { status: 500 })
  }
}
