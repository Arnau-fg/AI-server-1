// Author: Arnau Fernandez Gil
// Institut Pedralbes 2024 2DAW

// Importing required modules
import express from "express"; // Importing Express framework
import cors from "cors"; // Importing CORS middleware
import { getAIResponse } from "./communicationManager.js"; // Importing the function that communicates with the AI

// Initializing Express application
const app = express();

// Applying CORS middleware to allow cross-origin requests
app.use(cors());

// Parsing incoming requests with JSON payloads
app.use(express.json());

// Defining the port number for the server to listen on
const port = 3000;

// Handling POST requests to the root endpoint ('/')
app.post('/', async (req, res) => {
  
  // Setting the response header with content type and encoding information, chunked allows the information to be streamed
  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  });

  // Calling an asynchronous function to get a response from the AI, passing the content from the request body
  const response = await getAIResponse(req.body.content);

  // Iterating over the response body in chunks, stream.body is required, because the chunk data is stored in the body attribute
  for await (const chunk of response.body) {
    
    // Converting each chunk of data from buffer to a string
    const jsonString = Buffer.from(chunk).toString('utf8');

    // Checking if the length of the string exceeds a certain threshold, this is becuse the last info sent throws an error when trying to parse it
    if (jsonString.length > 270) {
      
      // Slicing the string to remove some metadata, this way it can be parsed correctly
      const reducedString = jsonString.slice(6);

      // Writing the reduced string to the response
      res.write(reducedString);
    }
  }

  // Logging a message indicating that the processing is done
  console.log("done");

  // Ending the response
  res.end();
});

// Starting the server and listening on the defined port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});