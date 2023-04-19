import React from "react"
import { Link, Await, useLoaderData } from "@remix-run/react"
import { defer, redirect } from "@remix-run/node"
import type { LoaderArgs } from "@remix-run/node"
import type { Van } from "~/models/van.server"
import { getHostVans } from "~/models/van.server"
import { getAuth } from "@clerk/remix/ssr.server"
import { Rating } from "flowbite-react"

export async function loader(args: LoaderArgs) {
  const { userId } = await getAuth(args)

  if (!userId) {
    throw redirect("/sign-in")
  }

  return defer({ vans: getHostVans(userId) })
}

type VanElements = Omit<Van, "createdAt" | "updatedAt">

export default function Dashboard() {
  const loaderData = useLoaderData<typeof loader>()

  function renderVanElements(vans: VanElements[]) {
    const hostVansEls = vans.map((van) => (
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
        <Link to={`vans/${van.id}`}>View</Link>
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
      <section className="host-dashboard-earnings">
        <div className="info">
          <h1>Welcome!</h1>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to="income">Details</Link>
      </section>
      <section className="host-dashboard-reviews">
        <h2>Review score</h2>
        <Rating>
          <Rating.Star />
          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            4.95
          </p>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <Link
            to="reviews"
            className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
          >
            73 reviews
          </Link>
        </Rating>
        <Link to="reviews">Details</Link>
      </section>
      <section className="host-dashboard-vans">
        <div className="top">
          <h2>Your listed vans</h2>
          <Link to="vans">View all</Link>
        </div>
        <React.Suspense fallback={<h3>Loading...</h3>}>
          <Await resolve={loaderData.vans}>{renderVanElements}</Await>
        </React.Suspense>
      </section>
    </>
  )
}
