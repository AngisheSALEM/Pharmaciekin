import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { isOnDuty } = await request.json()

  try {
    const pharmacy = await prisma.pharmacy.update({
      where: { id },
      data: { isOnDuty },
    })

    return NextResponse.json(pharmacy)
  } catch (error) {
    console.error('Update status error:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
