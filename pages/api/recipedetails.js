import { API_URL, RECIPES } from "../../constants/constants"
import { fetchData } from "../../util/helper"

export default async function recipedetails(req, res) {
    try {
        const recipeResponse = await fetchData(`${API_URL}/${RECIPES}/${req.query.recipeid}/information`, '&includeNutrition=true')
        const recipeData = await recipeResponse.json()

        console.log('recipeDataaaa: ', recipeData)

        const instructions = recipeData.analyzedInstructions[0].steps
        const extendedIngredients = recipeData.extendedIngredients
        const nutrition = recipeData.nutrition.nutrients

        delete recipeData.analyzedInstructions[0].steps
        delete recipeData.extendedIngredients
        delete recipeData.nutrition

        const info = recipeData

        const recipeNutritionResponse = await fetchData(`${API_URL}/${RECIPES}/${req.query.recipeid}/nutritionLabel.png`, '&showOptionalNutrients=true')
        let contentType = recipeNutritionResponse.headers.get("Content-Type");
        const buffer = await recipeNutritionResponse.buffer()
        const nutritionImageBase64 = "data:" + contentType + ';base64,' + buffer.toString('base64')
        // const nutritionImageBase64 =reader.readAsDataURL(nutritionImageBlob); 
        // console.log('blob: ', nutritionImageBase64)
  
        res.status(200).json({ 
            recipeData: {
                info,
                instructions,
                extendedIngredients,
                nutrition
            }, 
            nutritionImageBase64 
        })
    } catch (e) {
        console.log(e)
        res.status(500).json("error")
    }  
}