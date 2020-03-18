let http = require('http');
let fs = require('fs');
const url = require('url');

const requestHandler = (request, response) => {
    logRequest(request);

    const requestUrl = url.parse(request.url, true);

    switch (requestUrl.pathname) {
        case '/logs': {
            const data = fs.readFileSync('./data.json');
            const { start = 0, end = Infinity } = requestUrl.query;

            response.writeHead(200, {'Content-type': 'application/json'});

            if (start) {
                const filtered = JSON.parse(data).logs.filter(log => log.time >= start && log.time <= end);
                response.write(JSON.stringify(filtered, null, '    '));
                response.end();
            } else {
                response.write(data);
                response.end();
            }
            break;
        }
        default: {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.end('Node.js homework');
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


function logRequest({ method, url }) {
    const log = {
        time: Date.now(),
        method,
        url
    };

    let data;
    try {
        data = fs.readFileSync('./data.json');
    } catch (err) {
        const content = { logs: [] };
        fs.writeFile('data.json', JSON.stringify(content, null, '    '), (err) => {
            if (err) {
                throw err;
            }
            console.log('File created')
        } );
    }

    const json = parseJson(data);

    json.logs.push(log);

    fs.writeFileSync('./data.json', JSON.stringify(json, null, '    '))
}

function parseJson(data) {
    let json;

    try {
        json = JSON.parse(data);
    } catch (err) {
        json = { logs: [] };
    }

    return json;
}

