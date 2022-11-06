import cookie from 'cookie'
import axios from 'axios'

export default async function deleteuseringredient(req, res) {
    try {
        let { access_token }  = cookie.parse(req.headers.cookie)

        console.log('ingredient id', req.body)

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }

        const response = await axios.delete(`${process.env.SERVER_URL}/api/useringredients/${req.body.userIngredientId}`, config)

        res.status(200).json({ status: 200, success_message: 'Removed from user ingredients' })

    } catch (error) {
        console.log(error);
    }
}  