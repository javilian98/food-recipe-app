import React from 'react'
import { TextInput, PasswordInput, Checkbox, Button, Group, Box, Space, Title, Center } from '@mantine/core';
import { useForm } from '@mantine/form';

function Register() {
    const form = useForm({
        initialValues: {
          email: '',
          termsOfService: false,
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          confirmPassword: (value, values) => value !== values.password ? 'Passwords did not match' : null,
        },
      });
 
    return (     
        <div className="login">
            <Box sx={{ maxWidth: 300 }} mx="auto">   
                <Center>
                    <Title order={1}>Register Account</Title>
                </Center>
                <Space h={30} />
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                    <Space h={8} /> 
                    <PasswordInput
                        withAsterisk
                        mt="sm"
                        label="Confirm password"
                        placeholder="Confirm password"
                        {...form.getInputProps('confirmPassword')}
                    />

                    <Group position="right" mt="md">
                        <Button color="green" type="submit">Login</Button>
                    </Group>
                </form>
            </Box>
        </div>
    )
}

export default Register