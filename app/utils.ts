import { redirect } from "react-router-dom"
// TODO: replace any type
export async function requireAuth(request: any) {
  const pathname = new URL(request.url).pathname
  const isLoggedIn = localStorage.getItem("loggedin")

  if (!isLoggedIn) {
    throw redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    )
  }
}
