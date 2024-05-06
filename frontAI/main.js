// Author: Arnau Fernandez Gil
// Institut Pedralbes 2024 2DAW

import "./style.css";

// Importing the fetches
import { fetchGeneric, fetchGenericWithInfo, fetchMillora, fetchGeneracio } from "./communicationManager.js";

import { info } from "./docs/JSON/base.js";

const categories = ["programador", "dissenyador web"];

const objectID = 29;
const subObjectID = 0;

let higlightedObject;

const promptData = [];

for (const component of info.portfolioComponents) {
  
  

  for (const subComponent of component.components) {
    
    if (subComponent.length > 0) {
      higlightedObject = subComponent.find(element => element.id === objectID);
      for (const element of subComponent) {
        
        formatJSON(info, element);
      }
    }
  }
}

let objectToPrompt;

if (higlightedObject) {
  if(higlightedObject.type === "TimelineComponent") {
    const timelineData = info.content.find(
      (subComponent) => higlightedObject.id === subComponent.id
    );
    const timeline = timelineData.timeline;
    objectToPrompt = {
      type: "Timeline",
      content: timeline[0].text,
      id: higlightedObject.id,
      subID: subObjectID,
    };
  } else {
    const dataInElement = info.content.find(
      (subComponent) => higlightedObject.id === subComponent.id
    );
    objectToPrompt = {
      type: higlightedObject.type,
      content: dataInElement.text,
      id: higlightedObject.id,
    };
  }
}

console.log(objectToPrompt);

const sendData = JSON.stringify(promptData);
const sendCategories = JSON.stringify(categories);
const sendElement = JSON.stringify(objectToPrompt);

// Initializing an empty string variable to store the message
let message = "";
let showMessage = "";

const textDOM = document.getElementById("data");

// Creating a TextDecoder object to decode the recieved data
let utf8decoder = new TextDecoder();

// Fetching a stream of data asynchronously using the 'fetchGeneric' function
// const stream = await fetchGeneric(categories);

// Fetching a stream of data asynchronously using the 'fetchGenericWithInfo' function
// const stream = await fetchGenericWithInfo(sendData, sendCategories);

// Fetching a stream of data asynchronously using the 'fetchMillora' function
const stream = await fetchMillora(sendElement, sendData, sendCategories);

// Fetching a stream of data asynchronously using the 'fetchGeneracio' function
// const stream = await fetchGeneracio(sendElement, sendData, sendCategories);

// Iterating over the stream of data asynchronously, processing each chunk, stream.body is required, because the chunk data is stored in the body attribute
for await (const chunk of stream.body) {
  // Decoding the chunk of data from UTF-8 encoding to a string
  const stringData = utf8decoder.decode(chunk);

  // Parsing the decoded string data to an object
  const parsedData = JSON.parse(stringData);

  // Extracting the message from the parsed data and appending it to the 'message' variable
  message += parsedData.choices[0].delta.content;

  showMessage = message.replace("upgrade", 'millorar');

  // Setting the inner text of the DOM element 'textDOM' to the accumulated message
  textDOM.innerText = showMessage;
}

function formatJSON(info, element) {
  let objectToPush;
  let dataInElement;
  switch (element.type) {
    case "TitleComponent":
      dataInElement = info.content.find(
        (subComponent) => element.id === subComponent.id
      );
      objectToPush = {
        type: "Title",
        content: dataInElement.text,
        id: element.id,
      };
      promptData.push(objectToPush);
      break;
    case "TextComponent":
      dataInElement = info.content.find(
        (subComponent) => element.id === subComponent.id
      );
      objectToPush = {
        type: "Text",
        content: dataInElement.text,
        id: element.id,
      };
      promptData.push(objectToPush);
      break;
    case "ImageComponent":
      objectToPush = {
        type: "Image",
        content: "Image",
        id: element.id,
      };
      promptData.push(objectToPush);
      break;
    case "LinksComponent":
      dataInElement = info.content.find(
        (subComponent) => element.id === subComponent.id
      );
      let linksText = dataInElement.links.map((link) => link.text);
      objectToPush = {
        type: "Links",
        content: linksText,
        id: element.id,
      };
      promptData.push(objectToPush);
      break;
    case "VideoComponent":
      objectToPush = {
        type: "Video",
        id: element.id,
      };
      promptData.push(objectToPush);
      break;
    case "TimelineComponent":
      dataInElement = info.content.find(
        (subComponent) => element.id === subComponent.id
      );

      objectToPush = {
        type: "Timeline",
        content: dataInElement.timeline,
        id: element.id,
      };
      promptData.push(objectToPush);
      break;
    default:
      console.log("Unknown component");
      break;
  }
}