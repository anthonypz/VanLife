import { Link, NavLink } from "@remix-run/react"
import loginIcon from "~/assets/images/avatar-icon.png"
import { Navbar } from "flowbite-react"

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  }

  return (
    <header>
      <Navbar
        fluid={true}
        rounded={true}
      >
        {/* <Navbar.Brand> */}
        <Link
          className="self-center whitespace-nowrap text-2xl font-black uppercase dark:text-white hover:underline"
          to="/"
        >
          #VanLife
        </Link>
        {/* </Navbar.Brand> */}
        <Navbar.Toggle />
        <Navbar.Collapse>
          {/* <Navbar.Link> */}
          <NavLink
            className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50"
            to="host"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Host
          </NavLink>
          {/* </Navbar.Link> */}
          {/* <Navbar.Link> */}
          <NavLink
            className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50"
            to="about"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            About
          </NavLink>
          {/* </Navbar.Link> */}
          {/* <Navbar.Link> */}
          <NavLink
            className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50"
            to="vans"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Vans
          </NavLink>
          {/* </Navbar.Link> */}
          {/* <Navbar.Link> */}
          <Link
            className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50"
            to="login"
          >
            <img
              src={loginIcon}
              className="w-[20px] h-auto mt-[2px]"
              alt="login icon"
            />
          </Link>
          {/* </Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
