import { Grid, Avatar, Center, Card, Box, Group, Text, Space, Title, Button, Modal, Tabs, TextInput, ThemeIcon } from '@mantine/core'
import { useForm } from '@mantine/form';
import { IconCircleCheck, IconCircleDashed, IconForms, IconPhoto, IconTrash } from '@tabler/icons';
import { useState, useEffect, useRef } from 'react'
import * as mobilenet from "@tensorflow-models/mobilenet";

import { showNotification } from '@mantine/notifications';

import { useAccessTokenStore, useUserIngredientsStore } from '../../stores/store'

import { fetchData } from '../../util/helper'
import { API_URL, RECIPES, CLIENT_URL } from '../../constants/constants'

import axios from 'axios';
import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard';
import { image } from '@tensorflow/tfjs-core';

function UserProfile() {
  const userDetails = useAccessTokenStore(state => state.userDetails)
  const userIngredients = useUserIngredientsStore(state => state.userIngredients)
  const setUserIngredients = useUserIngredientsStore(state => state.setUserIngredients)
  const resetUserIngredients = useUserIngredientsStore(state => state.resetUserIngredients)
  const removeUserIngredient = useUserIngredientsStore(state => state.removeUserIngredient)

  const [opened, setOpened] = useState(false);
  const [recipes, setRecipes] = useState([])

  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null);
  const [imageResults, setImageResults] = useState([])
  const [selectedImageResult, setSelectedImageResult] = useState('')

  const imageRef = useRef()

  useEffect(() => {
    getUserIngredients()
    loadModel()
  }, [])

  useEffect(() => {
    setImageResults([])
  }, [imageURL])

  const form = useForm({
    initialValues: {
      textIngredient: '',
    },

    validate: {
      textIngredient: (value) => (value.length < 2 ? 'Ingredient name is too short' : null),
    },
  })

  const loadModel = async () => {
    setIsModelLoading(true)
    try {
      const model = await mobilenet.load()
      setModel(model)
      setIsModelLoading(false)
      console.log('model loaded');
    } catch (error) {
      console.log(error);
      setIsModelLoading(false)
    }
  }

  const getUserIngredients = async () => {
    try {
      resetUserIngredients()
      const response = await axios.get(`${CLIENT_URL}/api/useringredients/getuseringredients`)
      const data = response.data
      console.log(data);

      data.data.forEach(userIngredient => setUserIngredients(userIngredient))
    } catch (error) {
      console.log(error);
    }
  }

  const addUserIngredient = async () => {

    try {
      console.log('submitted');

      let ingredient;

      if (selectedImageResult === '') {
        setSelectedImageResult('')
        ingredient = form.values.textIngredient
      }
      else if (form.values.textIngredient === '') {
        form.reset()
        ingredient = selectedImageResult
      }

      console.log('ingredient: ', ingredient);

      const response = await axios.post(`${CLIENT_URL}/api/useringredients/adduseringredient`, {
        name: ingredient
      })

      const { status, success_message } = response.data

      if (status === 200) {
        setUserIngredients({ id: userIngredients.length, name: ingredient })

        form.reset()
        showNotification({
          title: 'User Ingredient',
          message: 'Added user ingredient! 😊',
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
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUserIngredient  = async (id) => {
    try {
      removeUserIngredient(id)

      const response = await axios.delete(`${CLIENT_URL}/api/useringredients/deleteuseringredient`, {
          data: {
            userIngredientId: id
          }
      })
 
      const { status, success_message } = response.data

      if (status === 200) {
          showNotification({
              title: 'User Ingredients',
              message: success_message,
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
    } catch (error) {
      console.log(error);
    }
  }

  const getRecipesByUserIngredients = async () => {
    try {
      const ingredientQueryParams = [...userIngredients].map((ingredient, index) => {
        if (index !== 0) {
            ingredient.name = '+'+ingredient.name
        }

        return ingredient.name
      }).join(',')

      console.log(ingredientQueryParams);

      const response = await fetchData(`${API_URL}/${RECIPES}/findByIngredients`, `&ingredients=${ingredientQueryParams}&number=9`)
      const data = await response.json()

      console.log(data)
      setRecipes(data)
    } catch (error) {
      console.log(error);
    }
  }

  if (isModelLoading) {
    return <Text>Model loading...</Text>
  }

  const uploadImage = e => {
    const { files } = e.target
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0])
      setImageURL(url)
    } else {
      setImageURL(null)
    }
  }

  const identifyImage = async () => {
    const results = await model.classify(imageRef.current)
    setImageResults(results)
  }

  const handleImageResult = resultName => {
    setSelectedImageResult('')
    setSelectedImageResult(resultName)
  }

  // console.log(selectedImageResult);

  return (
    <>
      <Modal
        centered 
        style={{ zIndex: 350 }}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Ingredient"
      >
        <Tabs defaultValue="text">
          <Tabs.List>
            <Tabs.Tab value="text" icon={<IconForms size={30} />} onClick={() => setSelectedImageResult('')}>Text</Tabs.Tab>
            <Tabs.Tab value="camera" icon={<IconPhoto size={30} />} onClick={() => form.reset()}>Camera</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="text" pt="md">
            <form onSubmit={form.onSubmit(addUserIngredient)}>
              <TextInput label="Ingredient" placeholder="Carrot" {...form.getInputProps('textIngredient')} />
              <Space h="md" />
              <Button color="green" type="submit">Add ingredient</Button>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="camera" pt="md">
            <div className="input-holder" style={{ marginBottom: '20px' }}>
              <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} />
            </div>
            <div className="main-content">
              <div className="image-holder" style={{ marginBottom: '20px' }}>
                {imageURL && <img style={{ maxWidth: '400px' }} src={imageURL} alt="Upload Preview" crossOrigin='anonymous' ref={imageRef} />}
              </div>
              {imageResults.length > 0 &&
                <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {imageResults.map((result, index) => {
                    return (
                      <Card 
                        key={result.className}
                        shadow="sm" 
                        p="" 
                        radius="md" 
                        withBorder
                        onClick={() => handleImageResult(result.className)}
                        style={{ 
                          cursor: 'pointer',
                          backgroundColor: selectedImageResult === result.className ? '#BFFFC9' : 'white' 
                        }}
                      >
                        <Text size="md">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {/* <ThemeIcon color="green"> */}
                              {selectedImageResult === result.className
                                ? <IconCircleCheck color="green" />
                                : <IconCircleDashed color="green" />
                              }
                            {/* </ThemeIcon> */}
                            <span style={{ textTransform: 'capitalize' }}>{result.className}</span>
                            {index === 0 && <>(Best Guess)</>}
                          </div>
                        </Text>
                      </Card>
                    )
                  })

                  }
                </Box>
              }
            </div>
            {imageURL && imageResults.length === 0 && <Button onClick={identifyImage}>Identify Ingredient</Button>}
            {imageResults.length > 0 &&
              selectedImageResult !== ''
                ? <Button color="green" onClick={addUserIngredient}>Add Ingredient</Button>
                : <Button color="green" disabled>Add Ingredient</Button>
            }
          </Tabs.Panel>
        </Tabs>
      </Modal>

    <Center>
      <Box sx={{ maxWidth: 1000 }}>
        <Avatar color="cyan" radius={100} size={150}>{userDetails.initials}</Avatar>
        <Space h={15} />
        <Text align="center">{userDetails.firstName} {userDetails.lastName}</Text>
        <Space h={30} />
        <Title order={3}>My Ingredients</Title>
      </Box>
    </Center>
    <Space h={15} />
    <Center>
    <Group>
          <Button onClick={() => setOpened(true)}>Add Ingredient</Button>
          <Button onClick={getRecipesByUserIngredients}>Find recipes</Button>
        </Group>
    </Center>

    <Space h={30} />
    <Center>
      
      <Group>
        {userIngredients.map(userIngredient => (
          <Card 
            key={userIngredient.id}
            shadow="sm" 
            p="" 
            radius="md" 
            withBorder
          >
            <Text size="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {userIngredient.name}
                <ThemeIcon color="red" variant="light">
                  <IconTrash 
                    onClick={() => deleteUserIngredient(userIngredient.id)}
                    style={{ cursor: 'pointer' }} 
                  />
                </ThemeIcon>
              </div>
            </Text>
          </Card>
        ))}
      </Group>
    </Center>

    <Space h={30} />
    <Center>
      <Space h="xl" />
        <Grid>
          {recipes.length > 0 
            ? recipes.map(recipe => (
              <Grid.Col md={6} lg={4} key={recipe.id}>
              <RecipeCard 
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  readyInMinutes={recipe.readyInMinutes}
                  servings={recipe.servings}
              />
              </Grid.Col>
            ))
            : (
              <Text>Add ingredients to search for recipes</Text>
            )
          }
        </Grid>
      </Center>
    </>
  )
}

export default UserProfile