// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that do not require authentication
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)',]);

// Define middleware to handle public and protected routes
export default clerkMiddleware(
  (auth, request) => {
    // Check if the current request matches a public route
    if (!isPublicRoute(request)) {
      // If it's not a public route, enforce authentication
      auth().protect();
    }
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and assets (html, css, images, etc.)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always apply the middleware to API and tRPC routes
    '/(api|trpc)(.*)',
  ],
};
