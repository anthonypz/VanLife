import { useVanDetails } from "~/routes/host.vans.$id"

export default function HostVanInfo() {
  const { currentVan } = useVanDetails()

  return (
    <section className="">
      <h4 className="font-bold text-sm">
        Name:{" "}
        <span className="font-normal text-neutral-700 text-sm">
          {currentVan.name}
        </span>
      </h4>
      <h4 className="font-bold text-sm mt-3">
        Category:{" "}
        <span className="font-medium text-neutral-600 text-sm">
          {currentVan.type}
        </span>
      </h4>
      <h4 className="font-bold text-sm mt-3">
        Description:{" "}
        <span className="font-medium text-neutral-600 text-sm">
          {currentVan.description}
        </span>
      </h4>
      <h4 className="font-bold text-sm mt-3">
        Visibility:{" "}
        <span className="font-medium text-neutral-600 text-sm">Public</span>
      </h4>
    </section>
  )
}
