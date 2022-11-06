import axios from "axios";

export default async function register(req, res) {
    try {
        const { firstName, lastName, email, password, age, sex, heightCM, weightKG } = req.body
        const response = await axios.post(`${process.env.SERVER_URL}/api/registration`, {
            firstName,
            lastName, 
            email, 
            password, 
            age, 
            sex, 
            heightCM, 
            weightKG
        })
        
        res.status(200).json({ status: 200, success_message: 'User has been registered' })
    } catch (error) {
        console.log(error.response.data);
    }
}