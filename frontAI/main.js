// Author: Arnau Fernandez Gil
// Institut Pedralbes 2024 2DAW

import './style.css';

// Importing the fetch'
import { fetchNode } from './communicationManager.js';

// Initializing an empty string variable to store the message
let message = "";

// Getting the DOM element with the id 'data' and assigning it to the 'textDOM' variable
const textDOM = document.getElementById("data");

// Creating a TextDecoder object to decode UTF-8 encoded data
let utf8decoder = new TextDecoder();

// Fetching a stream of data asynchronously using the 'fetchNode' function
const stream = await fetchNode();

// Iterating over the stream of data asynchronously, processing each chunk, stream.body is required, because the chunk data is stored in the body attribute
for await (const chunk of stream.body) {

  // Decoding the chunk of data from UTF-8 encoding to a string
  const stringData = utf8decoder.decode(chunk);

  // Parsing the decoded string data to an object
  const parsedData = JSON.parse(stringData);

  // Extracting the message from the parsed data and appending it to the 'message' variable
  message += parsedData.choices[0].delta.content;

  // Setting the inner text of the DOM element 'textDOM' to the accumulated message
  textDOM.innerText = message;
}