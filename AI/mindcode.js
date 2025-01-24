
import express from "express"; // Importing Express framework
import cors from "cors"; // Importing CORS middleware


// Initializing Express application
const app = express();

// Applying CORS middleware to allow cross-origin requests
app.use(cors());

// Parsing incoming requests with JSON payloads, also allows to get body info from requests
app.use(express.json());

// Defining the port number for the server to listen on
const port = 3000;

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