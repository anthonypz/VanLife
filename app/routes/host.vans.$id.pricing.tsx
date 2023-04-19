import { useVanDetails } from "~/routes/host.vans.$id"

export default function HostVanPricing() {
  const { currentVan } = useVanDetails()
  return (
    <h3 className="host-van-price">
      ${currentVan.price}
      <span>/day</span>
    </h3>
  )
}
