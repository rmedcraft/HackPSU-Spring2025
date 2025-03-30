import cors from 'cors';
import express, { Express } from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
// import Resume from './mongo.js';
import { Db, MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const app: Express = express();
const PORT = 3000;
const mongoURI: string = process.env.MONGO_URI!;

const client = new MongoClient(mongoURI);

await client.connect();
let db: Db;

try {
    if (!db) {
        await client.connect();
        db = client.db("Employr");
        console.log("Connected to MongoDB!! Woah!! :P", db.databaseName);
    }
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}

// Allow all origins (for development purposes, you can restrict this to specific origins in production)
app.use(cors({
    origin: 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST', "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', "Authorization"],
}));

app.options('*', cors());

app.use(express.json());

// console.log(mongoURI);
// mongoose.connect(mongoURI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(error => console.error('Could not connect to MongoDB:', error));

// Route to get all students
app.get('/resumes', async (req, res) => {
    try {
        const collection = db.collection("Resumes");
        const resumes = await collection.find({}).toArray();
        // const resumes = await Resume.find({ name: "Chad Jobsearcher" });  // Filter by a specific name
        // const resumes = await Resume.findOne({ name: "Chad Jobsearcher" });
        console.log(resumes);
        res.json(resumes);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
