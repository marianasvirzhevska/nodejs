let http = require('http');
let fs = require('fs');

function logRequest({ method, url }) {
    const log = {
        time: Date.now(),
        method,
        url
    };

    fs.readFile('./data.json', (err, data) => {
        if (err) {
            throw err;
        }

        const json = JSON.parse((data));
        json.logs.push(log);

        fs.writeFile('./data.json', JSON.stringify(json, undefined, '    '));
    });
}

const requestHandler = (request, response) => {
    logRequest(request);

    if (request.url === '/logs') {
        fs.readFile('./data.json', (err, data) => {
            response.write(data);
            response.end();
        })
    } else {
        response.writeHead(200, {'Content-type': 'text/json'});
        response.end('Node.js homework');
    }
};

const server = http.createServer(requestHandler);


server.listen(3000, (err) => {
    if (err) {
        throw (`Something bad happened. ${err}`)
    }
    console.log(`server is listening on 3000`)
});


