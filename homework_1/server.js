let http = require('http');
let fs = require('fs');
const url = require('url');

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
    } else if (request.url === '/') {
        response.writeHead(200, {'Content-type': 'text/json'});
        response.end('Node.js homework');
    } else {
        const queryObject = url.parse(request.url,true).query;
        response.writeHead(200, {'Content-type': 'text/json'});

        if (queryObject.start) {
            fs.readFile('./data.json', (err, content) => {
                const filtered = JSON.parse(content).logs.filter(log => log.time >= queryObject.start && log.time <= queryObject.end);
                response.end(`Current logs ${JSON.stringify(filtered, undefined, '    ')}`);
            });
        } else {
            response.end('No logs found');
        }
    }
};

const server = http.createServer(requestHandler);

server.listen(3000, (err) => {
    if (err) {
        throw (`Something bad happened. ${err}`)
    }
    console.log(`server is listening on 3000`)
});


