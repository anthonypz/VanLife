import { SignIn } from "@clerk/remix"
import type { LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export function loader({ request }: LoaderArgs) {
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host"
  return pathname
}

export default function SignInPage() {
  const path = useLoaderData<typeof loader>()
  return (
    <div className="flex justify-center items-center py-8 px-6 md:h-screen">
      <SignIn
        routing={"path"}
        path={"/sign-in"}
        redirectUrl={path}
      />
    </div>
  )
}
