/**
 * Function that fetches an ai response from the Node server
 * @returns {Promise<Response>} The response from the server, it has to be processed
 */
let sendCategories;
let sendElement;
let sendData;

export async function fetchGeneric(categories) {

  sendCategories = JSON.stringify(categories);

  //Change the host to your Node's host
  return await fetch("https://ia.inspedralbes.cat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `Com faig el meu portfoli si tinc aquestes categories: ${sendCategories}. How can i upgrade my portfolio?`,
    }),
  });
}

export async function fetchGenericWithInfo(content, categories) {
  
  sendData = JSON.stringify(content);
  sendCategories = JSON.stringify(categories);

  return await fetch("https://ia.inspedralbes.cat/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `Here is the JSON data: ${sendData}. My categories are: ${sendCategories}`,
    }),
  });
}

export async function fetchMillora(element, content, categories) {
  
  sendElement = JSON.stringify(element);
  sendData = JSON.stringify(content);
  sendCategories = JSON.stringify(categories);

  return await fetch("https://ia.inspedralbes.cat/millora", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `This is the object: ${sendElement}. Here is the JSON data for the context: ${sendData}. My categories are: ${sendCategories}`,
    }),
  });
}

export async function fetchGeneracio(element, content, categories) {

  sendElement = JSON.stringify(element);
  sendData = JSON.stringify(content);
  sendCategories = JSON.stringify(categories);

  return await fetch("https://ia.inspedralbes.cat/genera", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `This is the object: ${sendElement}. Here is the JSON data for the context: ${sendData}. My categories are: ${sendCategories}`,
    }),
  });
}

export async function fetchAllarga(element, content, categories) {

  sendElement = JSON.stringify(element);
  sendData = JSON.stringify(content);
  sendCategories = JSON.stringify(categories);

  console.log("generant");
  return await fetch("https://ia.inspedralbes.cat/allarga", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `This is the object: ${sendElement}. Here is the JSON data for the context: ${sendData}. My categories are: ${sendCategories}`,
    }),
  });
}

export async function fetchAcurta(element, categories) {

  sendCategories = JSON.stringify(categories);
  sendElement = JSON.stringify(element.content);

  console.log("generant");
  return await fetch("https://ia.inspedralbes.cat/acurta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `This is the object: ${sendElement}. My categories are: ${sendCategories}`,
    }),
  });
}