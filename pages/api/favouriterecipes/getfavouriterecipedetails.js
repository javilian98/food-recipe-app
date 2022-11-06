import cookie from 'cookie'
import axios from 'axios'
import { API_URL, RECIPES } from '../../../constants/constants'
import { fetchData } from '../../../util/helper'
import { SERVER_URL } from '../../../constants/constants'

export default async function getfavouriterecipedetails(req, res) {
    try {
        let { access_token }  = cookie.parse(req.headers.cookie)

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }

        const response = await axios.get(`${SERVER_URL}/api/recipes/${req.query.recipeDataId}`, config)
        const { id, recipeDataId, info, instructions, extendedIngredients, nutrition } = response.data
        const recipeData = {
            id,
            recipeDataId,
            info: JSON.parse(info),
            instructions: JSON.parse(instructions),
            extendedIngredients: JSON.parse(extendedIngredients),
            nutrition: JSON.parse(nutrition),
        }

        console.log('recipe data details: ', recipeData)

        const recipeNutritionResponse = await fetchData(`${API_URL}/${RECIPES}/${req.query.recipeDataId}/nutritionLabel.png`, '&showOptionalNutrients=true')
        console.log('response: ', recipeNutritionResponse.headers);
        let contentType = recipeNutritionResponse.headers.get("Content-Type");
        const buffer = await recipeNutritionResponse.buffer()
        const nutritionImageBase64 = "data:" + contentType + ';base64,' + buffer.toString('base64')

        console.log("nutritionImageBase64: ", nutritionImageBase64);

        res.status(200).json({ 
            status: 200,  
            success_message: 'Fetched favourite recipe details',
            recipeData,
            nutritionImageBase64
        }) 

    } catch (error) {
        console.log(error);
    }
}  