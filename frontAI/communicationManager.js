export async function fetchNode() {
    //Change the host to your Node's host
    return (await fetch("http://192.168.218.52:3000", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: `Com faig el meu portfoli si soc dissenyador web?`}) 
    }))
}