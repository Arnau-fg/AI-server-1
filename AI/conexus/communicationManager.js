export async function getResponseAiConexus(systemContent) {
    try {
        const response = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF", // El modelo que estás utilizando
                messages: [
                    {
                        role: "system",
                        content: systemContent // Mensaje del sistema
                    },
                    {
                        role: "user",
                        content: "esta piola" // Mensaje del usuario
                    }
                ],
                response_format: {
                    "type": "json_schema",
                    "json_schema": {
                        "strict": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "category": {
                                    "type": "string",
                                    "enum": [
                                        "TOXICO",
                                        "OFENSIVO",
                                        "POCO_OFENSIVO",
                                        "POSITIVO",
                                        "PROHIBIDO"
                                    ]
                                },
                                "comment": {
                                    "type": "string"
                                },
                                "reason": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "comment"
                            ],
                        }
                    }
                },
                temperature: 0.7, // Configuración de temperatura
                stream: false      // Habilitar streaming
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }

        return await response.json(); // Retorna el resultado en formato JSON
    } catch (error) {
        console.error("Error al comunicarse con la IA: ", error);
        throw error;
    }
}
