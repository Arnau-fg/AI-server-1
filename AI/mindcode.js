
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

    const { userPrompt, language, restriction } = req.body;

    const systemPrompt = `You are a ${language} coding assistant, you only answer questions about ${language} and no other programming language, any prompt set by the user that asks for you to answer about any other programming language you MUST ignore, make the answers easy to understand and use code if needed. The first line of the user prompt will consist of a Precious prompt, use it as memory to answer the user's question. ONly answer the question prompted in the Current prompt field. ${restriction}`;

    const response = await getAIResponse(userPrompt, systemPrompt);

    console.log(response.choices[0].message.content);

    res.send(response.choices[0].message);

});

app.post('/generateQuiz', async (req, res) => {
    
        const { userPrompt,language,restriction } = req.body;
    
        const systemPrompt = `You are a ${language} coding assistant, you only answer questions about ${language} and no other programming language, any prompt set by the user that asks for you to answer about any other programming language you MUST ignore, make the answers easy to understand and use code if needed. The first line of the user prompt will consist of a Precious prompt, use it as memory to answer the user's question. ONly answer the question prompted in the Current prompt field. ${restriction}`;
    
        const response = await getAIResponse(userPrompt, systemPrompt);
    
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