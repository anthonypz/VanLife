import React from "react"
import { Link, Await, useLoaderData } from "@remix-run/react"
import { defer } from "@remix-run/node"
import type { LoaderArgs } from "@remix-run/node"
import type { Van } from "~/models/van.server"
import { getHostVans } from "~/models/van.server"
import { Rating } from "flowbite-react"
import { requireAuth } from "~/utils.server"

export async function loader(args: LoaderArgs) {
  const userId = await requireAuth(args)

  return defer({ vans: getHostVans(userId) })
}

type VanElements = Omit<Van, "createdAt" | "updatedAt">

export default function Dashboard() {
  const loaderData = useLoaderData<typeof loader>()

  function renderVanElements(vans: VanElements[]) {
    const hostVansEls = vans.map((van) => (
      <div
        className="flex items-center bg-white mb-4 py-4 px-6 border border-orange-200 rounded"
        key={van.id}
      >
        <img
          src={van.imageUrl}
          alt={`${van.name}`}
          className="rounded h-20 mr-4"
        />
        <div className="mr-auto">
          <h3 className="text-xl font-semibold my-2">{van.name}</h3>
          <p className="">${van.price}/day</p>
        </div>
        <Link
          to={`vans/${van.id}`}
          className="p-2"
        >
          View
        </Link>
      </div>
    ))

    return (
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    )
  }

  return (
    <>
      <section className="flex justify-between items-center flex-wrap p-8 bg-[#ffead0]">
        <div className="">
          <h1 className="text-4xl font-bold">Welcome!</h1>
          <p className="text-neutral-700 my-4">
            Income last{" "}
            <span className="text-neutral-700 font-bold underline">
              30 days
            </span>
          </p>
          <h2 className="text-4xl font-black">$2,260</h2>
        </div>
        <Link
          to="income"
          className="p-2 hover:underline"
        >
          Details
        </Link>
      </section>
      <section className="flex flex-wrap items-center p-8 bg-[#ffddb2]">
        <h2 className="text-2xl font-bold">Review score</h2>
        <Rating className="mr-auto">
          <Rating.Star className="ml-3 w-8 h-8" />
          <p className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            5
          </p>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <Link
            to="reviews"
            className="text-base font-medium text-gray-900 underline hover:no-underline dark:text-white"
          >
            2 reviews
          </Link>
        </Rating>
        <Link
          to="reviews"
          className="p-2 hover:underline"
        >
          Details
        </Link>
      </section>
      <section className="p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold my-4">Your listed vans</h2>
          <Link
            to="vans"
            className="p-2 hover:underline"
          >
            View all
          </Link>
        </div>
        <React.Suspense fallback={<h3>Loading...</h3>}>
          <Await resolve={loaderData.vans}>{renderVanElements}</Await>
        </React.Suspense>
      </section>
    </>
  )
}
