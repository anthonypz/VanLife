import { useVanDetails } from "~/routes/host.vans.$id"

export default function HostVanPricing() {
  const { currentVan } = useVanDetails()
  return (
    <h3 className="text-2xl font-medium">
      ${currentVan.price}
      <span className="font-normal text-neutral-700 text-base">/day</span>
    </h3>
  )
}
