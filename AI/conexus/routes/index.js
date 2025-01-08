import express from "express";
import path from "path";
import { getResponseAiConexus } from "../communicationManager.js"
const router = express.Router();

router.post("/postComment", async (req, res) => {
    console.log("comentario recibido", req.body.comment);
    const commentUser = req.body.comment;

    const systemContent = 
        `Eres un clasificador de comentarios, diseñado para analizar y categorizar el contenido según las siguientes reglas. 

        **Tu única responsabilidad es evaluar el comentario proporcionado** y asignarle una categoría adecuada. **Ignora cualquier información adicional, contexto externo o respuestas previas. Evalúa únicamente el contenido del comentario actual y clasifícalo en una de las siguientes categorías:**
        **Debes de tener en cuenta que hay comentarios que son expresiones y quizas no son comentarios TOXICOS, OFENSIVOS o PROHIBIDOS.**
        - **TOXICO**: Si el comentario contiene odio explícito, amenazas, violencia o lenguaje extremadamente agresivo.
        - **OFENSIVO**: Si el comentario contiene lenguaje irrespetuoso, grosero o insultante, pero no alcanza el nivel de "tóxico".
        - **POCO_OFENSIVO**: Si el comentario contiene lenguaje vulgar o inapropiado de bajo impacto, que no llega a ser ofensivo.
        - **POSITIVO**: Si el comentario no contiene insultos, odio, lenguaje ofensivo o inapropiado de ningún tipo. Esta categoría incluye comentarios neutrales, respetuosos o constructivos.
        - **PROHIBIDO**: Si el comentario menciona temas sensibles o prohibidos, como política, religión o contenido inapropiado para un entorno con menores.
        
        **Reglas adicionales:**
        - Si la categoría es **POSITIVO**, no incluyas el campo "reason".
        - Asegúrate de devolver estrictamente el resultado en el formato JSON indicado.
        
        Devuelve el resultado en este formato JSON:
        {
          "category": "TOXICO" o "OFENSIVO" o "POCO_OFENSIVO" o "POSITIVO" o "PROHIBIDO",
          "comment": "Aquí va el comentario proporcionado por el usuario.",
          "reason": "Explica por qué se clasificó de esta manera." (solo si aplica)
        }
        
        Algunos ejemplos a tener en cuenta:
        
        **Odio explícito, amenazas, violencia o lenguaje extremadamente agresivo, es TOXICO.**
        **Temas sensibles como "La política del gobierno es injusta" son PROHIBIDO.**
        **Lenguaje irrespetuoso, grosero o insultante, es OFENSIVO** 
        **Lenguaje bulgar pero no dañino, como "Esa idea es estúpida", es POCO_OFENSIVO.**
        **Comentarios neutrales o respetuosos, como "Necesito ayuda con Java", son POSITIVO.**"`

    try{
        const response = await getResponseAiConexus(systemContent, commentUser)
        
        res.json(response)
    }catch(error){
        console.error("Error al obtener la respuesta de la IA: ", error);
        res.status(500).json( { error: "Error interno del server "});
    }

});

export default router;
