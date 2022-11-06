import cookie from 'cookie'
import axios from 'axios'
import { SERVER_URL } from '../../../constants/constants'

export default async function getuseringredients(req, res) {
    try {
        let { access_token }  = cookie.parse(req.headers.cookie)

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }

        const response = await axios.get(`${SERVER_URL}/api/useringredients`, config)
        const data = response.data

        console.log('user ingredients data: ', data)

        res.status(200).json({ 
            status: 200,  
            success_message: 'Fetched user ingredients',
            data 
        })

    } catch (error) {
        console.log(error);
    }
}  