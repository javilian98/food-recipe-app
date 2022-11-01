import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Container, Title, Space, Grid } from '@mantine/core'
import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard'

import { useFavouriteRecipeStore } from '../../stores/store'

import MKBox from '../../pages/diethistory/components/MKBox';
import MKTypography from '../../pages/diethistory/components/MKTypography';
import MKSocialButton from '../../pages/diethistory/components/MKSocialButton';

import DefaultNavbar from '../../pages/diethistory/examples/Navbars/DefaultNavbar';
import DefaultFooter from '../../pages/diethistory/examples/Footers/DefaultFooter';
import FilledInfoCard from '../../pages/diethistory/examples/Cards/InfoCards/FilledInfoCard';
import Counters from '../Presentation/sections/Counters';

import Card from "@mui/material/Card";
import bgImage from '../diethistory/assets/images/bg-presentation.jpg';

function diethistory() {

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
        
        <>
        <DefaultNavbar
          
        />
        <MKBox
          minHeight="75vh"
          width="100%"
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Container>
            <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
              <MKTypography
                variant="h1"
                color="white"
                mt={-6}
                mb={1}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                Material Kit 2 React{" "}
              </MKTypography>
              <MKTypography
                variant="body1"
                color="white"
                textAlign="center"
                px={{ xs: 6, lg: 12 }}
                mt={1}
              >
                Free & Open Source Web UI Kit built over ReactJS &amp; MUI. Join over 1.6 million
                developers around the world.
              </MKTypography>
            </Grid>
          </Container>
        </MKBox>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Counters />
         
          <Container sx={{ mt: 6 }}>
          </Container>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}>
                <FilledInfoCard
                  variant="gradient"
                  color="info"
                  icon="flag"
                  title="Getting Started"
                  description="Check the possible ways of working with our product and the necessary files for building your own project."
                  action={{
                    type: "external",
                    route: "https://www.creative-tim.com/learning-lab/react/overview/material-kit/",
                    label: "Let's start",
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <FilledInfoCard
                  color="info"
                  icon="precision_manufacturing"
                  title="Plugins"
                  description="Get inspiration and have an overview about the plugins that we used to create the Material Kit."
                  action={{
                    type: "external",
                    route: "https://www.creative-tim.com/learning-lab/react/overview/datepicker/",
                    label: "Read more",
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <FilledInfoCard
                  color="info"
                  icon="apps"
                  title="Components"
                  description="Material Kit is giving you a lot of pre-made components, that will help you to build UI's faster."
                  action={{
                    type: "external",
                    route: "https://www.creative-tim.com/learning-lab/react/alerts/material-kit/",
                    label: "Read more",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
          <Container fluid>
            <Title order={2}>Recommendation</Title>
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
          <MKBox pt={18} pb={6}>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={5} ml="auto" sx={{ textAlign: { xs: "center", lg: "left" } }}>
                  <MKTypography variant="h4" fontWeight="bold" mb={0.5}>
                    Thank you for your support!
                  </MKTypography>
                  <MKTypography variant="body1" color="text">
                    We deliver the best web products
                  </MKTypography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={5}
                  my={{ xs: 5, lg: "auto" }}
                  mr={{ xs: 0, lg: "auto" }}
                  sx={{ textAlign: { xs: "center", lg: "right" } }}
                >
                  <MKSocialButton
                    component="a"
                    href="https://twitter.com/intent/tweet?text=Check%20Material%20Design%20System%20made%20by%20%40CreativeTim%20%23webdesign%20%23designsystem%20%23mui5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-kit-react"
                    target="_blank"
                    color="twitter"
                    sx={{ mr: 1 }}
                  >
                    <i className="fab fa-twitter" />
                    &nbsp;Tweet
                  </MKSocialButton>
                  <MKSocialButton
                    component="a"
                    href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-kit-react"
                    target="_blank"
                    color="facebook"
                    sx={{ mr: 1 }}
                  >
                    <i className="fab fa-facebook" />
                    &nbsp;Share
                  </MKSocialButton>
                  <MKSocialButton
                    component="a"
                    href="https://www.pinterest.com/pin/create/button/?url=https://www.creative-tim.com/product/material-kit-react"
                    target="_blank"
                    color="pinterest"
                  >
                    <i className="fab fa-pinterest" />
                    &nbsp;Pin it
                  </MKSocialButton>
                </Grid>
              </Grid>
            </Container>
          </MKBox>
        </Card>
        <MKBox pt={6} px={1} mt={6}>
         
        </MKBox>
      </>
    )
}

export default diethistory