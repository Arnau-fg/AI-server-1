/**
 * Function that fetches an ai response from the Node server
 * @returns {Promise<Response>} The response from the server, it has to be processed
 */

export async function fetchGeneric(categories) {
  //Change the host to your Node's host
  return await fetch("https://ia.inspedralbes.cat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `Com faig el meu portfoli si tinc aquestes categories: ${categories}. How can i upgrade my portfolio?`,
    }),
  });
}

export async function fetchGenericWithInfo(content, categories) {
  console.log("working");
  return await fetch("https://ia.inspedralbes.cat/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `Here is the JSON data: ${content}. My categories are: ${categories}`,
    }),
  });
}

export async function fetchMillora(element, content, categories) {
  console.log("millorant");
  return await fetch("https://ia.inspedralbes.cat/millora", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `This is the object: ${element}. Here is the JSON data for the context: ${content}. My categories are: ${categories}`,
    }),
  });
}

export async function fetchGeneracio(element, content, categories) {
  console.log("generant");
  return await fetch("https://ia.inspedralbes.cat/genera", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `This is the object: ${element}. Here is the JSON data for the context: ${content}. My categories are: ${categories}`,
    }),
  });
}
