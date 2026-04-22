import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { pharmacyId, type, comment } = await request.json()

  try {
    const report = await prisma.report.create({
      data: {
        pharmacyId,
        type,
        comment,
      },
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error('Create report error:', error)
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 })
  }
}
