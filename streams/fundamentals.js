//Streams -ler pequenas partes do arquivo, ao invés de ler o arquivo inteiro de uma vez só, economizando memória e aumentando a performance da aplicação.
//Tipos de Streams: Readable, Writable, Duplex, Transform

//No node toda porta de entrada e saída é tratada como uma stream

//process.stdin
//    .pipe(process.stdout)
import {Readable} from 'node:stream'

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

new OneToHundredStream()
    .pipe(process.stdout)