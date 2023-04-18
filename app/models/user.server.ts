import { prisma } from "~/db.server"
import type { User } from "@prisma/client"

export type { User }

export async function createUser(id: string) {
  return prisma.user.create({
    data: {
      id,
    },
  })
}
