//Aplicações podem ser Stateful ou Stateless
//Stateful: O servidor guarda o estado da aplicação, ou seja, ele guarda informações sobre o cliente entre as requisições. Ex: Sessões, Cookies
//Stateless: O servidor não guarda o estado da aplicação, ou seja, ele não guarda informações sobre o cliente entre as requisições. Ex: APIs REST
// Cabeçalhos (Requisição/resposta) - São metadados que fornecem informações adicionais sobre a requisição ou resposta HTTP. Eles são enviados no início da mensagem HTTP e são compostos por pares de chave-valor. Ex: Content-Type, Authorization, Accept, User-Agent
import * as http from 'node:http';
                                    //O http não tem um export default, então você precisa usar import * as http.
                                    //A forma import http from 'node:http' só funciona se o módulo tiver export default, o que não é o caso do módulo http.
//Json - JavaScript Object Notation - É um formato de dados leve, fácil de ler e escrever para humanos, e fácil de analisar e gerar para máquinas. É usado principalmente para transmitir dados entre um servidor e uma aplicação web como texto.                                    
const users = [];
const server = http.createServer((req, res)=>{
    const {method, url}= req                                        //Métodos HTTP: GET, POST, PUT, DELETE
                                                                    //GET: Buscar uma informação no servidor
                                                                    //POST: Criar uma informação no servidor
                                                                    //PUT: Atualizar uma informação no servidor
                                                                    //DELETE: Deletar uma informação no servidor
                                                                    //PATCH: Atualizar uma informação específica no servidor
                                                                    //Criar um usuário(nome, email, senha) Atraves do req vou ter a resposta do cliente e o res a resposta do servidor
    if(method === 'GET' && url === '/users'){
        //early return
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
    if (method === 'POST' && url === '/users'){
        users.push({
            id: 1,
            nome: 'Jonh Doe',
            email: 'johndoe@exemple.com',
        })
        return res.end('Criação de usuário')
    }                                                               //Toda vez que o cliente fizer uma requisição, o servidor vai responder
    return res.end('Hello')                                         //O end é o que finaliza a requisição, ou seja, o servidor vai responder com um Hello
})
                                                                    
server.listen(3333)