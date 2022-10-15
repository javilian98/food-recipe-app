import cookie from 'cookie'

export default async function refreshToken(req, res) {
    let { refresh_token }  = cookie.parse(req.headers.cookie)
    
    try {
    const response = await fetch('http://localhost:8080/api/token/refresh', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + refresh_token
            }
        }) 

    const { access_token } = await response.json()

    res.status(200).json({ token: access_token })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
} 
