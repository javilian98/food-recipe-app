import React, { useState } from 'react'
import Router , {useRouter}  from 'next/router';
import { TextInput, PasswordInput, Checkbox, Button, Group, Box, Space, Title, Center, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import Link from 'next/link';
import { useAccessTokenStore } from '../../stores/store';

function Login() {
    const router = useRouter()

    const setAccessToken = useAccessTokenStore(state => state.setAccessToken)
    const accessToken = useAccessTokenStore(state => state.accessToken)

    const form = useForm({
        initialValues: {
          email: '',
          password: ''
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          confirmPassword: (value, values) => value !== values.password ? 'Passwords did not match' : null,
        },
    });

    const [formErrorMsg, setFormErrorMsg] = useState('') 
 
    const handleSubmit = async (e) => {
        e.preventDefault()

  
        // fetch('http://localhost:3000/api/login', {  
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: form.values.email,
        //         password: form.values.password
        //     }) 
        // })
        // .then(res => res.json())
        // .then(data => { 
        //     console.log(data)

        //     if (data.status === 'OK') {
        //         router.push('/')
        //     }
        // })
        // .catch(error => console.log('ERRORS', error))

        try {
            setFormErrorMsg('')
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email: form.values.email,
                password: form.values.password
            })
            
            const { status, access_token } = response.data
 
            // console.log(access_token) 

            if (status === 'OK') {
                setAccessToken(access_token)
                router.push('/')
            }
        } catch (error) {
            console.log('error:L::', error)

            setFormErrorMsg(error.response.data.error.status.message)
        }
    };


    return (   
        <div className="login"> 
            <Box sx={{ maxWidth: 300 }} mx="auto">  
                <Center>
                    <Title order={1}>Login</Title>
                </Center>
                <Space h={30} />
                <Center>
                    <Text color="red">{formErrorMsg}</Text>
                </Center>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}  
                    />
                    <Space h={15} /> 
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        {...form.getInputProps('password')}
                    />

                    <Group position="right" mt="md">
                        <Button color="green" type="submit" onClick={handleSubmit}>Login</Button>
                    </Group>
                </form>
                <Space h="xl" />
                <Center>
                    <Link href="/">
                        <Button variant="subtle">Back to home</Button>
                    </Link>
                </Center>
            </Box>
        </div>
    )
}


export default Login