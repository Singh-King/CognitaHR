import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {GenerateTextController} from './src/controllers/generateTextController.js';

import { fileURLToPath } from 'url';
const app = express();


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './src/public')));

// View Engine Middleware
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

// GET Endpoint
app.get('/', (req, res) => {
    res.render('getUserName', { message: 'Welcome to the homepage' });
});

// POST Endpoint
app.post('/chat', (req, res) => {
    let userName = req.body.username;
    const generateTextController = new GenerateTextController(userName);
    const user = generateTextController.getUserData()
    if(Object.keys(user).length > 0){
        res.render('chat', {userName});
    } else{
        res.send('Not Authorized!!').statusCode(401);
    }
    
});

// POST Endpoint
app.post('/submit', async (req, res) => {
    const data = req.query;
    if(!data){
        res.render('getUserName', { message: 'Welcome to the homepage' })
    }
    const generateTextController = new GenerateTextController(data.username);
    const user = generateTextController.getUserData()
    const context = generateTextController.createContextForGPT3Model(user);
    const response = await generateTextController.getResponseFromGPT3Model(context, req.body.message);
    res.send(response.content);
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});