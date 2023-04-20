import { Link, useLocation, useLoaderData } from "@remix-run/react"
import { getVan } from "~/models/van.server"
import type { LoaderArgs } from "@remix-run/node"
import invariant from "tiny-invariant"

export async function loader({ params }: LoaderArgs) {
  invariant(params.id, `params.id is required`)
  const van = await getVan(params.id)
  invariant(van, `Van not found: ${params.id}`)
  return van
}

export default function VanDetail() {
  const location = useLocation()
  const van = useLoaderData<typeof loader>()

  const search = location.state?.search || ""
  const type = location.state?.type || "all"

  return (
    <div className="container mx-auto max-w-4xl px-2 sm:px-6 py-8">
      <Link
        to={`..${search}`}
        relative="path"
        className=""
      >
        &larr; <span className="underline text-lg">Back to {type} vans</span>
      </Link>

      <div className="mt-4 container mx-auto">
        <img
          src={van.imageUrl}
          alt="travel van"
          className="rounded"
        />
        <button
          className={`py-2 px-7 rounded mr-5 font-medium mt-2 van-type ${van.type} selected`}
        >
          {van.type}
        </button>
        <h2 className="font-bold my-5 text-3xl text-gray-900">{van.name}</h2>
        <p className="text-lg">
          <span className="font-bold my-3 text-2xl text-gray-900">
            ${van.price}
          </span>
          /day
        </p>
        <p className="mt-4 text-neutral-700">{van.description}</p>
        <button className="text-white bg-[#ff8c38] text-lg font-semibold w-full rounded py-2 mt-3">
          Rent this van
        </button>
      </div>
    </div>
  )
}
