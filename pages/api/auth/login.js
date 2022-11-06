import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import axios from 'axios'
import { useAccessTokenStore } from '../../../stores/store'
import { SERVER_URL } from '../../../constants/constants'

const secret = process.env.SECRET

export default async function login(req, res) {
    const { email, password } = req.body

    fetch(`${SERVER_URL}/api/auth/login`, {
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

            const { status, access_token, refresh_token } = data

            const serialisedAccessToken = serialize("access_token", access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1, // 1 day
                sameSite: 'none',
                path: '/',
                secure: true
            }) 

            const serialisedRefreshToken = serialize("refresh_token", refresh_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30, // 30 days
                sameSite: 'none',
                path: '/',
                secure: true
            })  
            
            res.setHeader('Set-Cookie', [serialisedAccessToken, serialisedRefreshToken])
            res.status(200).json({ 
                status,
                access_token
            })
        })
        .catch(error => {
            console.log(error)

            res.status(400).json({ error: error })
        })
}