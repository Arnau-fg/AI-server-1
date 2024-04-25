import './style.css'
import { fetchNode } from './communicationManager.js'


// const myWorker = new Worker("./myWorker.js")

let message = "";

const textDOM = document.getElementById("data");

let utf8decoder = new TextDecoder();

const stream = await fetchNode()

for await (const chunk of stream.body) {

  const stringData = utf8decoder.decode(chunk)

  const parsedData = JSON.parse(stringData)

  message += parsedData.choices[0].delta.content

  textDOM.innerText = message;

  // myWorker.postMessage(chunk)

  // myWorker.onmessage = (e) => {
  //   console.log(e.data);

  // }

  // console.log(chunk);

  // message += parsedData.choices[0].delta.content

}

// myWorker.terminate();
