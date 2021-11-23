import http from 'http';
import cluster from 'cluster';
import os from 'os';

import app from './app';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer(){

    if(cluster.isMaster){
        const NUM_WORKERS = os.cpus().length;
        for(let i=0; i<NUM_WORKERS; i++){
            cluster.fork();
        }
    }else{
        server.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`)
        })
    }
}

startServer();