//Streams -ler pequenas partes do arquivo, ao invés de ler o arquivo inteiro de uma vez só, economizando memória e aumentando a performance da aplicação.
//Tipos de Streams: Readable, Writable, Duplex, Transform

//No node toda porta de entrada e saída é tratada como uma stream

//process.stdin
//    .pipe(process.stdout)
import {Readable, Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable{

    index = 1
    _read(){
        const i=this.index++

        setTimeout(()=>{
            if(i>100){
                this.push(null)
        } else{
            const buf= Buffer.from(String(i))
            this.push(buf)
        }
        }, 1000)
    }
}

class InverseNumberStream extends Transform{
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable{
    _write(chunk, enconding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())