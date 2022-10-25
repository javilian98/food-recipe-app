import cookie from 'cookie'
import axios from 'axios'

export default async function addfavouriterecipe(req, res) {
    try {
        let { access_token }  = cookie.parse(req.headers.cookie)
        const { recipeDataId, info, instructions, extendedIngredients, nutrition } = req.body

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }

        const response = await axios.post('http://localhost:8080/api/recipes', {
            recipeDataId,
            info,
            instructions,
            extendedIngredients,
            nutrition
        }, config)

        res.status(200).json({ status: 200, success_message: 'Added to Favourites' })

    } catch (error) {
        console.log(error);
    }
}  