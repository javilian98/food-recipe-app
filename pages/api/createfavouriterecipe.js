import axios from 'axios'

export async function createFavouriterecipe(req, res) {
    try {
        const response = await axios.post('http://localhost:8080/api/favouriterecipes')
        const data = response.data

        console.log(data)

        res.status(200).json(data) 
    } catch (error) { 
        console.log(error);
    }
}