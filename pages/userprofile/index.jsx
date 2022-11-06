import { Grid, Avatar, Center, Card, Box, Group, Text, Space, Title, Button, Modal, Tabs, TextInput, ThemeIcon } from '@mantine/core'
import { useForm } from '@mantine/form';
import { IconForms, IconPhoto, IconTrash } from '@tabler/icons';
import { useState, useEffect } from 'react'

import { showNotification } from '@mantine/notifications';

import { useAccessTokenStore, useUserIngredientsStore } from '../../stores/store'

import { fetchData } from '../../util/helper'
import { API_URL, RECIPES } from '../../constants/constants'

import axios from 'axios';
import RecipeCard from '../../components/recipes/RecipeCard/RecipeCard';

function UserProfile() {
  const userDetails = useAccessTokenStore(state => state.userDetails)
  const userIngredients = useUserIngredientsStore(state => state.userIngredients)
  const setUserIngredients = useUserIngredientsStore(state => state.setUserIngredients)
  const resetUserIngredients = useUserIngredientsStore(state => state.resetUserIngredients)
  const removeUserIngredient = useUserIngredientsStore(state => state.removeUserIngredient)

  const [opened, setOpened] = useState(false);
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getUserIngredients()
  }, [])

  const form = useForm({
    initialValues: {
      textIngredient: '',
    },

    validate: {
      textIngredient: (value) => (value.length < 2 ? 'Ingredient name is too short' : null),
    },
  })

  const getUserIngredients = async () => {
    try {
      resetUserIngredients()
      const response = await axios.get('http://localhost:3000/api/useringredients/getuseringredients')
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

      const { textIngredient } = form.values

      console.log(textIngredient);

      const response = await axios.post(`http://localhost:3000/api/useringredients/adduseringredient`, {
        name: textIngredient
      })

      const { status, success_message } = response.data

      if (status === 200) {
        setUserIngredients({ id: userIngredients.length, name: textIngredient })

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

      const response = await axios.delete('http://localhost:3000/api/useringredients/deleteuseringredient', {
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
            <Tabs.Tab value="text" icon={<IconForms size={30} />}>Text</Tabs.Tab>
            <Tabs.Tab value="camera" icon={<IconPhoto size={30} />}>Camera</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="text" pt="md">
            <form onSubmit={form.onSubmit(addUserIngredient)}>
              <TextInput label="Ingredient" placeholder="Carrot" {...form.getInputProps('textIngredient')} />
              <Space h="md" />
              <Button color="green" type="submit">Add ingredient</Button>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="camera" pt="md">
            Gallery tab content
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