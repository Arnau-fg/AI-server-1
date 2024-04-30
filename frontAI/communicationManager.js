/**
 * Function that fetches an ai response from the Node server
 * @returns {Promise<Response>} The response from the server, it has to be processed
 */

export async function fetchNode() {
    //Change the host to your Node's host
    return (await fetch("https://ia.inspedralbes.cat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: `Com faig el meu portfoli si soc dissenyador web?`}) 
    }))
}