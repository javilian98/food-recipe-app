import axios from 'axios'

export default async function ingredients(req, res) {
    try {
        const response = await axios.get('http://localhost:8080/api/ingredients')
        const data = response.data

        console.log(data)

        res.status(200).json(data) 
    } catch (error) { 
        console.log(error);
    }
}