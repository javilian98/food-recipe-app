import axios from 'axios'
import cookie from 'cookie'

import { API_URL, RECIPES } from '../../../constants/constants'
import { fetchData } from '../../../util/helper'
import { SERVER_URL } from '../../../constants/constants'

export default async function getdeficitnutrients(req, res) {
    try {
        // /nutrient/deficit

        let { access_token }  = cookie.parse(req.headers.cookie)

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }

        const response = await 
        axios.get(
        'ec2-13-229-125-36.ap-southeast-1.compute.amazonaws.com/api/nutrient/deficit', 
        config)

        const data = response.data

        res.status(200).json({
            status: 200,
            data
        })
    } catch (error) {
        console.log(error);
    }
}