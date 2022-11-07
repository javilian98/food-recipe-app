import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Container, Title, Space, Grid } from '@mantine/core'
import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard'
import axios from 'axios'
import { CLIENT_URL } from '../../constants/constants'

function RecommendedRecipes() {

    const router = useRouter()

    // const [recipes, setRecipes] = useState([{
    //     id: '632091',
    //     title: 'Almond and cranberry shortbread',
    //     image: 'https://spoonacular.com/recipeImages/632091-556x370.jpg',
    //     readyInMinutes: 45,
    //     servings: 10
    // }])

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        getNutrientInDeficits()
    }, [])

    const getNutrientInDeficits = async () => {
        try {
            const response = await axios.get(`${CLIENT_URL}/api/nutrient/getnutrientdeficits`)
            const data = response.data

            console.log("nutrients in deficit: ", data)

            setRecipes(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container fluid>
            <Title order={2}>Try these healthier recipes!</Title>
            <Space h="xl" />
            <Grid>
                {recipes.map(recipe => (
                    <Grid.Col md={6} lg={4} key={recipe.id}>
                    <RecipeCard 
                        linkTo={router.pathname}
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

export default RecommendedRecipes