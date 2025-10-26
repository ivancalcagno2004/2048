const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

import { Jugador } from "./Jugador.js";
import { Juego } from "./Juego.js";

const jugador = new Jugador("Player 1");

const juego = new Juego(jugador, canvas, ctx);

juego.iniciar();
juego.personalzarTablero(3, 3);