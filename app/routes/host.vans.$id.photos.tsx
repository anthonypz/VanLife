import { useVanDetails } from "~/routes/host.vans.$id"
import { redirect } from "@remix-run/node"
import type { LoaderArgs } from "@remix-run/node"
import { getAuth } from "@clerk/remix/ssr.server"

export async function loader(args: LoaderArgs) {
  const { userId } = await getAuth(args)

  if (!userId) {
    throw redirect("/sign-in")
  }
}

export default function HostVanPhotos() {
  const { currentVan } = useVanDetails()
  return (
    <img
      src={currentVan.imageUrl}
      className="h-24 rounded"
      alt="rental van"
    />
  )
}
