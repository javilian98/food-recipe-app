import axios from "axios";
import cookie from 'cookie'
import { SERVER_URL, API_URL, RECIPES } from '../../../constants/constants'
import { fetchData } from "../../../util/helper"

export default async function getnutrientdeficits(req, res) {
    try {
        let { access_token }  = cookie.parse(req.headers.cookie)

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }

        const response = await axios.get(`${SERVER_URL}/api/nutrient/deficit`, config)
        const data = response.data

        const keys = Object.keys(data).map(key => {
            if (data[key] < 0) {
                return 'min' + key.replace(/\s/g, '')
            } 
            return 'max' + key.replace(/\s/g, '')
        })

        console.log('data: ', keys)

        const keysFiltered = keys.filter(key => key.includes('VitaminA') || key.includes('Calcium') || key.includes('VitaminC'))

        console.log('filtered Keys: ', keysFiltered);

        const nutrientQueryParams = [...keysFiltered].map((key, index) => {
            if (index !== 0) {
                key = '&'+key
            }

            return key+"=10"
        }).join('')

        console.log('nutrientQueryParams: ', nutrientQueryParams) 

        const healthierRecipesAPI = await fetchData(`${API_URL}/${RECIPES}/findByNutrients`, `&${nutrientQueryParams}&number=9`)
        const healthierRecipesAPIRes = await healthierRecipesAPI.json()
        // const healthierRecipesData = healthierRecipesAPIRes.recipes
        console.log("healthier recipes: ", healthierRecipesAPIRes);

        res.status(200).json({ 
            status: 200,  
            success_message: 'Fetched healthy recipes',
            data: healthierRecipesAPIRes  
        })
    } catch (error) {

    }
}