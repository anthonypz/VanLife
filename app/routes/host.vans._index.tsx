import React from "react"
import { Link, useLoaderData, Await } from "@remix-run/react"
import { defer, redirect } from "@remix-run/node"
import type { LoaderArgs } from "@remix-run/node"
import type { Van } from "~/models/van.server"
import { getHostVans } from "~/models/van.server"
import { getAuth } from "@clerk/remix/ssr.server"

export async function loader(args: LoaderArgs) {
  const { userId } = await getAuth(args)

  if (!userId) {
    throw redirect("/sign-in")
  }

  return defer({ vans: getHostVans(userId) })
}

type VanElements = Omit<Van, "createdAt" | "updatedAt">

export default function HostVans() {
  const dataPromise = useLoaderData()

  function renderVanElements(vans: VanElements[]) {
    const hostVansEls = vans.map((van) => (
      <Link
        to={van.id}
        key={van.id}
        className="host-van-link-wrapper"
      >
        <div
          className="host-van-single"
          key={van.id}
        >
          <img
            src={van.imageUrl}
            alt={`${van.name}`}
          />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ))
    return (
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    )
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <React.Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </React.Suspense>
    </section>
  )
}
