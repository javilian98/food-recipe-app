import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Container, Title, Space, Grid, Button } from '@mantine/core'
import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard'

import { useFavouriteRecipeStore, useAccessTokenStore } from '../../stores/store'
import { updateAccessToken } from '../../util/helper'
import { CLIENT_URL } from '../../constants/constants';
import axios from 'axios'

function Favourites() {

    const router = useRouter()

    const favouriteRecipes = useFavouriteRecipeStore(state => state.favouriteRecipes)
    const addFavouriteRecipe = useFavouriteRecipeStore(state => state.addFavouriteRecipe)
    const resetFavouriteRecipes = useFavouriteRecipeStore(state => state.resetFavouriteRecipes)

    const accessToken = useAccessTokenStore(state => state.accessToken)
    const setAccessToken = useAccessTokenStore(state => state.setAccessToken)

    useEffect(() => {
        getFavouriteRecipes()
    }, [])

    console.log(router.pathname)
    
    // const [recipes, setRecipes] = useState([{
    //     id: '632091',
    //     title: 'Almond and cranberry shortbread',
    //     image: 'https://spoonacular.com/recipeImages/632091-556x370.jpg',
    //     readyInMinutes: 45,
    //     servings: 10
    // }])

    // const [favouriteRecipes, setFavouriteRecipes] = useState([])


    const getFavouriteRecipes = async () => {
        
        try {
            resetFavouriteRecipes()
            
            // fetch favourite recipes from backend server API
            const response = await axios.get(`${CLIENT_URL}/api/favouriterecipes/getfavouriterecipes`)
            const data = response.data
            console.log(data);
 
            // loop over favurite recipes data, add each recipe data into favourite recipes state
            data.data.forEach(recipeString => {
                const parsedRecipe = {
                    info: JSON.parse(recipeString.info),
                    instructions: JSON.parse(recipeString.instructions),
                    extendedIngredients: JSON.parse(recipeString.extendedIngredients),
                    nutrition: JSON.parse(recipeString.nutrition)
                }
                
                addFavouriteRecipe(parsedRecipe)
            })
        }
        catch(e) {
            console.log(e); 
        }
    }

    // const refreshTokenHandler = async () => {
    //     const newAccessToken = await updateAccessToken()
        
    //     console.log('newAccessToken: ', newAccessToken)
    // }

 
    return (
        <Container fluid>
            <Title order={2}>Favourite Recipes</Title>
            <Space h="xl" />
            <Grid>
                {favouriteRecipes.map(recipe => (
                    <Grid.Col md={6} lg={4} key={recipe.info?.id}>
                    <RecipeCard 
                        linkTo={router.pathname}
                        id={recipe.info?.id}
                        title={recipe.info?.title}
                        image={recipe.info?.image}
                        readyInMinutes={recipe.info?.readyInMinutes}
                        servings={recipe.info?.servings}
                    />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}

export default Favourites