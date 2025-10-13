import * as http from 'node:http';
                                    //O http não tem um export default, então você precisa usar import * as http.
                                    //A forma import http from 'node:http' só funciona se o módulo tiver export default, o que não é o caso do módulo http.

const server = http.createServer((req, res)=>{
                                                //Criar um usuário(nome, email, senha) Atraves do req vou ter a resposta do cliente e o res a resposta do servidor
                                                 //Toda vez que o cliente fizer uma requisição, o servidor vai responder
    return res.end('Hello World')
})

server.listen(3333)