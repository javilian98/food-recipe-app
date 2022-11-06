import axios from 'axios'
import { SERVER_URL } from '../../constants/constants'

export default async function ingredients(req, res) {
    try {
        const response = await axios.get(`${SERVER_URL}/api/ingredients`)
        const data = response.data

        console.log(data)

        res.status(200).json(data) 
    } catch (error) { 
        console.log(error);
    }
}