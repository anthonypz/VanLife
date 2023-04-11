import { Link, NavLink } from "@remix-run/react"
import loginIcon from "~/assets/images/avatar-icon.png"
import { Navbar } from "flowbite-react"

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  }

  function fakeLogOut() {
    localStorage.removeItem("loggedin")
  }

  return (
    <header>
      <Navbar
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand>
          <Link
            className="self-center whitespace-nowrap text-2xl font-black uppercase dark:text-white hover:underline"
            to="/"
          >
            #VanLife
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link>
            <NavLink
              className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base"
              to="host"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Host
            </NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <NavLink
              className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base"
              to="about"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              About
            </NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <NavLink
              className="text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base"
              to="vans"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Vans
            </NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <Link to="login">
              <img
                src={loginIcon}
                className="w-[20px] h-auto mt-[2px]"
                alt="login icon"
              />
            </Link>
          </Navbar.Link>
          <button onClick={fakeLogOut}>X</button>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
