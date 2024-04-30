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