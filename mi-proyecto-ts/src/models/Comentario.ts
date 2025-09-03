import { Usuario } from "./Usuario";

export class Comentario {
    constructor(
        public contenido: string, 
        public autor: Usuario
    ) {}
}