import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Gombe
  const pharmacy1 = await prisma.pharmacy.create({
    data: {
      name: "Pharmacie du Centre",
      address: "Avenue du Commerce, Gombe",
      phone: "+243 81 000 0001",
      latitude: -4.310,
      longitude: 15.305,
      is24h: true,
      isOnDuty: true,
    },
  })

  // Limete
  const pharmacy2 = await prisma.pharmacy.create({
    data: {
      name: "Pharmacie de Limete",
      address: "7ème Rue, Limete",
      phone: "+243 81 000 0002",
      latitude: -4.350,
      longitude: 15.330,
      is24h: false,
      isOnDuty: false,
    },
  })

  // Bandal
  const pharmacy3 = await prisma.pharmacy.create({
    data: {
      name: "Pharmacie Bandal",
      address: "Avenue Kasavubu, Bandalungwa",
      phone: "+243 81 000 0003",
      latitude: -4.335,
      longitude: 15.285,
      is24h: true,
      isOnDuty: false,
    },
  })

  // Set location using raw SQL because Prisma doesn't support PostGIS Point natively in create
  await prisma.$executeRawUnsafe(`
    UPDATE "Pharmacy"
    SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
  `)

  console.log('Seed data created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
