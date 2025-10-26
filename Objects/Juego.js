import { Tablero } from "./Tablero.js";
import { Pieza } from "./Pieza.js";
export class Juego{
    constructor(jugador, canvas, ctx){
        this.tablero = new Tablero(5,5);
        this.jugador = jugador;
        this.canvas = canvas;
        this.ctx = ctx;
        // Escuchar eventos de teclado
        window.addEventListener("keydown", (e) => this.manejarTecla(e));
    
    }

    iniciar(){
        this.tablero.dibujarGrillas(this.ctx, this.canvas.width, this.canvas.height);
    }

    personalzarTablero(filas, columnas){
        this.tablero.recargarTablero(filas, columnas);
        this.tablero.dibujarGrillas(this.ctx, this.canvas.width, this.canvas.height);
    }

    manejarTecla(event) {
        const tecla = event.key;
        let movimientoValido = false;

        switch (tecla) {
            case "ArrowUp":
                movimientoValido = this.moverPiezas("arriba");
                break;
            case "ArrowDown":
                movimientoValido = this.moverPiezas("abajo");
                break;
            case "ArrowLeft":
                movimientoValido = this.moverPiezas("izquierda");
                break;
            case "ArrowRight":
                movimientoValido = this.moverPiezas("derecha");
                break;
        }

        if (movimientoValido) {
            this.tablero.agregarPiezaAleatoria();
            this.tablero.dibujarGrillas(this.ctx, this.canvas.width, this.canvas.height);
            if (this.verificarPerdida()) {
                console.log("Perdiste!");
            // Reiniciar el juego o detenerlo
            }
        }
    }

    verificarPerdida() {
        const { filas, columnas, celdas } = this.tablero;

        // Verificar si hay celdas vacías
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                if (celdas[i][j] === null) {
                    return false; // Todavía hay movimientos posibles
                }
            }
        }

        // Verificar si hay piezas adyacentes con el mismo valor
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                const pieza = celdas[i][j];
                if (pieza) {
                    // Verificar derecha
                    if (j < columnas - 1 && celdas[i][j + 1] && celdas[i][j + 1].valor === pieza.valor) {
                        return false;
                    }
                    // Verificar abajo
                    if (i < filas - 1 && celdas[i + 1][j] && celdas[i + 1][j].valor === pieza.valor) {
                        return false;
                    }
                }
            }
        }

        return true; // No hay movimientos posibles
    }

    moverPiezas(direccion) {
        let movimientoValido = false;

        const { filas, columnas, celdas } = this.tablero;

        // Crear una copia del tablero para verificar si hubo cambios
        const copiaCeldas = celdas.map((fila) => fila.slice());

        // Lógica de movimiento
        if (direccion === "arriba" || direccion === "abajo") {
            for (let col = 0; col < columnas; col++) {
                let valores = [];
                for (let fila = 0; fila < filas; fila++) {
                    if (celdas[fila][col]) {
                        valores.push(celdas[fila][col].valor);
                    }
                }

                if (direccion === "abajo") valores.reverse();

                valores = this.fusionarValores(valores);

                if (direccion === "abajo") valores.reverse();

                for (let fila = 0; fila < filas; fila++) {
                    celdas[fila][col] = valores[fila]
                        ? new Pieza(valores[fila], fila, col)
                        : null;
                }
            }
        } else if (direccion === "izquierda" || direccion === "derecha") {
            for (let fila = 0; fila < filas; fila++) {
                let valores = [];
                for (let col = 0; col < columnas; col++) {
                    if (celdas[fila][col]) {
                        valores.push(celdas[fila][col].valor);
                    }
                }

                if (direccion === "derecha") valores.reverse();

                valores = this.fusionarValores(valores);

                if (direccion === "derecha") valores.reverse();

                for (let col = 0; col < columnas; col++) {
                    celdas[fila][col] = valores[col]
                        ? new Pieza(valores[col], fila, col)
                        : null;
                }
            }
        }

        // Verificar si el tablero cambió
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                if (celdas[i][j] !== copiaCeldas[i][j]) {
                    movimientoValido = true;
                }
            }
        }

        return movimientoValido;
    }

    fusionarValores(valores) {
        let resultado = [];
        let skip = false;

        for (let i = 0; i < valores.length; i++) {
            if (skip) {
                skip = false;
                continue;
            }

            if (i < valores.length - 1 && valores[i] === valores[i + 1]) {
                resultado.push(valores[i] * 2);
                skip = true;
            } else {
                resultado.push(valores[i]);
            }
        }

        while (resultado.length < this.tablero.filas) {
            resultado.push(null);
        }

        return resultado;
    } 
}