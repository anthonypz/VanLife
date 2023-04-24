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

export async function createHostVan({
  name,
  price,
  description,
  imageUrl,
  type,
  hostId,
}: Omit<Van, "createdAt" | "updatedAt" | "id">) {
  return prisma.van.create({
    data: {
      name,
      price,
      description,
      imageUrl,
      type,
      hostId,
    },
  })
}

export async function updateHostVan({
  id,
  name,
  price,
  description,
  imageUrl,
  type,
}: Omit<Van, "createdAt" | "updatedAt" | "hostId">) {
  return prisma.van.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      description,
      imageUrl,
      type,
    },
  })
}

export async function deleteHostVan(id: string) {
  return prisma.van.delete({
    where: {
      id,
    },
  })
}
