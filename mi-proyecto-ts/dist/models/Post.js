"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(contenido, autor) {
        this.contenido = contenido;
        this.autor = autor;
        this.comentarios = [];
    }
    agregarComentario(comentario) {
        this.comentarios.push(comentario);
    }
}
exports.Post = Post;
