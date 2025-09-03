import { Usuario } from "./Usuario";
import { Comentario } from "./Comentario";

export class Post {
    comentarios: Comentario[] = [];

    constructor(
        public contenido: string, 
        public autor: Usuario
    ) {}

    agregarComentario(
        comentario: Comentario
    ) {
        this.comentarios.push(comentario);
    }
}
