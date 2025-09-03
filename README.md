# TypeScript y Programación Orientada a Objetos

TypeScript (TS) es un superset de JavaScript que añade tipado estático y características avanzadas de programación orientada a objetos. La diferencia clave es que TS necesita ser compilado a JavaScript para ejecutarse en navegadores o Node.js.

### Diferencias principales con JavaScript:
- **Tipado estático**: 😱​ Detecta errores en tiempo de compilación
- **Mejor soporte para POO**: ​🤔​ Clases, interfaces, herencia completa
- **Autocompletado avanzado**: 😋​ Mejor experiencia de desarrollo
- **Refactoring seguro**: 💩​ Cambios con confianza en el código

## Ventajas de TypeScript para POO

TypeScript ofrece múltiples beneficios para trabajar con Programación Orientada a Objetos:

-  ​🥺​ Soporte nativo para clases, interfaces y herencia
-  🦁​ Tipado estático que reduce errores en tiempo de ejecución
-  👽 Uso de modificadores de acceso (public, private, protected)
-  🤑 Facilita la aplicación de los pilares de la POO: encapsulación, abstracción, herencia y polimorfismo

## Modificadores de Acceso

Los modificadores de acceso permiten controlar la visibilidad de propiedades y métodos en una clase:

- `public` → accesible en todas partes
- `private` → accesible solo dentro de la clase
- `protected` → accesible dentro de la clase y sus subclases

### Ejemplo:
```typescript
class Persona {
  public nombre: string;
  private edad: number;
  protected apellido: string;
  
  constructor(nombre: string, edad: number, apellido: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.apellido = apellido;
  }
  
  public obtenerInfo(): string {
    return `${this.nombre} ${this.apellido}`;
  }
  
  private validarEdad(): boolean {
    return this.edad >= 0 && this.edad <= 120;
  }
}
```

## Readonly

`readonly` Readonly es un modificador o concepto en programación que indica que una variable, propiedad o estructura de datos no puede ser modificada después de su inicialización. Su propósito principal es garantizar la inmutabilidad y prevenir cambios accidentales en el código.

### Ejemplo:
```typescript
class Auto {
  readonly marca: string;
  readonly modelo: string;
  
  constructor(marca: string, modelo: string) {
    this.marca = marca;
    this.modelo = modelo;
  }
}

const miAuto = new Auto('Toyota', 'Corolla');
console.log(miAuto.marca); // ✔️ OK: se puede leer
// miAuto.marca = 'Honda'; // ✖️ Error: no se puede modificar
```

## Clases y Objetos

`clases y objetos` Las clases son plantillas o moldes que definen la estructura y comportamiento que tendrán los objetos. Los objetos son instancias específicas creadas a partir de esas clases.

### Definición de clases:
```typescript
class Animal {
  nombre: string;
  especie: string;
  
  constructor(nombre: string, especie: string) {
    this.nombre = nombre;
    this.especie = especie;
  }
  
  dormir(): void {
    console.log(`${this.nombre} está durmiendo`);
  }
  
  comer(comida: string): void {
    console.log(`${this.nombre} está comiendo ${comida}`);
  }
}

// Crear objetos
let perro = new Animal('Firulais', 'Canino');
let gato = new Animal('Whiskers', 'Felino');
```

## Constructores

Los constructores son métodos especiales que inicializan propiedades al crear un objeto.

### Ejemplo con constructor simplificado:
```typescript
class Estudiante {
  // Constructor con parámetros automáticos
  constructor(
    public nombre: string, 
    public edad: number,
    private calificaciones: number[] = []
  ) {}
  
  agregarCalificacion(nota: number): void {
    this.calificaciones.push(nota);
  }
  
  obtenerPromedio(): number {
    if (this.calificaciones.length === 0) return 0;
    const suma = this.calificaciones.reduce((acc, nota) => acc + nota, 0);
    return suma / this.calificaciones.length;
  }
}

let alumno = new Estudiante('Ana', 20);
alumno.agregarCalificacion(85);
alumno.agregarCalificacion(92);
console.log(alumno.obtenerPromedio()); // 88.5
```

## Herencia (extends / super)

La herencia permite que una clase hija herede de una clase padre usando `extends` y `super`.

### Ejemplo:
```typescript
class Animal {
  constructor(public nombre: string) {}
  
  sonido(): void {
    console.log('Hace un sonido');
  }
  
  moverse(): void {
    console.log(`${this.nombre} se está moviendo`);
  }
}

class Perro extends Animal {
  constructor(nombre: string, public raza: string) {
    super(nombre); // Llamada al constructor padre
  }
  
  sonido(): void { // Sobrescribir método
    console.log('Guau!');
  }
  
  moverCola(): void { // Método específico de Perro
    console.log(`${this.nombre} está moviendo la cola`);
  }
}

class Gato extends Animal {
  constructor(nombre: string, public color: string) {
    super(nombre);
  }
  
  sonido(): void {
    console.log('Miau!');
  }
  
  ronronear(): void {
    console.log(`${this.nombre} está ronroneando`);
  }
}

// Uso
let rocky = new Perro('Rocky', 'Golden Retriever');
let whiskers = new Gato('Whiskers', 'Naranja');

rocky.sonido(); // Guau!
whiskers.sonido(); // Miau!
```

## Polimorfismo

El polimorfismo permite que un mismo método tenga diferentes implementaciones según la clase.

### Ejemplo:
```typescript
// Array de diferentes animales
let animales: Animal[] = [
  new Perro('Rocky', 'Labrador'),
  new Gato('Whiskers', 'Siames'),
  new Animal('Genérico')
];

// El mismo método se comporta diferente según el objeto
animales.forEach(animal => {
  animal.sonido(); // Cada uno hace su sonido específico
  animal.moverse(); // Comportamiento heredado
});
```

## Clases Abstractas

Una clase abstracta no puede instanciarse directamente. Puede tener métodos implementados y métodos abstractos que deben implementarse en clases hijas.

### Ejemplo:
```typescript
abstract class Figura {
  constructor(public color: string) {}
  
  // Método concreto (implementado)
  describir(): void {
    console.log(`Esta es una figura de color ${this.color}`);
  }
  
  // Método abstracto (debe implementarse en clases hijas)
  abstract area(): number;
  abstract perimetro(): number;
}

class Cuadrado extends Figura {
  constructor(public lado: number, color: string) {
    super(color);
  }
  
  area(): number {
    return this.lado * this.lado;
  }
  
  perimetro(): number {
    return this.lado * 4;
  }
}

class Circulo extends Figura {
  constructor(public radio: number, color: string) {
    super(color);
  }
  
  area(): number {
    return Math.PI * this.radio * this.radio;
  }
  
  perimetro(): number {
    return 2 * Math.PI * this.radio;
  }
}

// Uso
let cuadrado = new Cuadrado(5, 'rojo');
let circulo = new Circulo(3, 'azul');

console.log(`Área del cuadrado: ${cuadrado.area()}`); // 25
console.log(`Área del círculo: ${circulo.area().toFixed(2)}`); // 28.27
```

## Interfaces

Una interface define la forma de un objeto o clase, pero no contiene implementación. La diferencia con una clase abstracta es que una clase abstracta puede tener implementación parcial, mientras que una interface no.

### Ejemplo:
```typescript
interface IAnimal {
  nombre: string;
  edad: number;
  sonido(): void;
  comer(comida: string): void;
}

interface IVolador {
  volar(): void;
  alturaMaxima: number;
}

// Una clase puede implementar múltiples interfaces
class Pajaro implements IAnimal, IVolador {
  constructor(
    public nombre: string, 
    public edad: number,
    public alturaMaxima: number
  ) {}
  
  sonido(): void {
    console.log('Pío pío!');
  }
  
  comer(comida: string): void {
    console.log(`${this.nombre} está comiendo ${comida}`);
  }
  
  volar(): void {
    console.log(`${this.nombre} está volando hasta ${this.alturaMaxima}m`);
  }
}

// Interface para objetos
interface IConfiguracion {
  tema: 'claro' | 'oscuro';
  idioma: string;
  notificaciones: boolean;
}

let config: IConfiguracion = {
  tema: 'oscuro',
  idioma: 'es',
  notificaciones: true
};
```

## Los 4 Pilares de la POO en TypeScript

### 1. Encapsulación
Ocultar la implementación interna y exponer solo lo necesario.

```typescript
class CuentaBancaria {
  private saldo: number = 0;
  
  public depositar(cantidad: number): void {
    if (cantidad > 0) {
      this.saldo += cantidad;
    }
  }
  
  public retirar(cantidad: number): boolean {
    if (cantidad > 0 && cantidad <= this.saldo) {
      this.saldo -= cantidad;
      return true;
    }
    return false;
  }
  
  public consultarSaldo(): number {
    return this.saldo;
  }
}
```

### 2. Abstracción
```typescript
abstract class Vehiculo {
  abstract acelerar(): void;
  abstract frenar(): void;
}
```

### 3. Herencia
```typescript
class Perro extends Animal {
  constructor(nombre: string) { super(nombre); }
}
```

### 4. Polimorfismo
```typescript
let animales: Animal[] = [new Perro('Rocky'), new Gato('Misu')];
animales.forEach(animal => animal.sonido()); // Cada uno hace su sonido
```

## Ejemplos Mínimos de Cada Pilar

- **Encapsulación**: `private edad: number;`
- **Abstracción**: `abstract area(): number;`
- **Herencia**: `class Perro extends Animal {}`
- **Polimorfismo**: `animal.sonido();`


## GRACIAS POR LEER MUCHAS THANK YOU 🤯
