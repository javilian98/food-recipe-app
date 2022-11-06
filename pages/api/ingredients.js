import axios from 'axios'

export default async function ingredients(req, res) {
    try {
        const response = await axios.get(`${process.env.SERVER_URL}/api/ingredients`)
        const data = response.data

        console.log(data)

        res.status(200).json(data) 
    } catch (error) { 
        console.log(error);
    }
}