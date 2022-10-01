export const fetchData = async (url, params = '') => {
    return await fetch(`${url}?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_SECRET_KEY}${params}`)
}