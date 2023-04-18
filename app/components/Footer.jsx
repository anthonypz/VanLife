import { Footer } from "flowbite-react"
import { Link } from "@remix-run/react"

export default function FooterComponent() {
  return (
    <Footer container={true}>
      <Footer.Copyright
        className="py-3"
        by="VANLIFE™"
        year={2022}
      />
      <Footer.LinkGroup className="gap-2">
        {/* <Footer.Link> */}
        <li className="last:mr-0 md:mr-6">
          <Link
            className="hover:underline"
            to="/about"
          >
            About
          </Link>
        </li>
        {/* </Footer.Link> */}
        <Footer.Link href="https://github.com/anthonypz/vanLife">
          Project Source
        </Footer.Link>
        <Footer.Link href="https://github.com/anthonypz">My Github</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  )
}
