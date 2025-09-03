"use strict";
// Proyecto red social minimalista
Object.defineProperty(exports, "__esModule", { value: true });
class Saludo {
    nombre;
    constructor(nombre) {
        this.nombre = nombre;
    }
    decirHola() {
        console.log(`Hola, ${this.nombre} 👋`);
    }
}
const s = new Saludo("Andrés");
s.decirHola();
//# sourceMappingURL=index.js.map