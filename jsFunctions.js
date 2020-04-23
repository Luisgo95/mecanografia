const tpd = "Cuando bajé del avión, el hombre me esperaba con un pedazo de cartón en el que estaba escrito mi nombre. Yo iba a una conferencia de científicos y comentaristas de televisión dedicada a la aparentemente imposible tarea de mejorar la presentación de la ciencia en la televisión comercial. Amablemente, los organizadores me habían enviado un chófer."
const keystring = document.getElementById("contenteditable");
var fallos = 0;
var inicio = 0;
var primero = true;
var string1 = tpd.replace(/\s+/g, ' ');
var tema = true;
document.getElementById("text").innerHTML = string1 + "<div id='linea' class='w-100'></div>";
window.addEventListener("click", () => {
    if (event.target.id != "start") {
        document.getElementById("text").style.backgroundColor = "rgba(0, 0, 0, 0)";
        keystring.removeEventListener("keyup", press);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("oscuro").addEventListener("click", () => { cambiartema(true) });
    document.getElementById("claro").addEventListener("click", () => { cambiartema(false) });
    document.getElementById("modallauncher").addEventListener("click", () => {
        setTimeout(() => {
            document.getElementsByTagName("input")[0].focus();
        }, 460)
    });
    document.getElementById("start").addEventListener("click", () => {
        keystring.removeEventListener("keyup", press);
        keystring.blur();
        keystring.value = "";
        fallos = 0;
        inicio = 0;
        primero = true;
        keystring.addEventListener("keyup", press);
        keystring.addEventListener("keydown", press);
        if (tema) {
            document.getElementById("text").style.backgroundColor = "rgba(0, 0, 0, .1)"
        } else {
            document.getElementById("text").style.backgroundColor = "rgba(0, 0, 0, .05)"
        }
        document.getElementById("text").innerHTML = string1 + "<div id='linea' class='w-100'></div>";
        document.getElementById("text").scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        keystring.focus();
    });
    document.getElementById("cambiar").addEventListener("click", () => {
        if (document.getElementsByTagName("input")[0].value != "") {
            string1 = document.getElementsByTagName("input")[0].value.replace(/\s+/g, ' ');
        } else {
            string1 = tpd.replace(/\s+/g, ' ');
        }
        document.getElementById("text").innerHTML = string1 + "<div id='linea' class='w-100'></div>";
        document.getElementById("text").style.backgroundColor = "rgba(0, 0, 0, 0)";
        document.getElementById("text").scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        keystring.removeEventListener("keyup", press);
        keystring.blur();
    });
})

function cambiartema(oscuro) {
    if (oscuro) {
        document.body.style.backgroundColor = "var(--dark1)";
        document.body.style.color = "#cccccc";
        tema = oscuro;
        if (document.getElementById("text").children[0].className == "text-primary" || document.getElementById("text").children[0].className == "text-danger") {
            document.getElementById("text").children[0].setAttribute("style", "background-color:rgba(0, 0, 0, .4);");
        }
        document.getElementById("modallauncher").setAttribute("class", "text-center bg-dark py-2 px-3 text-monospace text-small rounded-left");
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        tema = oscuro;
        if (document.getElementById("text").children[0].className == "text-primary" || document.getElementById("text").children[0].className == "text-danger") {
            document.getElementById("text").children[0].setAttribute("style", "background-color:rgba(0, 0, 0, .1);");
        }
        document.getElementById("modallauncher").setAttribute("class", "text-center bg-light py-2 px-3 text-monospace text-small rounded-left");
    }
}

function press() {
    var e = event
    setTimeout(() => {
        if (e.keyCode == 32) {
            e.preventDefault();
        }
        if (string1.startsWith(keystring.value)) {
            if (keystring.value.length > 0) {
                if (primero) {
                    inicio = Date.now();
                    primero = false;
                }
            }
            if (tema) {
                document.getElementById("text").innerHTML = "<span class='text-primary' style='background-color:rgba(0, 0, 0, .4);'>" + keystring.value.replace(/  +/g, (match) => {return " " + Array(match.length).join('&nbsp;')}) + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.value.length, string1.length)) + "<div id='linea' class='w-100'></div>";
            } else {
                document.getElementById("text").innerHTML = "<span class='text-primary' style='background-color:rgba(0, 0, 0, .1);'>" + keystring.value.replace(/  +/g, (match) => {return " " + Array(match.length).join('&nbsp;')}) + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.value.length, string1.length)) + "<div id='linea' class='w-100'></div>";
            }
            document.getElementById("ppm").innerHTML = Math.round((keystring.value.split(" ").length / ((Date.now() - inicio) / 1000 / 60)) * 100) / 100 + " ppm";
            
            if (keystring.value.length == string1.length) {
                document.getElementById("text").style.backgroundColor = "rgba(0, 0, 0, 0)";
                inicio = 0;
                keystring.removeEventListener("keyup", press);
                keystring.blur();
            }
        } else {
            if (tema) {
                document.getElementById("text").innerHTML = "<span class='text-danger' style='background-color:rgba(0, 0, 0, .4);'>" + keystring.value.replace(/  +/g, (match) => {return " " + Array(match.length).join('&nbsp;')}) + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.value.length, string1.length)) + "<div id='linea' class='w-100'></div>";
            } else {
                document.getElementById("text").innerHTML = "<span class='text-danger' style='background-color:rgba(0, 0, 0, .1);'>" + keystring.value.replace(/  +/g, (match) => {return " " + Array(match.length).join('&nbsp;')}) + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.value.length, string1.length)) + "<div id='linea' class='w-100'></div>";
            }
            if (e.key != "Backspace") {
                if (primero == false) {
                    fallos++;
                }
            }
        }
        document.getElementById("text").scroll({
            top: document.getElementById("scroll").offsetTop - 60,
            left: 0,
            behavior: 'smooth'
        });
        document.getElementById("fallos").innerHTML = "fallos: " + fallos + ", el " + Math.round(fallos / keystring.value.length * 100 * 100) / 100 + "%";
    }, 1)
}