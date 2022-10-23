import axios from 'axios'

export async function getFavouriterecipes(req, res) {
    try {
        const response = await axios.get('http://localhost:8080/api/favouriterecipes')
        const data = response.data

        console.log(data)

        res.status(200).json(data) 
    } catch (error) { 
        console.log(error);
    }
}