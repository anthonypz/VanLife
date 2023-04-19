import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import stylesheet from "~/tailwind.css"
import type { LinksFunction, LoaderFunction } from "@remix-run/node"
import { rootAuthLoader } from "@clerk/remix/ssr.server"
import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
]

export const loader: LoaderFunction = (args) => rootAuthLoader(args)

export const CatchBoundary = ClerkCatchBoundary()

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  )
}

export default ClerkApp(App)
