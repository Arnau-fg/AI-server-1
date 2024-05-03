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

// Parsing incoming requests with JSON payloads, also allows to get body info from requests
app.use(express.json());

// Defining the port number for the server to listen on
const port = 3000;

// Handling POST requests to the root endpoint ('/')
app.post('/', async (req, res) => {

  // The system prompt tells the AI how to act
  const systemContent = "You are a professional recruiter and a digital portfolio expert, you work for an app called KnowMe, this app is the best portfilio creation app. You help people by aiding their requests to make a digital portfolio. The user will send you some categories. Have in mind the categories when creating your answer. You may recommend some components, such as 'Text' which are just plain text, some 'Title' which are titles often used as a plain Title or to separate sections, some 'Image' which are images and whose text correspond to the 'alt' text, some 'Video' which are videos, some 'Link' which contain links where you can assume they hav the correct link, some 'Timeline' which have dates and texts inside. Give 5 tips on how to create the portfolio. Give a direct answer without adding aditional information before or after the tips. Answer in Catalan. Don't add the english translation at the end. Use Emojis."
  // Counter o know how many tokens have been sent
  let tokenCounter = 0;

  // Setting the response header with content type and encoding information, chunked allows the information to be streamed
  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  });

  // Calling an asynchronous function to get a response from the AI, passing the content from the request body
  const response = await getAIResponse(systemContent, req.body.content);

  // Iterating over the response body in chunks, stream.body is required, because the chunk data is stored in the body attribute
  for await (const chunk of response.body) {

    // Converting each chunk of data from buffer to a string
    const jsonString = Buffer.from(chunk).toString('utf8');

    tokenCounter++;

    // Checking if the length of the string exceeds a certain threshold, this is becuse the last info sent throws an error when trying to parse it
    if (jsonString.length > 270) {

      // Slicing the string to remove some metadata, this way it can be parsed correctly
      const reducedString = jsonString.slice(6);

      // Writing the reduced string to the response
      res.write(reducedString);
    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  // Ending the response
  res.end();
});

app.post('/info', async (req, res) => {

  // The system prompt tells the AI how to act
  const systemContent = "You are a professional recruiter and a digital portfolio expert, you work for an app called KnowMe, this app is the best portfilio creation app. You help people by aiding their requests to make a digital portfolio. The user will send you some categories. Have in mind the categories when creating your answer. You may recommend some components, such as 'Text' which are just plain text, some 'Title' which are titles often used as a plain Title or to separate sections, some 'Image' which are images and whose text correspond to the 'alt' text, some 'Video' which are videos, some 'Link' which contain links where you can assume they hav the correct link, some 'Timeline' which have dates and texts inside. Give 5 tips on how to create the portfolio AND NOTHING ELSE. Give a direct answer without adding aditional information before or after the tips. Answer in Catalan. Don't add the english translation at the end. Don't add any upgrades at the end. Use Emojis."
  // Counter o know how many tokens have been sent
  let tokenCounter = 0;

  // Setting the response header with content type and encoding information, chunked allows the information to be streamed
  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  });

  // Calling an asynchronous function to get a response from the AI, passing the content from the request body
  const response = await getAIResponse(systemContent, req.body.content);

  // Iterating over the response body in chunks, stream.body is required, because the chunk data is stored in the body attribute
  for await (const chunk of response.body) {

    // Converting each chunk of data from buffer to a string
    const jsonString = Buffer.from(chunk).toString('utf8');

    tokenCounter++;

    // Checking if the length of the string exceeds a certain threshold, this is becuse the last info sent throws an error when trying to parse it
    if (jsonString.length > 270) {

      // Slicing the string to remove some metadata, this way it can be parsed correctly
      const reducedString = jsonString.slice(6);

      // Writing the reduced string to the response
      res.write(reducedString);
    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  // Ending the response
  res.end();
});
app.get('/test', (req, res) => {
  res.send("funciona")
})

// Starting the server and listening on the defined port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});