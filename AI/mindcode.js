
import express from "express"; // Importing Express framework
import cors from "cors"; // Importing CORS middleware
import { getOllamaChatResponse, getAIResponse } from "./communicationManager.js"; // Importing the getOllamaChatResponse function from communicationManager.js

// Initializing Express application
const app = express();

// Applying CORS middleware to allow cross-origin requests
app.use(cors());

// Parsing incoming requests with JSON payloads, also allows to get body info from requests
app.use(express.json());

// Defining the port number for the server to listen on
const port = 3000;

app.post('/', async (req, res) => {

    const { userPrompt } = req.body;

    const response = await getAIResponse(userPrompt);

    console.log(response.choices[0].message.content);

    res.send(response.choices[0].message);

});

app.get('/test', (req, res) => {
    res.send("funciona")
})

app.get('/ia/test', (req, res) => {
    res.send("rutes malament")
})

// Starting the server and listening on the defined port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});