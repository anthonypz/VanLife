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

export default function HostVanPricing() {
  const { currentVan } = useVanDetails()
  return (
    <h3 className="text-2xl font-medium">
      ${currentVan.price}
      <span className="font-normal text-neutral-700 text-base">/day</span>
    </h3>
  )
}
