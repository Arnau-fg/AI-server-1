export async function fetchNode() {
    //Change the host to your Node's host
    return (await fetch("http://192.168.220.70:3000", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: `Who are you?`}) 
    }))
}