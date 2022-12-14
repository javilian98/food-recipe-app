import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import { BackgroundImage, Center, Text, Box, Title, Space, Grid } from '@mantine/core';
import placeholder from '../diethistory/image/1.jpeg';
import hdImage from '../diethistory/image/1.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFavouriteRecipeStore } from '../../stores/store'
import Image from 'react-bootstrap/Image'

import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard';
import axios from 'axios';

// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';

function diethistory() {

  const router = useRouter()

  const favouriteRecipes = useFavouriteRecipeStore(state => state.favouriteRecipes)

  // useEffect(() => {
  //   getFavouriteRecipes()
  // }, [])

  const [recipes, setRecipes] = useState([{
      id: '632091',
      title: 'Almond and cranberry shortbread',
      image: 'https://spoonacular.com/recipeImages/632091-556x370.jpg',
      readyInMinutes: 45,
      servings: 10
  }])

  useEffect(() => {
      getDeficitNutrients()
  }, [])

  const getDeficitNutrients = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/nutrient/getdeficitnutrients')
        const data = response.data

        console.log('data: ', data);
    } catch (error) {
        console.log(error);
    }
  }

  // const [favouriteRecipes, setFavouriteRecipes] = useState([])



  // const getFavouriteRecipes = () => {
  //   const localStorageData = JSON.parse(localStorage.getItem('favouriteRecipes'))

  //   if (localStorageData) return

  //   try {
  //     // fetch favourite recipes from backend server API

  //     // loop over favurite recipes data, add each recipe data into favourite recipes state

  //     //  
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }


  // return (
  //   <>
  //      <Box sx={{ maxWidth: 800 }} mx="auto">
  //     <BackgroundImage
  //       src="3.jpeg"
  //       radius="sm"
  //     >
  //       <Center p="md">
  //       <CardGroup>
  //         <Card>
  //           <Card.Img variant="top" src="holder.js/100px160" />
  //           <Card.Body>
  //             <Card.Title>Card title</Card.Title>
  //             <Card.Text>
  //               This card has supporting text below as a natural lead-in to
  //               additional content.{' '}
  //             </Card.Text>
  //           </Card.Body>
  //           <Card.Footer>
  //             <small className="text-muted">Last updated 3 mins ago</small>
  //           </Card.Footer>
  //         </Card>
  //         <Card>
  //           <Card.Img variant="top" src="holder.js/100px160" />
  //           <Card.Body>
  //             <Card.Title>Card title</Card.Title>
  //             <Card.Text>
  //               This is a wider card with supporting text below as a natural lead-in
  //               to additional content. This card has even longer content than the
  //               first to show that equal height action.
  //             </Card.Text>
  //           </Card.Body>
  //           <Card.Footer>
  //             <small className="text-muted">Last updated 3 mins ago</small>
  //           </Card.Footer>
  //         </Card>
  //         <Card>
  //           <Card.Img variant="top" src="holder.js/100px160" />
  //           <Card.Body>
  //             <Card.Title>Card title</Card.Title>
  //             <Card.Text>
  //               This is a wider card with supporting text below as a natural lead-in
  //               to additional content. This card has even longer content than the
  //               first to show that equal height action.
  //             </Card.Text>
  //           </Card.Body>
  //           <Card.Footer>
  //             <small className="text-muted">Last updated 3 mins ago</small>
  //           </Card.Footer>
  //         </Card>
  //       </CardGroup>
  //       </Center>
  //     </BackgroundImage>
  //   </Box>

  //     {/* <Image src='https://pic.52112.com/2019/07/23/JPG-190723_395/uf3FUwOMpf_small.jpg' rounded='true'></Image> */}
  //     {/* <Image src='1.jpeg' rounded='true'></Image> */}

     
      
  //   </>
  // )
  return (
  <Container fluid>
            {/* <Title>Ingredient: Beef</Title> */}
            <Title order={2}>Try these healthier options!</Title>
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

export default diethistory