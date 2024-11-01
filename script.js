// genera un numero random del 1 al 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// referencia a los parrafos <p>
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

// referencia a la entrada de texto y el boton de enviar
const guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");

// referencia al conteo de intentos y al boton de reinicio
let guessCount = 1;
let resetButton;

// coloca el cursor en cuantpo se cargue la pagina; 'focus()' es un metodo para elementos 'input'
guessField.focus();

function checkGuess() {
    // establece su valor al valor actual ingresado y nos seguramos que sea un numero
    let userGuess = Number(guessField.value);
    
    // si es el primer intento del jugador
    if (guessCount === 1) {
        guesses.textContent = "Intentos anteriores: ";
    }
    guesses.textContent += userGuess + " ";
    
    // verifica si la respuesta es igual a randomNumber 
    if (userGuess === randomNumber) {
        lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
        // verifica si es el ultimo turno
    } else if (guessCount === 10) {
        lastResult.textContent = "¡¡¡Fin del juego!!!";
        setGameOver();
    } else {
        lastResult.textContent = "¡Incorrecto!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "¡El número es muy bajo!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "¡El número es muy grande!";
        }
    }

    // aumenta +1 el contador de intentos
    guessCount++;
    
    // vaciamos el valor del campo de texto
    guessField.value = "";
    
    // enfocamos para el proximo intento
    guessField.focus();
}

// agregamos escucha de eventos al boton 'guessSubmit': al dar 'click', se ejecuta la funcion 'checkGuess()'
guessSubmit.addEventListener("click", checkGuess);

function setGameOver(){
    // deshabilitar el campode texto y el boton
    guessField.disabled = true;
    guessSubmit.disabled = true;

    // generar un boton para iniciar el juego
    resetButton = document.createElement("button");
    resetButton.textContent = "Iniciar nuevo juego";
    document.body.append(resetButton);
    
    // un escucha de eventos 'click' para ejecutar la funcion 'resetGame()'
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    // vuelve al primer intento
    guessCount = 1;
    
    // vaciamos la informacion dentro de la clase 'resultParas'
    const resetParas = document.querySelectorAll(".resultParas p");
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = "";
    }
    
    // elimina el boton de reinicio
    resetButton.parentNode.removeChild(resetButton);
    
    // habilita los elementos del formulario y enfoca el campo de texto
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
    
    // elimina el color del parrafo de 'lastResult'
    lastResult.style.backgroundColor = "white";
    
    // genera un nuevo numero random
    randomNumber = Math.floor(Math.random() * 100 + 1);
}