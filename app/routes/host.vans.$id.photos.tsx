import { useVanDetails } from "~/routes/host.vans.$id"
import type { LoaderArgs } from "@remix-run/node"
import { requireAuth } from "~/utils.server"

export async function loader(args: LoaderArgs) {
  await requireAuth(args)
  return {}
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
