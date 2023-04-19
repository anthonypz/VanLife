import { useVanDetails } from "~/routes/host.vans.$id"

export default function HostVanPhotos() {
  const { currentVan } = useVanDetails()
  return (
    <img
      src={currentVan.imageUrl}
      className="host-van-detail-image"
      alt="rental van"
    />
  )
}
