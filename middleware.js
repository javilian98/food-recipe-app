import { NextResponse } from "next/server";

export function middleware(req) {
    let verify = req.cookies.get('refresh_token')

    // console.log(verify)

    if (
        !verify && (
            req.nextUrl.pathname === '/favourites'
            || req.nextUrl.pathname === '/userprofile'
        )
    ) {
        return NextResponse.redirect('http://localhost:3000/login')
    }

    if (verify && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect('http://localhost:3000')
    }
}  