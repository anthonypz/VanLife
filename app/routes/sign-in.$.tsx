import { SignIn } from "@clerk/remix"

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center py-8 px-6 md:h-screen">
      <SignIn
        routing={"path"}
        path={"/sign-in"}
      />
    </div>
  )
}
