const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const backgroundCanvas = document.getElementById("backgroundCanvas");

// Ajusta el tamaño de ambos lienzos al tamaño del contenedor

// Ajusta el tamaño de ambos lienzos al tamaño del contenedor
backgroundCanvas.width = document.getElementById("canvas-container").offsetWidth;
backgroundCanvas.height = document.getElementById("canvas-container").offsetHeight;

import { Jugador } from "./Jugador.js";
import { Juego } from "./Juego.js";

const jugador = new Jugador("Player 1");

const juego = new Juego(jugador, canvas, ctx);


new Granim({
    element: '#backgroundCanvas',
    direction: 'top-bottom', // o 'left-right', 'top-bottom'
    states: {
      "default-state": {
        gradients: [
          ['#ff9966', '#3E3838'],
          ['#00F260', '#373535'],
          ['#f05053', '#575757']
        ],
        transitionSpeed: 8000
      }
    }
});
juego.iniciar();
juego.personalzarTablero(3, 3);
