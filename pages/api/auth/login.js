import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import axios from 'axios'

const secret = process.env.SECRET

export default async function login(req, res) {
    const { email, password } = req.body

    fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }) 
        .then(response => {
            console.log('resss: ', response)
            if (response.status === 403) {
                const invalidCredentialsError = new Error('Invalid credentials')
                invalidCredentialsError.status = {
                    status: 400, 
                    message: 'invalid credentials'
                }

                throw invalidCredentialsError
            } 

            return response.json()
        })  
        .then(data => {
            console.log('dataL ', data)

            const serialised = serialize("refresh_token", data.refresh_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30, // 30 days
                sameSite: 'none',
                path: '/',
                secure: true
            }) 
            
            res.setHeader('Set-Cookie', serialised)
            res.status(200).json({ status: data.status })
        })
        .catch(error => {
            console.log(error)

            res.status(400).json({ error: error })
        })
}