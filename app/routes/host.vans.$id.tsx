import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react"
import type { LoaderArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import type { Van } from "~/models/van.server"
import { getVan } from "~/models/van.server"
import invariant from "tiny-invariant"
import { requireAuth } from "~/utils.server"

export async function loader(args: LoaderArgs) {
  const clerkHostId = await requireAuth(args)
  invariant(args.params.id, `params.id is required`)
  const id = args.params.id
  const van = await getVan(id)

  if (van?.hostId !== clerkHostId) {
    throw redirect("/host")
  }

  return van
}

type VanElement = Omit<Van, "createdAt" | "updatedAt">
type ContextType = { currentVan: VanElement }

export default function HostVanDetail() {
  const currentVan: VanElement = useLoaderData()

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  }

  return (
    <section className="">
      <Link
        to=".."
        relative="path"
        className="p-2"
      >
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="p-6 mt-4 border border-orange-200 rounded">
        <div className="flex items-center">
          <img
            src={currentVan.imageUrl}
            alt="rental van"
            className="h-40 rounded mr-5"
          />
          <div className="host-van-detail-info-text">
            <button
              className={`py-1 px-3 rounded font-medium van-type ${currentVan.type}`}
            >
              {currentVan.type}
            </button>
            <h3 className="font-bold mt-4 text-2xl">{currentVan.name}</h3>
            <h4 className="font-bold mt-2 text-xl">${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className="flex flex-wrap my-6">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
            className="-ml-5 py-2 px-5 text-neutral-700 font-medium"
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
            className="py-2 px-5 text-neutral-700 font-medium"
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
            className="py-2 px-5 text-neutral-700 font-medium"
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    </section>
  )
}

export function useVanDetails() {
  return useOutletContext<ContextType>()
}
