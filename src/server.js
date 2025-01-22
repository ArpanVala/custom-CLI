// basic implementation of server code
import http from 'node:http'

const server =http.createServer((req,res)=>{
    res.statusCode =200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hey Guy');
});

server.listen(3000,()=>{
    console.log('server created!')
})