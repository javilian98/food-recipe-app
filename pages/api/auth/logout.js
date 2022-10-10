import { serialize } from "cookie"

export default async function logout(req, res) {
    
    console.log('logout')

    res.setHeader('Set-Cookie', [
        serialize('refresh_token', '', {
            maxAge: -1,
            path: '/',
        }) 
    ])

    return res.status(200).json({
        success: 'Successfully logged out'
    });
}  