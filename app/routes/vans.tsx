import React from "react"
import { Link, useSearchParams, useLoaderData, Await } from "@remix-run/react"
import { defer } from "@remix-run/node"
import { getAllVans } from "~/models/van.server"
import type { Van } from "~/models/van.server"

export function loader() {
  return defer({ vans: getAllVans() })
}

type VanElements = Omit<Van, "createdAt" | "updatedAt">

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams()
  const dataPromise = useLoaderData<typeof loader>()

  const typeFilter = searchParams.get("type")

  function handleFilterChange(key: string, value: string | null) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

  function renderVanElements(vans: VanElements[]) {
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type === typeFilter)
      : vans

    const vanElements = displayedVans.map((van) => (
      <div
        key={van.id}
        className="van-tile"
      >
        <Link
          to={van.id}
          state={{
            search: `?${searchParams.toString()}`,
            type: typeFilter,
          }}
        >
          <img
            src={van.imageUrl}
            alt="travel van"
          />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ))

    return (
      <>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => handleFilterChange("type", "simple")}
            className="py-2 px-7 rounded bg-[#ffead0] text-gray-700 mr-5 hover:bg-[#e17654] hover:text-[#ffead0] focus:bg-[#e17654] focus:text-[#ffead0] font-medium"
          >
            Simple
          </button>
          <button
            onClick={() => handleFilterChange("type", "luxury")}
            className="py-2 px-7 rounded bg-[#ffead0] text-gray-700 mr-5 hover:bg-[#161616] hover:text-[#ffead0] focus:bg-[#161616] focus:text-[#ffead0] font-medium"
          >
            Luxury
          </button>
          <button
            onClick={() => handleFilterChange("type", "rugged")}
            className="py-2 px-7 rounded bg-[#ffead0] text-gray-700 mr-5 hover:bg-[#115e59] hover:text-[#ffead0] focus:bg-[#115e59] focus:text-[#ffead0] font-medium"
          >
            Rugged
          </button>

          {typeFilter ? (
            <button
              onClick={() => handleFilterChange("type", null)}
              className="py-2 px-7 pl-0 rounded text-gray-600 underline mr-5 font-medium"
            >
              Clear filter
            </button>
          ) : null}
        </div>
        <div className="mt-12 grid grid-cols-2 justify-items-center gap-8">
          {vanElements}
        </div>
      </>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-6 py-8">
      <h1 className="text-3xl text-gray-900 font-bold my-5">
        Explore our van options
      </h1>
      <React.Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </React.Suspense>
    </div>
  )
}
