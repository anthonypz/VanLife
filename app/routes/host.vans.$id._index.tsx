import { useVanDetails } from "~/routes/host.vans.$id"
import type { LoaderArgs } from "@remix-run/node"
import { requireAuth } from "~/utils.server"
import { Link } from "@remix-run/react"

export async function loader(args: LoaderArgs) {
  await requireAuth(args)
  return {}
}

export default function HostVanInfo() {
  const { currentVan } = useVanDetails()

  return (
    <section className="flex flex-col">
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
      <Link
        to="edit"
        className="self-end mt-2 text-white bg-[#ff8c38] hover:bg-[#ff8c38]/80 focus:ring-4 focus:outline-none focus:ring-[#ff8c38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  dark:hover:bg-[#ff8c38]/80 dark:focus:ring-[#ff8c38]/40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2 -ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Edit van
      </Link>
    </section>
  )
}
