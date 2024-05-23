// Author: Arnau Fernandez Gil
// Institut Pedralbes 2024 2DAW

// Importing required modules
import express from "express"; // Importing Express framework
import cors from "cors"; // Importing CORS middleware
import { getAIResponse, getCreativeAIResponse } from "./communicationManager.js"; // Importing the function that communicates with the AI


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

  let finalMessage = "";

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

      let msg = JSON.parse(reducedString);

      finalMessage += msg.choices[0].delta.content;

    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  console.log("final message: ", finalMessage);

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

  let finalMessage = "";

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

      let msg = JSON.parse(reducedString);

      finalMessage += msg.choices[0].delta.content;

    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  console.log("final message: ", finalMessage);

  // Ending the response
  res.end();
});

app.post('/genera', async (req, res) => {
  // The system prompt tells the AI how to act
  const systemContent = "You are a professional recruiter and a digital portfolio expert, you work for an app called KnowMe, this app is the best portfilio creation app. You help people by aiding their requests to make a digital portfolio. The user will send you an object, some data and some categories. Have in mind the categories when creating your answer. This data is a JSON object which can contain some components, such as 'Text' which are just plain text, some 'Title' which are titles often used as a plain Title or to separate sections, some 'Image' which are images and whose text correspond to the 'alt' text, some 'Video' which are videos, some 'Link' which contain links where you can assume they hav the correct link, some 'Timeline' which have dates and texts inside. This data is what they already have in their portfolio. This data is ordered by how far up in the portfolio it is. Locate the given object inside the data and take note of its sorounding since it is it's context. Give an example of some info that would fit in the text of the object. Do not have in mind the object content when generating your response. YOU ARE NOT THE PERSON YOU ARE TRYING TO HELP. Give ONLY the text, nothing else. Answer in Catalan. Don't add the english translation at the end";
  // Counter o know how many tokens have been sent
  let tokenCounter = 0;

  // Setting the response header with content type and encoding information, chunked allows the information to be streamed
  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  });

  // Calling an asynchronous function to get a response from the AI, passing the content from the request body
  const response = await getCreativeAIResponse(systemContent, req.body.content);

  let finalMessage = "";

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

      let msg = JSON.parse(reducedString);

      finalMessage += msg.choices[0].delta.content;

    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  console.log("final message: ", finalMessage);

  // Ending the response
  res.end();
})

app.post('/millora', async (req, res) => {
  // The system prompt tells the AI how to act
  const systemContent = "You are a professional recruiter and a digital portfolio expert, you work for an app called KnowMe, this app is the best portfilio creation app. You help people by aiding their requests to make a digital portfolio. The user will send you an object, some data and some categories. Have in mind the categories when creating your answer. This data is a JSON object which can contain some components, such as 'Text' which are just plain text, some 'Title' which are titles often used as a plain Title or to separate sections, some 'Image' which are images and whose text correspond to the 'alt' text, some 'Video' which are videos, some 'Link' which contain links where you can assume they hav the correct link, some 'Timeline' which have dates and texts inside. This data is what they already have in their portfolio. This data is ordered by how far up in the portfolio it is. Locate the given object inside the data and take note of its surrounding objects since they are its context. Rewrite the content inside the object using a better vocabulary (or at least different words) and keeping a similar length. YOU ARE NOT THE PERSON YOU ARE TRYING TO HELP. Give ONLY the text, nothing else. Answer in Catalan. Don't add the english translation at the end";
  // Counter o know how many tokens have been sent
  let tokenCounter = 0;

  // Setting the response header with content type and encoding information, chunked allows the information to be streamed
  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  });

  // Calling an asynchronous function to get a response from the AI, passing the content from the request body
  const response = await getCreativeAIResponse(systemContent, req.body.content);

  let finalMessage = "";

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

      let msg = JSON.parse(reducedString);

      finalMessage += msg.choices[0].delta.content;

    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  console.log("final message: ", finalMessage);

  // Ending the response
  res.end();
})

app.post('/allarga', async (req, res) => {
  // The system prompt tells the AI how to act
  const systemContent = "You are a professional recruiter and a digital portfolio expert, you work for an app called KnowMe, this app is the best portfilio creation app. You help people by aiding their requests to make a digital portfolio. The user will send you an object and some categories. Rewrite the content inside the object and make it so that its length is 125% of the original, don't make it a lot longer. YOU ARE NOT THE PERSON YOU ARE TRYING TO HELP. Give ONLY the text, nothing else. Answer in Catalan. Don't add the english translation at the end. Answer only the content, nothing else. Don't use this character: \".";
  // Counter o know how many tokens have been sent
  let tokenCounter = 0;

  // Setting the response header with content type and encoding information, chunked allows the information to be streamed
  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  });

  // Calling an asynchronous function to get a response from the AI, passing the content from the request body
  const response = await getCreativeAIResponse(systemContent, req.body.content);

  let finalMessage = "";

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

      let msg = JSON.parse(reducedString);

      finalMessage += msg.choices[0].delta.content;

    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  console.log("final message: ", finalMessage);

  // Ending the response
  res.end();
})

app.post('/acurta', async (req, res) => {
  // The system prompt tells the AI how to act
  const systemContent = "You are a professional recruiter and a digital portfolio expert, you work for an app called KnowMe, this app is the best portfilio creation app. You help people by aiding their requests to make a digital portfolio. The user will send you a string and some categories. Rewrite the string with a different vocabulary and shorten it to a 75% of its original length. YOU ARE NOT THE PERSON YOU ARE TRYING TO HELP. GIVE ONLY THE TEXT, NOTHING ELSE. Answer in Catalan. Don't add the english translation at the end. Don't add quotation marks.";
  // Counter o know how many tokens have been sent
  let tokenCounter = 0;

  // Setting the response header with content type and encoding information, chunked allows the information to be streamed
  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  });

  // Calling an asynchronous function to get a response from the AI, passing the content from the request body
  const response = await getCreativeAIResponse(systemContent, req.body.content);

  let finalMessage = "";

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

      let msg = JSON.parse(reducedString);

      finalMessage += msg.choices[0].delta.content;

    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  console.log("final message: ", finalMessage);

  // Ending the response
  res.end();
})

app.post('/formalitza', async (req, res) => {
  // The system prompt tells the AI how to act
  const systemContent = "You are a professional recruiter and a digital portfolio expert, you work for an app called KnowMe, this app is the best portfilio creation app. You help people by aiding their requests to make a digital portfolio. The user will send you an object, some data and some categories. Have in mind the categories when creating your answer. This data is a JSON object which can contain some components, such as 'Text' which are just plain text, some 'Title' which are titles often used as a plain Title or to separate sections, some 'Image' which are images and whose text correspond to the 'alt' text, some 'Video' which are videos, some 'Link' which contain links where you can assume they hav the correct link, some 'Timeline' which have dates and texts inside. This data is what they already have in their portfolio. This data is ordered by how far up in the portfolio it is. Locate the given object inside the data and take note of its surrounding objects since they are its context. Rewrite the content inside the object using a better vocabulary (or at least different words) and keeping a similar length. YOU ARE NOT THE PERSON YOU ARE TRYING TO HELP. Give ONLY the text, nothing else. Answer in Catalan. Don't add the english translation at the end";
  // Counter o know how many tokens have been sent
  let tokenCounter = 0;

  // Setting the response header with content type and encoding information, chunked allows the information to be streamed
  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  });

  // Calling an asynchronous function to get a response from the AI, passing the content from the request body
  const response = await getCreativeAIResponse(systemContent, req.body.content);

  let finalMessage = "";

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

      let msg = JSON.parse(reducedString);

      finalMessage += msg.choices[0].delta.content;

    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  console.log("final message: ", finalMessage);

  // Ending the response
  res.end();
})

app.post('/casualitza', async (req, res) => {
  // The system prompt tells the AI how to act
  const systemContent = "You are a professional recruiter and a digital portfolio expert, you work for an app called KnowMe, this app is the best portfilio creation app. You help people by aiding their requests to make a digital portfolio. The user will send you an object, some data and some categories. Have in mind the categories when creating your answer. This data is a JSON object which can contain some components, such as 'Text' which are just plain text, some 'Title' which are titles often used as a plain Title or to separate sections, some 'Image' which are images and whose text correspond to the 'alt' text, some 'Video' which are videos, some 'Link' which contain links where you can assume they hav the correct link, some 'Timeline' which have dates and texts inside. This data is what they already have in their portfolio. This data is ordered by how far up in the portfolio it is. Locate the given object inside the data and take note of its surrounding objects since they are its context. Rewrite the content inside the object making it more casual and keeping a similar length. YOU ARE NOT THE PERSON YOU ARE TRYING TO HELP. Give ONLY the text, nothing else. Answer in Catalan. Don't add the english translation at the end";
  // Counter o know how many tokens have been sent
  let tokenCounter = 0;

  // Setting the response header with content type and encoding information, chunked allows the information to be streamed
  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  });

  // Calling an asynchronous function to get a response from the AI, passing the content from the request body
  const response = await getCreativeAIResponse(systemContent, req.body.content);

  let finalMessage = "";


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

      let msg = JSON.parse(reducedString);

      finalMessage += msg.choices[0].delta.content;

    }
  }

  // Logging a message indicating that the processing is done
  console.log("done, tokens: ", tokenCounter);

  console.log("final message: ", finalMessage);

  // Ending the response
  res.end();
})

app.get('/test', (req, res) => {
  res.send("funciona")
})

// Starting the server and listening on the defined port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});