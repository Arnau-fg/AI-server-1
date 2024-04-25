export async function getAIResponse(content) {
    return (await fetch("http://127.0.0.1:1234/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: '{ \n    "model": "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",\n    "messages": [ \n      { "role": "system", "content": "Always answer in rhymes." },\n      { "role": "user", "content": "Introduce yourself." }\n    ], \n    "temperature": 0.7, \n    "max_tokens": -1,\n    "stream": true\n}',
        body: JSON.stringify({
            'model': 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF',
            'messages': [
                {
                    'role': 'system',
                    'content': 'Act as Donald Trump, answer in a maximum of 200 tokens, answer in the language you are spoken to and use emojis'
                },
                {
                    'role': 'user',
                    'content': content
                }
            ],
            'temperature': 0.7,
            'max_tokens': -1,
            'stream': true,
            'contextLength': 0,
        })
    }))
}

