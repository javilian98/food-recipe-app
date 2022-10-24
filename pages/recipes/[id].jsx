import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Card, Image, Overlay, Title, Text, Group, ThemeIcon, Space, Container, Grid, ActionIcon, Center, Accordion, Avatar } from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import { IconAlarm, IconSoup, IconCircleMinus, IconCirclePlus, IconCheck, IconHeart, IconConfetti } from '@tabler/icons';

import { API_URL, RECIPES } from '../../constants/constants'
import { fetchData } from '../../util/helper'

import { useFavouriteRecipeStore, useRecipeNutritionImageStore } from '../../stores/store'
import axios from 'axios';

function Recipe() {

    const router = useRouter()

    // const [details, setDetails] = useState()
    const [details, setDetails] = useState({
        info: {},
        instructions: [],
        extendedIngredients: [],
        nutrition: []
    })
    const [toggleFavourite, setToggleFavourite] = useState(false)
     
    const favouriteRecipes = useFavouriteRecipeStore(state => state.favouriteRecipes)
    const addFavouriteRecipe = useFavouriteRecipeStore(state => state.addFavouriteRecipe)
    const removeFavouriteRecipe = useFavouriteRecipeStore(state => state.removeFavouriteRecipe)

    const setNutritionImageBase64 = useRecipeNutritionImageStore(state => state.setNutritionImageBase64)

    useEffect(() => { 
        getDetails()

        // fetch(`https://api.spoonacular.com/recipes/662038/nutritionLabel.png?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_SECRET_KEY}&showOptionalNutrients=true`)
        //     .then(res => res.blob())
        //     .then(imageBlob => {
        //         var reader = new FileReader();
        //         reader.readAsDataURL(imageBlob); 

        //         console.log(reader)
        //     })
    }, [router.query.id])  

    // console.log(details)

    // const { extendedIngredients } = details
    // console.log(extendedIngredients)
    

    const getDetails = async () => {
        const foundRecipeInLocalStorage = favouriteRecipes.find(recipe => recipe.info.id.toString() === router.query.id) || null
 
        if (foundRecipeInLocalStorage) {
            console.log('foundRecipe: ', foundRecipeInLocalStorage)
            setDetails(foundRecipeInLocalStorage) 
            setToggleFavourite(true)
            return  
        }   

        try {
            console.log('dataaa')
            // const api = await fetchData(`${API_URL}/${RECIPES}/${router.query.id}/information`)
            const api = await fetch('http://localhost:3000/api/recipedetails?' + new URLSearchParams({
                recipeid: router.query.id
            }))
            const data = await api.json()
            const { recipeData, nutritionImageBase64 } = data
            console.log(data) 

            const { info, instructions, extendedIngredients, nutrition } = recipeData

            setDetails({
                info,
                instructions,
                extendedIngredients,
                nutrition
            })
            setNutritionImageBase64(nutritionImageBase64)

            
        } catch (e) {
            console.log(e)
        } 
    }

    const addToFavourites = async () => {
        const foundRecipeInLocalStorage = favouriteRecipes.find(recipe => recipe.info.id.toString() === router.query.id)

        if (foundRecipeInLocalStorage) { 
            console.log('remove recipe', foundRecipeInLocalStorage.info.id)
            removeFavouriteRecipe(foundRecipeInLocalStorage.info.id)
            setToggleFavourite(false)
        } else { 
            addFavouriteRecipe(details)
            setToggleFavourite(true)

            const { info, instructions, extendedIngredients, nutrition } = details
            
            const response = await axios.post('http://localhost:3000/api/favouriterecipes/addfavouriterecipe', {
                info: JSON.stringify(info),
                instructions: JSON.stringify(instructions),
                extendedIngredients: JSON.stringify(extendedIngredients),
                nutrition: JSON.stringify(nutrition)
            })  

            const { status, success_message } = response.data
            
            if (status === 200) {
                // showNotification({
                //     title: 'Favourite Recipes',
                //     message: 'Added to Favourites 🤥',
                // })

                showNotification({
                    title: 'Favourite Recipes',
                    message: 'Added to Favourites! 😊',
                    styles: (theme) => ({
                      root: {
                        backgroundColor: theme.colors.green[6],
                        borderColor: theme.colors.green[6],
        
                        '&::before': { backgroundColor: theme.white },
                      },
        
                      title: { color: theme.white },
                      description: { color: theme.white },
                      closeButton: {
                        color: theme.white,
                        '&:hover': { backgroundColor: theme.colors.green[7] },
                      },
                    }),
                  })
            }
        }
    }

    const controlServings = newServings => {
        if (newServings === 0) return 

        const newExtendedIngredients = details.extendedIngredients.map(ingredient => {
            ingredient.measures.metric.amount = ((ingredient.measures.metric.amount * newServings) / details.info.servings).toFixed(2)

            return ingredient
        })

        setDetails(prevDetails => ({
            ...prevDetails,
            info: {
                ...prevDetails.info,
                servings: newServings
            },
            extendedIngredients: newExtendedIngredients
        }))
    }

    return (
        <div className="recipe">
            <Card radius="lg">
                <Overlay opacity={0.3} color="#000" zIndex={1} />
                <Card.Section sx={{ position: 'relative' }}>
                    <Image
                        src={details.info.image}
                        height={300}
                        alt="Norway"
                    />

                    <Title order={2} color="#fff" sx={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 5 }}>{details.info.title}</Title>
                </Card.Section>
            </Card>
            <Space h="xl" />
            <Group position="apart" spacing="xl">
                <Group>
                    <Group spacing="xs">
                        <ThemeIcon color="green" variant="light">
                            <IconAlarm size={60} />
                        </ThemeIcon>
                
                        <Text size="xl">{details.info.readyInMinutes} mins</Text>
                    </Group>

                    <Group spacing="xs">
                        <ThemeIcon color="green" variant="light">
                            <IconSoup size={60} />
                        </ThemeIcon>
                        
                        <Text size="xl">{details.info.servings} servings</Text>
                        <Group spacing={5}>
                        <ThemeIcon color="green" variant="light">
                            <ActionIcon color="green" onClick={() => controlServings(details.info.servings - 1)}>
                                <IconCircleMinus size={30} />
                            </ActionIcon>
                        </ThemeIcon>
                        <ThemeIcon color="green" variant="light">
                            <ActionIcon color="green" onClick={() => controlServings(details.info.servings + 1)}>
                                <IconCirclePlus size={30} />
                            </ActionIcon>
                        </ThemeIcon>
                        </Group>
                    </Group>
                </Group>
 
                <Group>
                    <ActionIcon color={toggleFavourite ? "red" : "gray"} onClick={addToFavourites}>
                        <ThemeIcon color={toggleFavourite ? "red" : "gray"} variant="dark" radius="xl" size="xl">
                            <IconHeart size={25} />
                        </ThemeIcon>
                    </ActionIcon>
                </Group>
            </Group>

             
            <Space h={40} />
            <Container fluid spacing="xs" >
                <Title order={3} color="green">Recipe Ingredients</Title>
                <Space h={20} />
                <Grid className="recipe__ingredient-list" role="list">
                    {details.extendedIngredients.map((ingredient, index) => {
                        return (
                            <Grid.Col 
                                className="recipe__ingredient" 
                                lg={6}
                                key={index} 
                            >
                                <Group spacing={10}>
                                <ThemeIcon color="green" variant="light">
                                    <IconCheck size={60} />
                                </ThemeIcon>
                                    <Text className="recipe__quantity">{ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort}</Text>
                                    <Text className="recipe__description">{ingredient.name} {ingredient.meta.length !== 0 && `(${ingredient.meta[0]})`}</Text>
                                </Group>
                            </Grid.Col>
                        )
                    })}
                </Grid>
            </Container>

            <Space h={40} />
            <Container fluid spacing="xs" >
                <Center>
                    <Title order={2} color="green">How to cook it</Title>
                </Center>
            </Container>
            
            <Space h={30} />
            <Container fluid spacing="xs">

            <Accordion 
                defaultValue="customization"
                styles={{
                    item: {
                        '&[data-active]': {
                            backgroundColor: '#40c0571c',
                        },
                    }
                }}
            >
                {details.instructions.map((step, index) => (
                    <Accordion.Item value={`${step.number}`} key={step.number}>
                        <Accordion.Control>
                            <Group>
                            <Avatar color="cyan" radius="xl">{step.number}</Avatar>
                            Step {step.number}
                                    
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel> 
                            {step?.equipment.length !== 0 &&
                                <>
                                    <Title order={5} color="green">Equipment</Title>
                                    <Space h={10} />
                                    {step?.equipment.map(item => (
                                        <Group spacing={10} key={item.id}>
                                            <ThemeIcon color="green" variant="light">
                                                <IconCheck size={60} />
                                            </ThemeIcon>
                                            <Text>{item.name}</Text>
                                        </Group>
                                    ))}
                                    <Space h={30} />
                                </>
                            }
                            
                            {step?.equipment.ingredients !== 0 &&
                                <>
                                    <Title order={5} color="green">Ingredients</Title>
                                    <Space h={10} />
                                    {step?.ingredients.map(item => (
                                        <Group spacing={10} key={item.id}>
                                            <ThemeIcon color="green" variant="light">
                                                <IconCheck size={60} />
                                            </ThemeIcon>
                                            <Text>{item.name}</Text>
                                        </Group>
                                    ))}
                                    <Space h={30} />
                                </>
                            }
                            <Title order={5} color="green">Step</Title>
                            <Space h={10} />
                            <Text>{step?.step}</Text>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
                <Accordion.Item value="Completed">
                    <Accordion.Control>
                        <Group>
                            <Avatar color="blue" radius="xl">
                                <IconConfetti size={24} />
                            </Avatar>
                            Completed  
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Text>Congratulations!</Text>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            {/* <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                {details?.analyzedInstructions[0].steps.map((step, index) => (
                    <Stepper.Step key={index} label={`Step ${step.number}`}>
                        
                        {step?.equipment.length !== 0 &&
                            <>
                                <Title order={5} color="green">Equipment</Title>
                                <Space h={10} />
                                {step?.equipment.map(item => (
                                    <Group spacing={10} key={step.number}>
                                        <ThemeIcon color="green" variant="light">
                                            <IconCheck size={60} />
                                        </ThemeIcon>
                                        <Text>{item.name}</Text>
                                    </Group>
                                ))}
                            </>
                        }
                        <Space h={30} />
                        {step?.equipment.ingredients !== 0 &&
                            <>
                                <Title order={5} color="green">Ingredients</Title>
                                <Space h={10} />
                                {step?.ingredients.map(item => (
                                    <Group spacing={10} key={item.id}>
                                        <ThemeIcon color="green" variant="light">
                                            <IconCheck size={60} />
                                        </ThemeIcon>
                                        <Text>{item.name}</Text>
                                    </Group>
                                ))}
                            </>
                        }
                        <Space h={30} />
                        <Title order={5} color="green">Step</Title>
                        <Space h={10} />
                        <Text>{step?.step}</Text>
                    </Stepper.Step>
                ))} 

                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>

            </Stepper>

            <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group>*/}
            </Container> 
        </div>
    )
}

export default Recipe
