import { Pieza } from "./Pieza.js";

export class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.celdas = this.crearCeldas();
        this.agregarPiezaInicial();
    }

    recargarTablero(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.celdas = this.crearCeldas();
        this.agregarPiezaInicial();
    }

    crearCeldas() {
        let celdas = [];
        for (let i = 0; i < this.filas; i++) {
            celdas[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                celdas[i][j] = null; // Las celdas comienzan vacías
            }
        }
        return celdas; 
    }

    agregarPiezaInicial() {
        // Agrega dos piezas iniciales al tablero
        this.agregarPiezaAleatoria();
        this.agregarPiezaAleatoria();
    }

    agregarPiezaAleatoria() {
        let celdasVacias = [];
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                if (this.celdas[i][j] === null) {
                    celdasVacias.push({ fila: i, columna: j });
                }
            }
        }

        if (celdasVacias.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * celdasVacias.length);
            const { fila, columna } = celdasVacias[indiceAleatorio];
            const valor = Math.random() < 0.9 ? 2 : 4; // 90% de probabilidad de 2, 10% de 4
            this.celdas[fila][columna] = new Pieza(valor, fila, columna);
        }
    }

    obtenerColor(valor) {
        switch (valor) {
            case 2: return "#eee4da";
            case 4: return "#ede0c8";
            case 8: return "#f2b179";
            case 16: return "#f59563";
            case 32: return "#f67c5f";
            case 64: return "#f65e3b";
            case 128: return "#edcf72";
            case 256: return "#edcc61";
            case 512: return "#edc850";
            case 1024: return "#edc53f";
            case 2048: return "#edc22e";
            default: return "#3c3a32";
        }
    }

    dibujarGrillas(ctx, canvasWidth, canvasHeight) {
        const cellWidth = canvasWidth / this.columnas;
        const cellHeight = canvasHeight / this.filas;

        ctx.strokeStyle = "#bbada0"; // Color de las líneas de las grillas
        ctx.lineWidth = 2;

        // Dibujar las celdas y las piezas
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                const x = j * cellWidth;
                const y = i * cellHeight;

                // Dibujar celda
                ctx.fillStyle = "#cdc1b4"; // Color de las celdas vacías
                ctx.fillRect(x, y, cellWidth, cellHeight);

                // Dibujar pieza si existe
                const pieza = this.celdas[i][j];
                if (pieza) {
                    ctx.fillStyle = this.obtenerColor(pieza.valor);
                    ctx.fillRect(x + 5, y + 5, cellWidth - 10, cellHeight - 10);

                    // Dibujar el valor de la pieza
                    ctx.fillStyle = pieza.valor > 4 ? "#f9f6f2" : "#776e65"; // Color del texto
                    ctx.font = "bold 24px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(
                        pieza.valor,
                        x + cellWidth / 2,
                        y + cellHeight / 2
                    );
                }
            }
        }

        // Dibujar líneas horizontales
        for (let i = 0; i <= this.filas; i++) {
            const y = i * cellHeight;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasWidth, y);
            ctx.stroke();
        }

        // Dibujar líneas verticales
        for (let j = 0; j <= this.columnas; j++) {
            const x = j * cellWidth;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight);
            ctx.stroke();
        }
    }
}