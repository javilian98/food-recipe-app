import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Container, Title, Space, Grid } from '@mantine/core'
import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard'

import { useSearchRecipeStore } from '../../stores/store'
import axios from 'axios'

function Search() { 

    const router = useRouter()
    const [result, setResult] = useState([])

    const searchKeyword = useSearchRecipeStore(state => state.keyword)
   

    useEffect(() => {
        getFavouriteRecipes()
    }, [searchKeyword])
    

    const getFavouriteRecipes = async () => {

        try {
            // const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients?ingredients=beef,+tomato,+sugar&number=13&apiKey=616fc2c76e5c47bc834d54f5974631e8')
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchKeyword}&number=9&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_SECRET_KEY}`)

            const data = response.data
            setResult(data.results)
        }
        catch(e) { 
            console.log(e); 
        }
    }

 
    return (
        <Container fluid>
            <Title order={2}>Search Result ({result.length})</Title>
            <Space h="xl" />
            <Grid>
                {result?.map(recipe => (
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

export default Search