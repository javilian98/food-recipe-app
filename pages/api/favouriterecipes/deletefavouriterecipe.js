import cookie from 'cookie'
import axios from 'axios'

export default async function deletefavouriterecipe(req, res) {
    try {
        let { access_token }  = cookie.parse(req.headers.cookie)

        console.log('QUERY IDDDDDDDDDDD', req.body)

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }

        const response = await axios.delete(`${process.env.SERVER_URL}/api/recipes/${req.body.recipeDataId}`, config)

        res.status(200).json({ status: 200, success_message: 'Removed from Favourites' })

    } catch (error) {
        console.log(error);
    }
}  