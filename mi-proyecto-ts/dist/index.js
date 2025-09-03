"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Proyecto red social minimalista
const inquirer_1 = require("inquirer");
const Usuario_1 = require("./models/Usuario");
const Post_1 = require("./models/Post");
let usuarios = [];
let posts = [];
let usuarioActivo = null;
function menuPrincipal() {
    return __awaiter(this, void 0, void 0, function* () {
        let salir = false;
        while (!salir) {
            const opcion = yield inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "accion",
                    message: `Red Social - Menú Principal ${usuarioActivo ? `\x1b[32m${usuarioActivo.nombre}\x1b[0m` : ""}`,
                    choices: [
                        "➕ Crear Usuario",
                        "👁️  Ver Usuarios",
                        "🔑 Iniciar Sesión",
                        "📝 Crear Post",
                        "📄 Ver Posts",
                        "❌ Cerrar Sesión",
                        "🚪 Salir",
                    ],
                },
            ]);
            switch (opcion.accion) {
                case "➕ Crear Usuario":
                    const nuevoUsuario = yield inquirer_1.default.prompt([
                        { type: "input", name: "nombre", message: "Nombre del usuario:" },
                        { type: "password", name: "password", message: "Contraseña:" },
                    ]);
                    usuarios.push(new Usuario_1.Usuario(nuevoUsuario.nombre, nuevoUsuario.password));
                    console.log("✅ \x1b[32m Usuario creado con éxito \x1b[0m");
                    break;
                case "👁️  Ver Usuarios":
                    console.log("👤 Lista de usuarios:");
                    usuarios.forEach((u, i) => console.log(`${i + 1}. ${u.nombre}`));
                    break;
                case "🔑 Iniciar Sesión":
                    if (usuarioActivo) {
                        console.log(`⚠️ Ya hay una sesión iniciada: ${usuarioActivo.nombre}`);
                        break;
                    }
                    const login = yield inquirer_1.default.prompt([
                        { type: "input", name: "nombre", message: "Nombre de usuario:" },
                        { type: "password", name: "password", message: "Contraseña:" },
                    ]);
                    const usuarioEncontrado = usuarios.find((u) => u.nombre === login.nombre && u.password === login.password);
                    if (usuarioEncontrado) {
                        usuarioActivo = usuarioEncontrado;
                        console.log(`✅ Sesión iniciada como: ${usuarioActivo.nombre}\n`);
                    }
                    else {
                        console.log("\x1b[31m❌ Usuario o contraseña incorrectos\x1b[0m");
                    }
                    break;
                case "📝 Crear Post":
                    if (!usuarioActivo) {
                        console.log("\x1b[33m⚠️ Debes iniciar sesión primero\x1b[0m");
                        break;
                    }
                    const post = yield inquirer_1.default.prompt([
                        { type: "input", name: "contenido", message: "Escribe tu post:" },
                    ]);
                    posts.push(new Post_1.Post(post.contenido, usuarioActivo));
                    console.log("📝 Post publicado.\n");
                    break;
                case "📄 Ver Posts":
                    console.log("📌 Lista de posts:");
                    if (posts.length === 0) {
                        console.log("No hay posts aún.");
                    }
                    else {
                        posts.forEach((p, i) => console.log(`${i + 1}. ${p.autor.nombre}: ${p.contenido}`));
                    }
                    break;
                case "❌ Cerrar Sesión":
                    if (usuarioActivo) {
                        console.log(`👋 Sesión cerrada: ${usuarioActivo.nombre}`);
                        usuarioActivo = null;
                    }
                    else {
                        console.log("\x1b[33m⚠️  No hay ninguna sesión activa\x1b[0m");
                    }
                    break;
                case "🚪 Salir":
                    salir = true;
                    console.log("👋 Saliendo de la red social...");
                    break;
            }
        }
    });
}
menuPrincipal();
