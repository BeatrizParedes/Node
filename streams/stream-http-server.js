import * as http from 'node:http'; //Importa o módulo HTTP do Node.js nas versões mais recentes do Node.js
import{Transform} from 'node:stream'

class InverseNumberStream extends Transform{
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

// req = ReadableStream
// res = WritableStream

const server = http.createServer(async (req, res)=>{
    const buffers=[]

    for await(const chunk of req){ //Lê os dados da requisição em pedaços (chunks) 
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)
    res.end(fullStreamContent)
    
 // return req.pipe(new InverseNumberStream())
 //     .pipe(res)

})

server.listen(3334)