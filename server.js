import {createServer} from 'node:http';
import messages from './lang/en/en.js';

class Server {
    constructor() {

        this.server = createServer((req, res) => {
            // Parse
            const parsedUrl = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);


            if (req.method === 'GET' && parsedUrl.pathname === '/getDate') {
                const name = parsedUrl.searchParams.get('name') || 'Guest';
                const currentDateTime = new Date().toLocaleString();

                const greetingMessage = `<p style="color: blue;">${messages.GREETING} ${name}, ${messages.MESSAGE} ${currentDateTime}</p>`;
                
                res.writeHead(200);
                res.end(greetingMessage);
            } else {
                res.writeHead(404);
                res.end('<p style="color: red;">404 - Endpoint not found</p>');
            }
            
        });
    }

    startServer() {
        this.server.listen(3000);
    }
}


const server = new Server();
server.startServer();
