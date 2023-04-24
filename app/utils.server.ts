import { redirect } from "react-router-dom"
import { getAuth } from "@clerk/remix/ssr.server"
import type { LoaderArgs } from "@remix-run/node"
import { createClerkClient } from "@clerk/remix/api.server"

export async function requireAuth(args: LoaderArgs) {
  const { userId } = await getAuth(args)
  const pathname = new URL(args.request.url).pathname

  if (!userId) {
    throw redirect(`/sign-in?redirectTo=${pathname}`)
  }
  return userId
}

export async function getUsername(userId: string) {
  const { username } = await createClerkClient({
    apiKey: process.env.CLERK_SECRET_KEY,
  }).users.getUser(userId)
  return username
}
