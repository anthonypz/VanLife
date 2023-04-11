import { Footer } from "flowbite-react"
import { Link } from "@remix-run/react"

export default function FooterComponent() {
  return (
    <Footer container={true}>
      <Footer.Copyright
        href="#"
        by="VANLIFE™"
        year={2022}
      />
      <Footer.LinkGroup className="gap-2">
        <Footer.Link>
          <Link to="/about">About</Link>
        </Footer.Link>
        <Footer.Link href="https://github.com/anthonypz/vanLife">
          Project Source
        </Footer.Link>
        <Footer.Link href="https://github.com/anthonypz">My Github</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  )
}
