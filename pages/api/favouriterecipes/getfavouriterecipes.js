import cookie from 'cookie'
import axios from 'axios'

export default async function getfavouriterecipes(req, res) {
    try {
        let { access_token }  = cookie.parse(req.headers.cookie)

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }

        const response = await axios.get(`${process.env.SERVER_URL}/api/recipes`, config)
        const data = response.data

        console.log('data: ', data)

        res.status(200).json({ 
            status: 200,  
            success_message: 'Fetched favourite recipes',
            data 
        })

    } catch (error) {
        console.log(error);
    }
}  