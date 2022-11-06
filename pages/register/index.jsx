import { useState } from 'react'
import Link from 'next/link';
import { TextInput, PasswordInput, NumberInput, Select, Checkbox, Button, Group, Box, Space, Title, Center, Stepper, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CLIENT_URL } from '../../constants/constants'

function Register() {

    const router = useRouter()

    const [active, setActive] = useState(0);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',

            firstName: '',
            lastName: '',
            age: 0,
            sex: 'M',
            heightCM: 0,
            weightKG: 0,
            
            // diet: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
                    password: values.password.length < 6 ? 'Password must include at least 6 characters' : null,
                };
            }

            if (active === 1) {
                return {
                    firstName: values.firstName.length < 2 ? 'First name must have at least 2 letters' : null,
                    lastName: values.lastName.length < 2 ? 'Last name must have at least 2 letters' : null,
                    sex: values.sex === '' ? 'Select your gender' : null,
                    age: values.age < 18 ? 'You must be at least 18 to register' : null,
                    weightKG: values.weightKG === 0 ? 'Weight cannot be less than 0 kg' : null,
                    heightCM: values.heightCM === 0 ? 'Weight cannot be less than 0 cm' : null,
                };
            }

            // if (active === 2) {
            //     return {
            //         diet: values.diet === '' ? 'Select your diet' : null,
            //     };
            // }

            return {};
        },
    });

    const nextStep = () => {
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 2 ? current + 1 : current;
        })
    };

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleSubmit = async () => {
        try {  
            const { firstName, lastName, email, password, age, sex, heightCM, weightKG } = form.values
            const response = await axios.post(`${CLIENT_URL}/api/auth/register`, {
                firstName,
                lastName,
                email, 
                password, 
                age, 
                sex, 
                heightCM, 
                weightKG
            })

            const { status } = response.data

        

            if (status === 200) {
                router.push({
                    pathname: '/login',
                    query: { success: true }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <div className="register">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Box sx={{ maxWidth: 650 }} mx="auto"> 
                <Space h={20} />
                <Center>
                   <Title order={1}>Register Account</Title>
                </Center>
                <Space h={50} />
                <Stepper active={active} breakpoint="sm" color="green">
                    <Stepper.Step label="First step" description="Profile settings">
                        <Space h="xl" />
                        <Box sx={{ maxWidth: 350 }} mx="auto">
                            <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
                            <PasswordInput
                                mt="md"
                                label="Password"
                                placeholder="Password"
                                {...form.getInputProps('password')}
                            />
                        </Box>
                    </Stepper.Step>
            
                    <Stepper.Step label="Second step" description="Personal information">
                        <Space h="xl" />
                        <Box sx={{ maxWidth: 350 }} mx="auto">
                            <TextInput label="First Name" placeholder="First Name" {...form.getInputProps('firstName')} />
                            <TextInput mt="md" label="Last Name" placeholder="Last Name" {...form.getInputProps('lastName')} />
                            <Select
                                mt="md"
                                label="Your gender"
                                placeholder="Select your gender"
                                data={[
                                    { value: 'M', label: 'Male' },
                                    { value: 'F', label: 'Female' },
                                ]}
                                {...form.getInputProps('sex')}
                            />
                            <NumberInput
                                mt="md"
                                label="Age"
                                placeholder="Age"
                                min={0}
                                max={99}
                                {...form.getInputProps('age')}
                            />
                            <NumberInput
                                mt="md"
                                label="Weight (kg)"
                                placeholder="Weight (kg)"
                                min={0}
                                {...form.getInputProps('weightKG')}
                            />
                            <NumberInput
                                mt="md"
                                label="Height (cm)"
                                placeholder="Height (cm)"
                                min={0}
                                {...form.getInputProps('heightCM')}
                            />
                        </Box>
                    </Stepper.Step>
            
                    {/* <Stepper.Step label="Final step" description="Personal Diet">
                        <Select
                            label="Your type of diet"
                            placeholder="Select your diet"
                            data={[
                                { value: 'all', label: 'React' },
                                { value: '', label: 'Angular' },
                                { value: 'svelte', label: 'Svelte' },
                                { value: 'vue', label: 'Vue' },
                            ]}
                        />
                    </Stepper.Step> */}
                    {/* <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.values, null, 2)}
                    </Code>
                    </Stepper.Completed> */}
                </Stepper>
                
                <Box sx={{ maxWidth: 350 }} mx="auto">
                    <Group position="right" mt="xl">
                        {active !== 0 && (
                        <Button variant="default" onClick={prevStep}>
                            Back
                        </Button>
                        )}
                        {active !== 2 
                            ? <Button color="green" onClick={nextStep}>Next step</Button>
                            : <Button color="green"onClick={handleSubmit}>Register</Button>
                        }
                    </Group>
                </Box>
            </Box>
            </form>

            <Space h="xl" />
                <Center>
                <Link href="/">
                    <Button variant="subtle">Back to home</Button>
                </Link>
                <Link href="/login">
                    <Button variant="subtle">Login</Button>
                </Link>
            </Center>
        </div>
      );
}

export default Register