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
    <div className="van-detail-container">
      <Link
        to={`..${search}`}
        relative="path"
        className="back-button"
      >
        &larr; <span>Back to {type} vans</span>
      </Link>

      <div className="van-detail">
        <img
          src={van.imageUrl}
          alt="travel van"
        />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  )
}
