import cookie from 'cookie'
import axios from 'axios'
import { SERVER_URL } from '../../../constants/constants'

export default async function adduseringredient(req, res) {
    try {
        let { access_token }  = cookie.parse(req.headers.cookie)
        const { name } = req.body

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }

        const response = await axios.post(`${SERVER_URL}/api/useringredients`, {
            name
        }, config)

        res.status(200).json({ status: 200, success_message: 'Added user ingredient' })
    } catch (error) {
        console.log(error)
    }
}