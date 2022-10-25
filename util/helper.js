export const fetchData = async (url, params = '') => {
    
    return await fetch(`${url}?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_SECRET_KEY}${params}`)
}

export const updateAccessToken = async () => {
    const response = await fetch('http://localhost:3000/api/auth/refreshToken')
    const { token } = await response.json()

    console.log('api: ', token)

    return token
}

export const parseJwt = (token) => {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}