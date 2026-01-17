// Selección de todos los elementos necesarios

const titulo = document.querySelector('.reproductor h1');
const nombre = document.querySelector('.reproductor p');
const cancion = document.getElementById('cancion');
const barraProgreso = document.getElementById('barraProgreso');
const atras = document.querySelector('.botones .atras');
const adelante = document.querySelector('.botones .siguiente');
const iconoReproducirPausar = document.getElementById('reproducir-pausar');
const reproducirPausar = document.querySelector('.reproducir-pausar');
const frase = document.getElementById('frase');
const muteBtn = document.querySelector('.mute');

// Frase de carga
let indiceFrase = 0;
const listaFrases = [
    "JOINING SERVER",
    "PREPARING ASSETS",
    "ESTABLISHING CONNECTION",
];
function actualizarFrase() { // Actualización de la frase cada 5 segundos, rotando entre las frases de la lista
    frase.textContent = listaFrases[indiceFrase];
    indiceFrase = (indiceFrase + 1) % listaFrases.length;
}
actualizarFrase();
setInterval(actualizarFrase, 5000);


//Canciones;
muteBtn.innerHTML = '<i class="bi bi-volume-up"></i>'; //Establecemos el icono inicial del botón de mute
cancion.volume = barraVolumen.value / 100; // Dividimos el valor entre 100 porque el volumen va de 0 a 1 mientras que la barra de vlumen va de 0 a 100
const canciones = [ // Lista de canciones
    {
        juego: 'Doom',
        nombre: 'The only thing they fear is you',
        archivo: 'music/doom.mp3'
    },
    {
        juego: 'God of War',
        nombre: 'Overture',
        archivo: 'music/godOfWar_overture.mp3'
    },
    {
        juego: 'Undertale',
        nombre: 'Spider dance',
        archivo: 'music/undertaleSpiderDance.mp3'
    },
    {
        juego: 'Zelda',
        nombre: 'Canción de la tormenta',
        archivo: 'music/zeldaCancionDeLaTormenta.mp3'
    },
];

let indiceCancion = Math.floor(Math.random() * canciones.length); // Numero random inicial para la canción
function cancionAleatoria() {
    indiceCancion = Math.floor(Math.random() * canciones.length);
    actualizarCancion();
}
window.addEventListener("keydown", function(event) { //Evento para mutear o desmutear con el espacio
    if (event.code === "Space") {
        if (cancion.muted) {
            muteBtn.innerHTML = '<i class="bi bi-volume-up"></i>'; // Inserción del icono de volumen para que tambiém cambie al mutear con espacio
            barraVolumen.value = 50;
            cancion.volume = 0.5;
            cancion.muted = false;
        } else {
            muteBtn.innerHTML = '<i class="bi bi-volume-mute"></i>';
            barraVolumen.value = 0;
            cancion.volume = 0;
            cancion.muted = true;
        }
    }
});
window.addEventListener("keyup", function(event) { //Evento para cambiar de canción con las flechas izquierda y derecha
    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
        cancionAleatoria();
        cancion.play();
    }
});

function actualizarCancion() { // Utilizamos el indice que incrementa para cambiar la canción
    titulo.textContent = canciones[indiceCancion].juego;
    nombre.textContent = canciones[indiceCancion].nombre;
    cancion.src = canciones[indiceCancion].archivo;
    cancion.addEventListener('loadeddata', function(){});   
};
reproducirPausar.addEventListener('click', function(){ // Evento para reproducir o pausar la canción dependiendo de si está o no en pausa
    if (cancion.paused) {
        cancion.play();
    } else {
        cancion.pause();
    }
    reproducirPausar.blur() // Quita el foco del botón al hacer click para evitar que al pulsar espacio se active de nuevo

});

barraVolumen.addEventListener('input', function() { // Evento para cambiar el volumen según la posición de la barra
    cancion.volume = barraVolumen.value / 100;
});
adelante.addEventListener('click', function() { // Evento para cambiar a la siguiente canción
    indiceCancion = (indiceCancion + 1) % canciones.length;
    actualizarCancion();
    adelante.blur()
    cancion.play();
});
atras.addEventListener('click', function() { // Evento para cambiar a la canción anterior
    indiceCancion = (indiceCancion - 1 + canciones.length) % canciones.length;
    actualizarCancion();
    atras.blur()
    cancion.play();
});


muteBtn.addEventListener('click', function() { // Evento para mutear o desmutear al hacer click en el botón
    cancion.muted = !cancion.muted; // Alterna el estado de mute
    if (cancion.muted) {
        muteBtn.innerHTML = '<i class="bi bi-volume-mute"></i>';
        barraVolumen.value = 0;
    } else {
        muteBtn.innerHTML = '<i class="bi bi-volume-up"></i>';
        barraVolumen.value = 50;
    }
    muteBtn.blur()
});

actualizarCancion(); // Llamada inicial para establecer la primera canción