// import { NextResponse } from "next/server";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath = path === "/signin" || path === "/signup";

//   const token = request.cookies.get("token")?.value || "";

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/sigin", request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/", "/signin", "/signup", "/dashboard", "/dashboard/chats/:id*"],
// };
