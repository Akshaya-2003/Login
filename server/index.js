// index.js
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bcrypt from 'bcrypt';
import { PORT, mongoDBURL } from "./config.js";
import { Login, BuildingConstruction, Property, Scholarship, CropLoan, SoilTesting } from "./models/Employee.js";
import loginRoutes from './routes/loginRoutes.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send("Hello"); 
});

app.post('/login', (request, response) => {
    console.log('Received login request:', request.body);

    const { email, password } = request.body;
    Login.findOne({ email: email })
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.error('Login error:', err);
                        response.status(500).json({ error: 'Internal Server Error' });
                    } else if (result) {
                        response.json("Success");
                    } else {
                        response.json("Password is incorrect");
                    }
                });
            } else {
                response.json("No record found");
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});

app.post('/register', async (request, response) => {
    console.log('Received registration request:', request.body);

    try {
        const { username, email, password } = request.body;

        // Check if the user already exists
        const existingUser = await Login.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ error: 'User already exists' });
        }

        // If the user doesn't exist, proceed with registration
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Login.create({
            username,
            email,
            password: hashedPassword,
        });

        console.log('Registration successful:', user);
        response.json(user);
    } catch (error) {
        console.error('Registration error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/building-construction-approval', async (request, response) => {
    console.log('Received building construction approval request:', request.body);

    try {
        const { userId, name, district, area, siteno, buildingType } = request.body;

        // Validate userId and perform any additional validation or processing as needed

        // Example: Insert data into a MongoDB collection with user reference
        const constructionData = await BuildingConstruction.create({
            user: userId,
            name,
            district,
            area,
            siteno,
            buildingType,
        });

        console.log('Building construction approval data recorded:', constructionData);
        response.json(constructionData);
    } catch (error) {
        console.error('Building construction approval error:', error);
        response.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

app.post('/submitCropLoan', async (req, res) => {
    try {
      const cropLoanData = req.body;
      const newCropLoan = new CropLoan(cropLoanData);
      await newCropLoan.save();
      res.status(201).json({ message: 'CropLoan submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/submitProperty', async (req, res) => {
    try {
      const { propertyName, propertyID, phoneNumber, kathaType } = req.body;
  
      // Validate the data if needed
  
      const newProperty = new Property({
        propertyName,
        propertyID,
        phoneNumber,
        kathaType,
      });
  
      await newProperty.save();
      res.status(201).json({ message: 'Property submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/submitScholarship', async (req, res) => {
    try {
        const scholarshipData = req.body;

        if (!scholarshipData.aadhaar) {
            return res.status(400).json({ error: 'Aadhaar is required' });
        }

        // Hash Aadhaar number
        const hashedAadhaar = await hashAadhaar(scholarshipData.aadhaar);

        // Replace the original Aadhaar with the hashed one
        scholarshipData.aadhaar = hashedAadhaar;

        // Add Aadhaar validation logic here if needed

        const newScholarship = new Scholarship(scholarshipData);
        await newScholarship.validate();
        await newScholarship.save();
        res.status(201).json({ message: 'Scholarship submitted successfully' });
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to hash Aadhaar number using bcrypt
const hashAadhaar = async (aadhaar) => {
    try {
        const saltRounds = 10; // Adjust the number of salt rounds as needed
        const hashedAadhaar = await bcrypt.hash(String(aadhaar), saltRounds);
        return hashedAadhaar;
    } catch (error) {
        console.error('Error hashing Aadhaar:', error);
        throw error;
    }
};

app.post('/submitSoilTesting', async (req, res) => {
    try {
        const soilTestingData = req.body;

        // Make sure 'districtName' is present in soilTestingData
        if (!soilTestingData.districtName) {
            return res.status(400).json({ error: 'districtName is required' });
        }

        const newSoilTesting = new SoilTesting(soilTestingData);
        await newSoilTesting.validate();
        await newSoilTesting.save();
        res.status(201).json({ message: 'Soil Testing data submitted successfully' });
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
});


mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
