import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/Form/Login" || path === "/Form/Signup";

  const token = request.cookies.get("token")?.value || "";
  
  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/' , request.nextUrl))
  }
  
  if(!isPublicPath && !token)
  {
    return NextResponse.redirect(new URL('/Form/Login' , request.nextUrl))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/gallery",
    "/petofthemonth",
    "/Form/PetForm",
    "/Form/petofthemonth",
    "/Form/Login",
    "/Form/Signup",
    "/Form/petofthemonthform"
  ],
};
