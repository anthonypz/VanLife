// export default function About() {
//   return <h1 className="text-3xl font-bold underline">Hello world!</h1>
// }

import { Tooltip, Button } from "flowbite-react"

export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <Tooltip content="Flowbite is awesome">
        <Button>Hover to find out</Button>
      </Tooltip>
    </div>
  )
}
