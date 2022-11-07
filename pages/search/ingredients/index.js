import { useEffect, useState } from 'react';
import { Stepper, Button, Group, Checkbox, Title, Space, Container, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';

import { fetchData } from '../../../util/helper'
import { API_URL, RECIPES, CLIENT_URL } from '../../../constants/constants'
import RecipeCard from '../../../components/recipes/RecipeCard/RecipeCard';
import axios from 'axios';

function SearchByIngredients() {
  const [active, setActive] = useState(0);

//   const [ingredients, setIngredients] = useState({
//     meat: [],
//     seafood: [],
//     vegetable: [],
//     dairy: [],
//     otherAnimalProduct: [],
//   })

//   const ingredients = {
//     meats: [
//         'Beef', 'Chicken', 'Duck', 'Pork', 'Lamb', 'Venison',
//     ],
//     seafoods: [
//         'Salmon', 'Tuna', 'Mackerel', 'Cod', 'Squid', 'Prawn',
//     ],
//     vegetables: [
//         'Asparagus', 'Bean', 'Broccoli', 'Cauliflower', 'Cabbage', 'Egg Plant', 'Onion', 'Potato', 'Tomato', 'Kimchi',
//     ],
//     dairies: [
//         'Butter', 'Cheese', 'Cream', 'Milk', 'Yoghurt',
//     ],
//     fruits: [
//         'Apple', 'Avocado', 'Banana', 'Blackberry', 'Blueberry', 'Grapefruit', 'Orange', 'Pineapple', 'Lemon', 'Lime', 'Strawberry'
//     ],
//     others: [
//         'Miso', 'Egg', 
//     ]
//   }

  const [meats, setMeats] = useState([])
  const [seafoods, setSeafoods] = useState([])
  const [vegetables, setVegetables] = useState([])
  const [dairies, setDairies] = useState([])
  const [fruits, setFruits] = useState([])
  const [others, setOthers] = useState([])
  const [ingredients, setIngredients] = useState([])

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    if (active === 1) {
        console.log('active is 1')
        getRecipesByIngredients()
    }
  }, [active])

  useEffect(() => {
    console.log('fetch ingredients')
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    const response = await axios.get(`${CLIENT_URL}/api/ingredients`)
    const data = response.data

    setIngredients(data)
  }

    const getRecipesByIngredients = async () => {
        const ingredientsSelected = [
            ...meats, 
            ...seafoods, 
            ...vegetables, 
            ...dairies, 
            ...fruits, 
            ...others
        ]

        const ingredientQueryParams = ingredientsSelected.map((ingredient, index) => {
            if (index !== 0) {
                ingredient = '+'+ingredient
            }

            return ingredient
        }).join(',')

        console.log(ingredientQueryParams);

        const response = await fetchData(`${API_URL}/${RECIPES}/findByIngredients`, `&ingredients=${ingredientQueryParams}&number=9`)
        const data = await response.json()

        console.log(data)
        setRecipes(data)
    }

    const nextStep = () => {
        setActive((current) => {
        //   if (form.validate().hasErrors) {
        //     return current;
        //   }
            return current < 2 ? current + 1 : current;
        });
    } 

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
        <Container fluid>
        <Space h="sm" />
      <Stepper active={active} breakpoint="sm" color="green">
        <Stepper.Step label="Select Ingredients" description="Find what is in your refrigerator">
            <Space h="xl" />
            <Title order={4}>Meat</Title>
            <Checkbox.Group 
                value={meats} 
                onChange={setMeats}
            >
                {ingredients?.meats?.map(meat => (
                    <Checkbox key={meat.id} value={meat.name} label={meat.name} />
                ))}
            </Checkbox.Group>

            <Space h="xl" />
            <Title order={4}>Seafood</Title>
            <Checkbox.Group 
                value={seafoods} 
                onChange={setSeafoods}
            >
                {ingredients.seafoods?.map(seafood => (
                    <Checkbox key={seafood.id} value={seafood.name} label={seafood.name} />
                ))}
            </Checkbox.Group>

            <Space h="xl" />
            <Title order={4}>Vegetables</Title>
            <Checkbox.Group 
                value={vegetables} 
                onChange={setVegetables}
            >
                {ingredients.vegetables?.map(vegetable => (
                    <Checkbox key={vegetable.id} value={vegetable.name} label={vegetable.name} />
                ))}
            </Checkbox.Group>

            <Space h="xl" />
            <Title order={4}>Dairy</Title>
            <Checkbox.Group 
                value={dairies} 
                onChange={setDairies}
            >
                {ingredients.dairies?.map(dairy => (
                    <Checkbox key={dairy.id} value={dairy.name} label={dairy.name} />
                ))}
            </Checkbox.Group>

            <Space h="xl" />
            <Title order={4}>Fruits</Title>
            <Checkbox.Group 
                value={fruits} 
                onChange={setFruits}
            >
                {ingredients.fruits?.map(fruit => (
                    <Checkbox key={fruit.id} value={fruit.name} label={fruit.name} />
                ))}
            </Checkbox.Group>

            <Space h="xl" />
            <Title order={4}>Others</Title>
            <Checkbox.Group 
                value={others} 
                onChange={setOthers}
            >
                {ingredients.others?.map(other => (
                    <Checkbox key={other.id} value={other.name} label={other.name} />
                ))}
            </Checkbox.Group>

        </Stepper.Step>

        <Stepper.Step label="Related Recipes" description="Based on your ingredients">
            
                <Space h="xl" />
                <Title order={2}>Related Recipes</Title>
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
        </Stepper.Step>

        {/* <Stepper.Step label="Start Cooking" description="">
          
        </Stepper.Step> */}
        {/* <Stepper.Completed>
          Completed!
        </Stepper.Completed> */}
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 1 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
      </Container>
    </>
  );
}

export default SearchByIngredients