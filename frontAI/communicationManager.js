
export async function iaGeneric(categories) {

  sendCategories = JSON.stringify(categories);

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

export async function iaGenericWithInfo(content, categories) {
  
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

export async function iaGeneracio(element, content, categories) {

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

export async function iaMillora(element, content, categories) {
  
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

export async function iaAllarga(element, content, categories) {

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

export async function iaAcurta(element, categories) {

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

export async function iaFormalitza(element, content, categories) {
  
  sendElement = JSON.stringify(element);
  sendData = JSON.stringify(content);
  sendCategories = JSON.stringify(categories);

  return await fetch("https://ia.inspedralbes.cat/formalitza", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `This is the object: ${sendElement}. Here is the JSON data for the context: ${sendData}. My categories are: ${sendCategories}`,
    }),
  });
}

export async function iaCasualitza(element, content, categories) {
  
  sendElement = JSON.stringify(element);
  sendData = JSON.stringify(content);
  sendCategories = JSON.stringify(categories);

  return await fetch("https://ia.inspedralbes.cat/casualitza", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `This is the object: ${sendElement}. Here is the JSON data for the context: ${sendData}. My categories are: ${sendCategories}`,
    }),
  });
}