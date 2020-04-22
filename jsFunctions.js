const tpd = "Cuando bajé del avión, el hombre me esperaba con un pedazo de cartón en el que estaba escrito mi nombre. Yo iba a una conferencia de científicos y comentaristas de televisión dedicada a la aparentemente imposible tarea de mejorar la presentación de la ciencia en la televisión comercial. Amablemente, los organizadores me habían enviado un chófer."
var keystring = "";
var fallos = 0;
var inicio = 0;
var primero = true;
var string1 = tpd;
var tema = true;
document.getElementById("text").innerHTML = string1 + "<div id='linea' class='w-100'></div>";

window.addEventListener("load", () => {
    document.getElementById("oscuro").addEventListener("click", () => { cambiartema(true) });
    document.getElementById("claro").addEventListener("click", () => { cambiartema(false) });
    document.getElementById("escribir").addEventListener("click", () => {
        window.removeEventListener("keydown", press);
        if (document.getElementsByTagName("input")[0].value != "") {
            string1 = document.getElementsByTagName("input")[0].value;
        } else {
            string1 = tpd;
        }
        document.getElementById("text").innerHTML = string1 + "<div id='linea' class='w-100'></div>";
        keystring = "";
        fallos = 0;
        inicio = 0;
        primero = true;
        window.addEventListener("keydown", press)
    });
})

function cambiartema(oscuro) {
    if (oscuro) {
        document.body.style.backgroundColor = "var(--dark1)";
        document.body.style.color = "#cccccc";
        tema = oscuro;
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        tema = oscuro;
    }

}


function press() {
    if (event.keyCode == 32) {
        event.preventDefault();
    }
    if (event.key == "Backspace") {
        keystring = keystring.slice(0, -1);
    } else if (event.keyCode < 112 || event.keyCode > 143) {
        if (event.keyCode > 46 && event.keyCode != 145 || event.keyCode == 32) {
            if (event.key != "Dead") {
                keystring += event.key;
            }
        }
    }
    if (string1.startsWith(keystring)) {
        if (keystring.length > 0) {
            if (primero) {
                inicio = Date.now();
                primero = false;

            }
        }
        if (tema) {
            document.getElementById("text").innerHTML = "<span class='text-primary' style='background-color:rgba(0, 0, 0, .4);'>" + keystring + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.length, string1.length)) + "<div id='linea' class='w-100'></div>";
        } else {
            document.getElementById("text").innerHTML = "<span class='text-primary bg-muted'>" + keystring + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.length, string1.length)) + "<div id='linea' class='w-100'></div>";
        }
        document.getElementById("ppm").innerHTML = Math.round((keystring.split(" ").length / ((Date.now() - inicio) / 1000 / 60)) * 100) / 100 + " ppm";
        if (keystring.length == string1.length) {
            window.removeEventListener("keydown", press);
        }
    } else {
        if (tema) {
            document.getElementById("text").innerHTML = "<span class='text-danger' style='background-color:rgba(0, 0, 0, .4);'>" + keystring + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.length, string1.length)) + "<div id='linea' class='w-100'></div>";
        } else {
            document.getElementById("text").innerHTML = "<span class='text-danger bg-muted'>" + keystring + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.length, string1.length)) + "<div id='linea' class='w-100'></div>";
        }
        if (event.key != "Backspace") {
            if (primero == false) {
                fallos++;
            }
        }
    }
    document.getElementById("text").scroll({
        top: document.getElementById("scroll").offsetTop - 57,
        left: 0,
        behavior: 'smooth'
    });
    document.getElementById("fallos").innerHTML = "fallos: " + fallos + ", el " + Math.round(fallos / string1.length * 100 * 100) / 100 + "%";
}