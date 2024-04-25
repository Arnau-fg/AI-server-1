onmessage = (e) => {

    let utf8decoder = new TextDecoder();

    const stringData = utf8decoder.decode(e.data)

    const parsedData = JSON.parse(stringData)

    postMessage(parsedData);
}