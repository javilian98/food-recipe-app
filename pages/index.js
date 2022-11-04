import { useEffect, useState } from 'react'
import { Grid, Text, Title, Container, Space } from '@mantine/core'
import Head from 'next/head'
import Image from 'next/image'
import RecipeCard from '../components/recipes/RecipeCard/RecipeCard'
import { API_URL, RECIPES, RECIPES_RANDOM } from '../constants/constants'
import { fetchData } from '../util/helper'
import { useAccessTokenStore } from '../stores/store'

export default function Home() {

  const [featuredRecipes, setFeaturedRecipes] = useState([])

  const accessToken  = useAccessTokenStore(state => state.accessToken)

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_SPOONACULAR_API_SECRET_KEY)
    getRandomRecipes()
  }, []) 


  const getRandomRecipes = async () => {

    let featuredData;
    const localStorageData = JSON.parse(localStorage.getItem('featuredRecipes'))
    const now = new Date()

    if (localStorageData && now.getTime() < localStorageData.expiry) { 
      featuredData = JSON.parse(localStorageData.recipes) 
    } 
    else {
      try {
        const api = await fetchData(`${API_URL}/${RECIPES}/${RECIPES_RANDOM}`, '&number=9')
        const response = await api.json()
        featuredData = response.recipes
        
        const item = {
          recipes: JSON.stringify(featuredData),
          expiry: now.getTime() + 86400000 // 1 day in milliseconds
        }
        localStorage.setItem('featuredRecipes', JSON.stringify(item));
      }
      catch(e) {
        console.log(e);
      }
    } 
 
    setFeaturedRecipes(featuredData)
  }
  
  return (
    <div>
      <Head>
        <title>Food For Thought</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main>
        
        <Container fluid>
          <Title order={2}>Try out new recipes </Title>
          <Space h="xl" /> 
          <Grid>
            {featuredRecipes.map(recipe => (
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
      </main>
    </div>
  )
}
