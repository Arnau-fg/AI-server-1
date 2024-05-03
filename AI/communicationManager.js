export async function getAIResponse(systemContent, userContent) {

    //This is the base port and route that is given by LM Studio, change it however you may need

    return (await fetch("http://127.0.0.1:1234/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //The body format has to be followed toe to toe, for further configuration visit: https://lmstudio.ai/docs/local-server
            'model': 'microsoft/Phi-3-mini-4k-instruct-gguf', // here add the model you are using, this can be grabbed in the LM Studio app
            'messages': [
                {
                    'role': 'system', //System prompts tell the ai how to act and orders to follow
                    'content': systemContent
                },
                {
                    'role': 'user', //User prompts are the questions or problems asked by the user
                    'content': userContent
                }
            ],
            'temperature': 0.6, //Temperature varies depending on how creative or precise you want the answer to be, higher (usually than 1) means more creative and lower means more precise
            'max_tokens': 500, //maximum length of the response prompt, set to -1 for unlimited
            'stream': true, //so that the info is sent in chunks, not all together
            'contextLength': 0, //Makes it so it can remember past tokens (default 1024)
        })
    }))
}

