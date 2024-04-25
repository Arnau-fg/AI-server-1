export async function fetchNode() {
    return (await fetch("http://192.168.220.70:3000", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: `are you a sigma or a beta cuck?`})
    }))
}