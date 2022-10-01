import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Container, Title, Space, Grid } from '@mantine/core'
import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard'


function Favourites() {
    const router = useRouter()

    // useEffect(() => {

    // }, [])
    
    const [recipes, setRecipes] = useState([{
        id: '632091',
        title: 'Almond and cranberry shortbread',
        image: 'https://spoonacular.com/recipeImages/632091-556x370.jpg',
        readyInMinutes: 45,
        servings: 10
    }])

 
    return (
        <Container fluid>
            <Title order={2}>Favourite Recipes</Title>
            <Space h="xl" />
            <Grid>
            {recipes.map(recipe => (
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