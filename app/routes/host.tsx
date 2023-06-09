import { NavLink, Outlet } from "@remix-run/react"

export default function HostLayout() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  }

  return (
    <div className="container mx-auto px-2 sm:px-6 py-8 max-w-5xl">
      <nav className="flex mb-8 flex-wrap">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          className="py-2 px-5 text-neutral-700 font-medium"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          className="py-2 px-5 text-neutral-700 font-medium"
        >
          Income
        </NavLink>

        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          className="py-2 px-5 text-neutral-700 font-medium"
        >
          Vans
        </NavLink>

        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          className="py-2 px-5 text-neutral-700 font-medium"
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
