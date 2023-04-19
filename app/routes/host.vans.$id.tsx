import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react"
import { redirect } from "@remix-run/node"
import type { LoaderArgs } from "@remix-run/node"
import type { Van } from "~/models/van.server"
import { getVan } from "~/models/van.server"
import { getAuth } from "@clerk/remix/ssr.server"
import invariant from "tiny-invariant"

export async function loader(args: LoaderArgs) {
  const { userId } = await getAuth(args)
  invariant(args.params.id, `params.id is required`)
  const id = args.params.id

  if (!userId) {
    throw redirect("/sign-in")
  }
  return await getVan(id)
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
    <section>
      <Link
        to=".."
        relative="path"
        className="back-button"
      >
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img
            src={currentVan.imageUrl}
            alt="rental van"
          />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
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
