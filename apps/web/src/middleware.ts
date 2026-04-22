import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isAuth = !!req.auth
  const isDashboardPage = req.nextUrl.pathname.startsWith("/admin")
  const isApiAdminRoute = req.nextUrl.pathname.match(/\/api\/pharmacies\/.*\/status/)

  if (isDashboardPage || isApiAdminRoute) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.nextUrl))
    }

    const user = req.auth?.user as { role?: string } | undefined
    const userRole = user?.role
    if (userRole !== "pharmacist" && userRole !== "admin") {
        return NextResponse.redirect(new URL("/", req.nextUrl))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*", "/api/pharmacies/:id/status"],
}
