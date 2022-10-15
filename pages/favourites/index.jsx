import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Container, Title, Space, Grid, Button } from '@mantine/core'
import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard'

import { useFavouriteRecipeStore, useAccessTokenStore } from '../../stores/store'
import { updateAccessToken } from '../../util/helper'
import axios from 'axios'

function Favourites() {

    const router = useRouter()

    const favouriteRecipes = useFavouriteRecipeStore(state => state.favouriteRecipes)
    const accessToken = useAccessTokenStore(state => state.accessToken)
    const setAccessToken = useAccessTokenStore(state => state.setAccessToken)

    useEffect(() => {
        getFavouriteRecipes()
    }, [])
    
    // const [recipes, setRecipes] = useState([{
    //     id: '632091',
    //     title: 'Almond and cranberry shortbread',
    //     image: 'https://spoonacular.com/recipeImages/632091-556x370.jpg',
    //     readyInMinutes: 45,
    //     servings: 10
    // }])

    // const [favouriteRecipes, setFavouriteRecipes] = useState([])

    

    const getFavouriteRecipes = () => {
        const localStorageData = JSON.parse(localStorage.getItem('favouriteRecipes'))

        if (localStorageData) return
        
        try {
            // fetch favourite recipes from backend server API

            // loop over favurite recipes data, add each recipe data into favourite recipes state

            //  
        }
        catch(e) {
            console.log(e); 
        }
    }

    // const refreshTokenHandler = async () => {
    //     const newAccessToken = await updateAccessToken()
        
    //     console.log('newAccessToken: ', newAccessToken)
    // }

    const userHandler = async () => {
        try {
        const response = await axios.get('http://localhost:3000/api/user')
        const data = response

        console.log(data)
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <Container fluid>
            <Title order={2}>Favourite Recipes<Button onClick={userHandler}></Button></Title>
            <Space h="xl" />
            <Grid>
                {favouriteRecipes.map(recipe => (
                    <Grid.Col md={6} lg={4} key={recipe.id}>
                    <RecipeCard 
                        id={recipe.id}
                        title={recipe.title}
                        image={recipe.image}
                        readyInMinutes={recipe.readyInMinutes}
                        servings={recipe.servings}
                    />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}

export default Favourites