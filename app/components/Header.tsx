import { Link, NavLink } from "@remix-run/react"
import { Navbar } from "flowbite-react"
import { useAuth, UserButton } from "@clerk/remix"

export default function Header() {
  const { userId } = useAuth()

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
            className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50 md:self-center"
            to="host"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Host
          </NavLink>
          {/* </Navbar.Link> */}
          {/* <Navbar.Link> */}
          <NavLink
            className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50 md:self-center"
            to="about"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            About
          </NavLink>
          {/* </Navbar.Link> */}
          {/* <Navbar.Link> */}
          <NavLink
            className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50 md:self-center"
            to="vans"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Vans
          </NavLink>
          {/* </Navbar.Link> */}
          {/* <Navbar.Link> */}
          {/* <Link
            className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50"
            to="login"
          >
            <img
              src={loginIcon}
              className="w-[20px] h-auto mt-[2px]"
              alt="login icon"
            />
          </Link> */}
          {userId ? (
            <div className="md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50 align-top">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <>
              <NavLink
                className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50 md:self-center"
                to="/sign-in"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Sign in
              </NavLink>
              <NavLink
                className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base md:border-0 md:hover:bg-transparent block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50 md:self-center"
                to="/sign-up"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Sign up
              </NavLink>
            </>
          )}
          {/* </Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
