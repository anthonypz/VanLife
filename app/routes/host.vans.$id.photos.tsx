import { useVanDetails } from "~/routes/host.vans.$id"

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
