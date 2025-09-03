// Proyecto red social minimalista
import inquirer from "inquirer";
import { Usuario } from "./models/Usuario";
import { Post } from "./models/Post";

let usuarios: Usuario[] = [];
let posts: Post[] = [];
let usuarioActivo: Usuario | null = null;

async function menuPrincipal() {
    let salir = false;

    while (!salir) {
        const opcion = await inquirer.prompt([
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
                const nuevoUsuario = await inquirer.prompt([
                    { type: "input", name: "nombre", message: "Nombre del usuario:" },
                    { type: "password", name: "password", message: "Contraseña:" },
                ]);
                usuarios.push(new Usuario(nuevoUsuario.nombre, nuevoUsuario.password));
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
                const login = await inquirer.prompt([
                    { type: "input", name: "nombre", message: "Nombre de usuario:" },
                    { type: "password", name: "password", message: "Contraseña:" },
                ]);
                const usuarioEncontrado = usuarios.find(
                    (u) => u.nombre === login.nombre && u.password === login.password,
                );
                if (usuarioEncontrado) {
                    usuarioActivo = usuarioEncontrado;
                    console.log(`✅ Sesión iniciada como: ${usuarioActivo.nombre}\n`);
                } else {
                    console.log("\x1b[31m❌ Usuario o contraseña incorrectos\x1b[0m");
                }
                break;

            case "📝 Crear Post":
                if (!usuarioActivo) {
                    console.log("\x1b[33m⚠️ Debes iniciar sesión primero\x1b[0m");
                    break;
                }
                const post = await inquirer.prompt([
                    { type: "input", name: "contenido", message: "Escribe tu post:" },
                ]);
                posts.push(new Post(post.contenido, usuarioActivo));
                console.log("📝 Post publicado.\n");
                break;

            case "📄 Ver Posts":
                console.log("📌 Lista de posts:");
                if (posts.length === 0) {
                    console.log("No hay posts aún.");
                } else {
                    posts.forEach((p, i) =>
                        console.log(`${i + 1}. ${p.autor.nombre}: ${p.contenido}`)
                    );
                }
                break;

            case "❌ Cerrar Sesión":
                if (usuarioActivo) {
                    console.log(`👋 Sesión cerrada: ${usuarioActivo.nombre}`);
                    usuarioActivo = null;
                } else {
                    console.log("\x1b[33m⚠️  No hay ninguna sesión activa\x1b[0m");
                }
                break;

            case "🚪 Salir":
                salir = true;
                console.log("👋 Saliendo de la red social...");
                break;
        }
    }
}

menuPrincipal();
