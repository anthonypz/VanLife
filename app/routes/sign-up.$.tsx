import { SignUp } from "@clerk/remix"
import type { ActionArgs } from "@remix-run/node"
import { createUser } from "~/models/user.server"
import { getAuth } from "@clerk/remix/ssr.server"

export async function action(args: ActionArgs) {
  console.log("ran the action!")
  const { userId } = await getAuth(args)
  if (userId) {
    await createUser(userId)
  }
}

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center py-8 px-6 md:h-screen">
      <SignUp
        routing={"path"}
        path={"/sign-up"}
      />
    </div>
  )
}
