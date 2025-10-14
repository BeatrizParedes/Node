//Aplicações podem ser Stateful ou Stateless
//Stateful: O servidor guarda o estado da aplicação, ou seja, ele guarda informações sobre o cliente entre as requisições. Ex: Sessões, Cookies
//Stateless: O servidor não guarda o estado da aplicação, ou seja, ele não guarda informações sobre o cliente entre as requisições. Ex: APIs REST
// Cabeçalhos (Requisição/resposta) - São metadados que fornecem informações adicionais sobre a requisição ou resposta HTTP. Eles são enviados no início da mensagem HTTP e são compostos por pares de chave-valor. Ex: Content-Type, Authorization, Accept, User-Agent
import * as http from 'node:http';
import {json} from './middlewares/json.js'
                                    //O http não tem um export default, então você precisa usar import * as http.
                                    //A forma import http from 'node:http' só funciona se o módulo tiver export default, o que não é o caso do módulo http.
                                    //Json - JavaScript Object Notation - É um formato de dados leve, fácil de ler e escrever para humanos, e fácil de analisar e gerar para máquinas. É usado principalmente para transmitir dados entre um servidor e uma aplicação web como texto.                                    
const users = [];
const server = http.createServer(async (req, res) => {
    const { method, url } = req  
    
    await json (req, res)                                //Métodos HTTP: GET, POST, PUT, DELETE
                                                        //GET: Buscar uma informação no servidor
    const buffers = []

    for await (const chunk of req) { //Lê os dados da requisição em pedaços (chunks) 
        buffers.push(chunk)
    }

    let bodyText = Buffer.concat(buffers).toString()

    try {
        req.body = bodyText ? JSON.parse(bodyText) : null
    } catch {
        req.body = null
    }

    if (method === 'GET' && url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        // Verifica se o corpo existe
        if (!req.body) {
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            return res.end('Corpo inválido ou ausente.')
        }

        const { name, email } = req.body

        if (!name || !email) {
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            return res.end('Campos obrigatórios: name e email.')
        }

        const user = {
            id: users.length + 1,
            name,
            email,
        }

        users.push(user)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(user))
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Rota não encontrada')
})

server.listen(3333, () => {
    console.log('🚀 Servidor rodando em http://localhost:3333')
})
