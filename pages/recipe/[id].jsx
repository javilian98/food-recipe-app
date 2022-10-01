import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Card, Image, Overlay, Title, Text, Group, ThemeIcon, Space, Container, Grid, ActionIcon, Center, Accordion, Avatar } from '@mantine/core'
import { IconAlarm, IconSoup, IconCircleMinus, IconCirclePlus, IconCheck, IconHeart, IconConfetti } from '@tabler/icons';

import { API_URL, RECIPES } from '../../constants/constants'
import { fetchData } from '../../util/helper'

function Recipe() {

    const router = useRouter()

    const [details, setDetails] = useState()
    const [active, setActive] = useState(1);


    useEffect(() => {
        getDetails()
    }, [router.query.id]) 

    const getDetails = async () => {
        const api = await fetchData(`${API_URL}/${RECIPES}/${router.query.id}/information`)
        const data = await api.json()
        console.log(data)
        setDetails(data)
    }

    return (
        <div className="recipe">
            <Card radius="lg">
                <Overlay opacity={0.3} color="#000" zIndex={1} />
                <Card.Section sx={{ position: 'relative' }}>
                    <Image
                        src={details?.image}
                        height={300}
                        alt="Norway"
                    />

                    <Title order={2} color="#fff" sx={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 5 }}>{details?.title}</Title>
                </Card.Section>
            </Card>
            <Space h="xl" />
            <Group position="apart" spacing="xl">
                <Group>
                    <Group spacing="xs">
                        <ThemeIcon color="green" variant="light">
                            <IconAlarm size={60} />
                        </ThemeIcon>
                
                        <Text size="xl">{details?.readyInMinutes} mins</Text>
                    </Group>

                    <Group spacing="xs">
                        <ThemeIcon color="green" variant="light">
                            <IconSoup size={60} />
                        </ThemeIcon>
                        
                        <Text size="xl">{details?.servings} servings</Text>
                        <Group spacing={5}>
                            <ThemeIcon color="green" variant="light">
                                <ActionIcon color="green">
                                    <IconCircleMinus size={30} />
                                </ActionIcon>
                            </ThemeIcon>
                            <ThemeIcon color="green" variant="light">
                                <ActionIcon color="green">
                                    <IconCirclePlus size={30} />
                                </ActionIcon>
                            </ThemeIcon>
                        </Group>
                    </Group>
                </Group>

                <Group>
                    <ActionIcon color="red">
                        <ThemeIcon color="red" variant="dark" radius="xl" size="xl">
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
                    {details?.extendedIngredients.map((ingredient, index) => {
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
                {details?.analyzedInstructions[0].steps.map((step, index) => (
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
