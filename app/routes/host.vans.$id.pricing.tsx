import { useVanDetails } from "~/routes/host.vans.$id"
import type { LoaderArgs } from "@remix-run/node"
import { requireAuth } from "~/utils.server"

export async function loader(args: LoaderArgs) {
  await requireAuth(args)
  return {}
}

export default function HostVanPricing() {
  const { currentVan } = useVanDetails()
  return (
    <h3 className="text-2xl font-medium">
      ${currentVan.price}
      <span className="font-normal text-neutral-700 text-base">/day</span>
    </h3>
  )
}
