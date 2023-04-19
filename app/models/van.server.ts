import { prisma } from "~/db.server"
import type { Van } from "@prisma/client"

export type { Van }

export async function getAllVans() {
  return prisma.van.findMany()
}

export async function getVan(id: string) {
  return prisma.van.findUnique({
    where: {
      id,
    },
  })
}

export async function getHostVans(id: string) {
  return prisma.van.findMany({
    where: {
      hostId: id,
    },
  })
}
