// Author: Arnau Fernandez Gil
// Institut Pedralbes 2024 2DAW

import "./style.css";

// Importing the fetches
import { iaGeneric, iaGenericWithInfo, iaMillora, iaGeneracio, iaAllarga, iaAcurta, iaFormalitza, iaCasualitza } from "./communicationManager.js";

import { data } from "./docs/JSON/base.js";

    

  let subObjectID = 0;
  let subComponentFromProject = "title";

  const category = data.state.editing.category;

  const objectID = data.state.contentIndex;

  const portfolioComponents = data.state.portfolioComponents;
  const content = data.state.content;

  

  const promptData = [];

  let higlightedObject = data.state.content[objectID];

  for (const component of portfolioComponents) {
    for (const subComponent of component.components) {
      if (subComponent.length > 0) {
        // higlightedObject = subComponent.find(
        //   (element) => element.id === objectID
        // );
        for (const element of subComponent) {
          createArray(content, element);
        }
      }
    }
  }
  console.log(promptData);

let objectToPrompt;

if (higlightedObject) {
  if (higlightedObject.type === "TimelineComponent") {
    const timelineData = content.find(
      (subComponent) => higlightedObject.id === subComponent.id
    );
    const timeline = timelineData.timeline;
    objectToPrompt = {
      type: "Timeline",
      content: timeline[0].text,
      id: higlightedObject.id,
      subID: subObjectID,
    };
  } else if (higlightedObject.type === "ProjectComponent") {
    const projectData = content.find(
      (subComponent) => higlightedObject.id === subComponent.id
    );
    objectToPrompt = {
      type: "Project",
      content:
        subComponentFromProject == "title"
          ? projectData.title.text
          : projectData.description.text,
      id: higlightedObject.id,
      subID: subObjectID,
    };
  } else {
    const dataInElement = content.find(
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

// Initializing an empty string variable to store the message
let message = "";
let showMessage = "";

const textDOM = document.getElementById("data");

// Creating a TextDecoder object to decode the recieved data
let utf8decoder = new TextDecoder();

// Fetching a stream of data asynchronously using the 'iaGeneric' function
// const stream = await iaGeneric(categories);

// Fetching a stream of data asynchronously using the 'iaGenericWithInfo' function
// const stream = await iaGenericWithInfo(promptData, categories);

// Fetching a stream of data asynchronously using the 'iaMillora' function
// const stream = await iaMillora(objectToPrompt, promptData, categories);

// Fetching a stream of data asynchronously using the 'iaGeneracio' function
// const stream = await iaGeneracio(objectToPrompt, promptData, categories);

// Fetching a stream of data asynchronously using the 'iaAllarga' function
// const stream = await iaAllarga(objectToPrompt, promptData, categories);

// Fetching a stream of data asynchronously using the 'iaAcurta' function
// const stream = await iaAcurta(objectToPrompt, categories);

// Fetching a stream of data asynchronously using the 'iaFormalitza' function
// const stream = await iaFormalitza(objectToPrompt, categories);

// Fetching a stream of data asynchronously using the 'iaCasualitza' function
// const stream = await iaCasualitza(objectToPrompt, categories);

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

function createArray(content, element) {
  let objectToPush;
  let dataInElement;
  switch (element.type) {
    case "TitleComponent":
      dataInElement = content.find(
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
      dataInElement = content.find(
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
      dataInElement = content.find(
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
    case "ToolsComponent":
      dataInElement = content.find(
        (subComponent) => element.id === subComponent.id
      );
      let toolsText = dataInElement.chips.map((chip) => chip.text);
      objectToPush = {
        type: "Tools",
        content: toolsText,
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
      dataInElement = content.find(
        (subComponent) => element.id === subComponent.id
      );

      objectToPush = {
        type: "Timeline",
        content: dataInElement.timeline,
        id: element.id,
      };
      promptData.push(objectToPush);
      break;
    case "ProjectComponent":
      dataInElement = content.find(
        (subComponent) => element.id === subComponent.id
      );
      objectToPush = {
        type: "Project",
        // PER A MÉS ENDAVANT
        // title: dataInElement.title.text,
        // description: dataInElement.description.text,
        title: dataInElement.title,
        description: dataInElement.text,
        id: element.id,
      };
      promptData.push(objectToPush);
      break;
    default:
      break;
  }
}