// loginRoutes.js
import express from "express";
import cors from 'cors';
import { Login } from "../models/Employee.js";

const router = express.Router();

// Enable CORS for this specific route
router.use(cors());

// Change the method to handle POST requests
router.post('/register', async (request, response) => {
    try {
        if (!request.body.username || !request.body.password || !request.body.email) {
            return response.status(400).send({
                message: 'Send all required fields: username, password, email',
            });
        }
        
        const newLogin = {
            username: request.body.username,
            password: request.body.password,
            email: request.body.email
        };

        const login = await Login.create(newLogin);

        return response.status(201).send(login);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
