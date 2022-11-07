import { NextResponse } from "next/server";
import { CLIENT_URL } from "./constants/constants";

export function middleware(req) {
    let verify = req.cookies.get('refresh_token')

    // console.log(verify)

    if (
        !verify && (
            req.nextUrl.pathname === '/favourites'
            || req.nextUrl.pathname === '/userprofile'
        )
    ) {
        return NextResponse.redirect(`${CLIENT_URL}/login`)
    }

    if (verify && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(`${CLIENT_URL}`)
    }
}  