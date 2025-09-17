var cartas = [
    {src: 'img/batman.jpg', seleccion: false},
    {src: 'img/nightwing.jpg', seleccion: false},
    {src: 'img/redhood.jpg', seleccion: false},
    {src: 'img/tim.jpg', seleccion: false},
    {src: 'img/Damian.jpg', seleccion: false},
    {src: 'img/batgirl.jpg', seleccion: false},
    {src: 'img/catwoman.jpg', seleccion: false},
    {src: 'img/batfamily.jpg', seleccion: false},
    {src: 'img/batman.jpg', seleccion: false},
    {src: 'img/nightwing.jpg', seleccion: false},
    {src: 'img/redhood.jpg', seleccion: false},
    {src: 'img/tim.jpg', seleccion: false},
    {src: 'img/Damian.jpg', seleccion: false},
    {src: 'img/batgirl.jpg', seleccion: false},
    {src: 'img/catwoman.jpg', seleccion: false},
    {src: 'img/batfamily.jpg', seleccion: false}
];

let jugada1 = null, jugada2 = null;
let contadorClicks = 0; 

function actualizarContador(){
    document.getElementById("contador").innerText = "Clicks " + contadorClicks;
}

function iniciarJuego() {
    //Reiniciar contador.
    contadorClicks = 0;
    actualizarContador();
    // Shuffle cards
    cartas.sort(() => Math.random() - 0.5);
    
    // Update card elements
    for (let i = 0; i < 16; i++) {
        let carta = cartas[i].src;
        let celda = document.getElementById(i.toString());
        if (celda) {
            celda.dataset.valor = carta;
            celda.classList.remove("flipped");
            celda.querySelector(".back img").src = carta;
        }
    }
}

function resetearJuego() {
    // Reset card states
    cartas.forEach(carta => carta.seleccion = false);
    
    // Reset selected cards
    jugada1 = null;
    jugada2 = null;

    //Resetear contador.
    contadorClicks = 0;
    actualizarContador();
    
    // Restore the game board
    const juegoDiv = document.getElementById("juego");
    const template = document.getElementById("juegoTemplate").content.cloneNode(true);
    juegoDiv.innerHTML = "";
    juegoDiv.appendChild(template);
    
    // Reinitialize the game
    iniciarJuego();
}

function girarCarta(celda) {
    if (celda.classList.contains("flipped") || (jugada1 && jugada2)) return;

    //Incrementar contador
    contadorClicks++;
    actualizarContador();
    
    celda.classList.add("flipped");

    if (!jugada1) {
        jugada1 = celda;
    } else {
        jugada2 = celda;

        if (jugada1.dataset.valor === jugada2.dataset.valor) {
            // ✅ Pareja encontrada
            cartas[jugada1.id].seleccion = true;
            cartas[jugada2.id].seleccion = true;
            jugada1 = jugada2 = null;
            comprobar();
        } else {
            // ❌ No coinciden → esperar y volver a girar
            setTimeout(() => {
                jugada1.classList.remove("flipped");
                jugada2.classList.remove("flipped");
                jugada1 = jugada2 = null;
            }, 1000);
        }
    }
}

function comprobar() {
    let aciertos = cartas.filter(c => c.seleccion).length;
    if (aciertos === 16) {
        // 📌 Mostrar clicks finales
        document.getElementById("juego").innerHTML = `<h2>🎉 Felicidades, ganaste!!! 🎉</h2>
                                                     <p>Total de clicks: ${contadorClicks}</p>`;
        contadorClicks = 0; // Reiniciar después de mostrar resultado
    }
}