import express from "express";
import cors from "cors";
import { getAIResponse } from "./communicationManager.js";


const app = express()
app.use(cors());
app.use(express.json())
const port = 3000

app.post('/test', async (req, res) => {
  console.log("test");
});

app.post('/', async (req, res) => {

  console.log(req.body.content);

  res.writeHead(200, {
    "Content-type": "text/plain",
    "transfer-encoding": "chunked"
  })


  const response = await getAIResponse(req.body.content)

  for await (const chunk of response.body) {

    // console.log("sending response");

    

    // console.log("Sent: ", chunk);

  
    const jsonString = Buffer.from(chunk).toString('utf8')

    if (jsonString.length > 270) {

      const reducedString = jsonString.slice(6)

      // const parsedData = JSON.parse(reducedString)

      res.write(reducedString)

      // message += parsedData.choices[0].delta.content

      // console.log(message);
    }
  }

  console.log("done");

  res.end()
  
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
