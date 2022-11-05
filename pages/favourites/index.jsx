import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Container, Title, Space, Grid } from '@mantine/core'
import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard'

import { useFavouriteRecipeStore } from '../../stores/store'

function Favourites() {

    const router = useRouter()

    const favouriteRecipes = useFavouriteRecipeStore(state => state.favouriteRecipes)

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

 
    return (
        <Container fluid>
            <Title>Ingredient: Beef</Title>
            <Title order={2}>Favourite Recipes</Title>
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