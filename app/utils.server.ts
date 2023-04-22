import { redirect } from "react-router-dom"
import { getAuth } from "@clerk/remix/ssr.server"
import type { LoaderArgs } from "@remix-run/node"

export async function requireAuth(args: LoaderArgs) {
  const { userId } = await getAuth(args)
  const pathname = new URL(args.request.url).pathname

  if (!userId) {
    throw redirect(`/sign-in?redirectTo=${pathname}`)
  }
  return userId
}
