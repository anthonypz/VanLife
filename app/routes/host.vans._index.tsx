import React from "react"
import { Link, useLoaderData, Await } from "@remix-run/react"
import { defer } from "@remix-run/node"
import type { LoaderArgs } from "@remix-run/node"
import type { Van } from "~/models/van.server"
import { getHostVans } from "~/models/van.server"
import { requireAuth } from "~/utils.server"

export async function loader(args: LoaderArgs) {
  const userId = await requireAuth(args)

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
        className=""
      >
        <div
          className="flex items-center bg-white mb-4 py-4 px-6 border border-orange-200 rounded"
          key={van.id}
        >
          <img
            src={van.imageUrl}
            alt={`${van.name}`}
            className="rounded h-20 mr-4"
          />
          <div className="host-van-info">
            <h3 className="text-xl font-semibold my-2">{van.name}</h3>
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
      <h1 className="font-bold text-3xl mb-8">Your listed vans</h1>
      <React.Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </React.Suspense>
    </section>
  )
}
