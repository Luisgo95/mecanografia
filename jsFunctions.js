function leerJSON() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "text.json", false);
    var result={};
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && rawFile.status === 200 || rawFile.status == 0) {
            let a = JSON.parse(rawFile.responseText);
            let s=a.la_llegada_de_los_marcianos["capitulo_" + (Math.round(Math.random() * 17) + 1)]
            let r= Math.round(Math.random() * s.contenido.length);
            if(r>s.contenido.length-300){
                r-=300;
            }
            result.titulo=Object.keys(a)[0].replace(/_/g," ")+" - "+s.titulo;
            let ss1=s.contenido.substring(r, s.contenido.length)
            let p1= ss1.indexOf(".")
            let ss2=ss1.substring(p1+2, ss1.length)
            let p2=ss2.indexOf(".")
            if (p2+1<150) {
                let ss3=ss2.substring(p2+2, ss2.length)
                let p3=ss3.indexOf(".")
                result.contenido=ss2.substring(0, p2+p3+3)
                console.log(1)
            }else{
                result.contenido=ss2.substring(0, p2+1)
                console.log(2)
            }
        }
    }
    rawFile.send(null);
    return result;
}

const tpd = "Cuando bajé del avión, el hombre me esperaba con un pedazo de cartón en el que estaba escrito mi nombre. Yo iba a una conferencia de científicos y comentaristas de televisión dedicada a la aparentemente imposible tarea de mejorar la presentación de la ciencia en la televisión comercial. Amablemente, los organizadores me habían enviado un chófer."
const keystring = document.getElementById("contenteditable");
var fallos = 0;
var inicio = 0;
var primero = true;
var texto = leerJSON();
if (texto.contenido==undefined) {
    texto.titulo="PREDETERMINADO";
    texto.contenido=tpd;
}
var tema = true;
document.getElementById("text").innerHTML = texto.contenido + "<div id='linea' class='w-100'></div>";
document.getElementById("titulo").innerHTML=texto.titulo;
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
        document.getElementById("text").innerHTML = texto.contenido + "<div id='linea' class='w-100'></div>";
        document.getElementById("text").scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        keystring.focus();
    });
    document.getElementById("cambiar").addEventListener("click", () => {
        if (document.getElementsByTagName("input")[0].value != "") {
            texto.contenido = document.getElementsByTagName("input")[0].value.replace(/\s+/g, ' ');
            document.getElementById("titulo").innerHTML="";
        } else {
            texto = leerJSON()
            if (texto.contenido==undefined) {
                texto.titulo="PREDETERMINADO";
                texto.contenido=tpd;
            }
        }
        document.getElementById("text").innerHTML = texto.contenido + "<div id='linea' class='w-100'></div>";
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
        if (texto.contenido.startsWith(keystring.value)) {
            if (keystring.value.length > 0) {
                if (primero) {
                    inicio = Date.now();
                    primero = false;
                }
            }
            if (tema) {
                document.getElementById("text").innerHTML = "<span class='text-primary' style='background-color:rgba(0, 0, 0, .4);'>" + keystring.value.replace(/  +/g, (match) => { return " " + Array(match.length).join('&nbsp;') }) + "</span>" + "<span id='scroll'></span>" + (texto.contenido.substring(keystring.value.length, texto.contenido.length)) + "<div id='linea' class='w-100'></div>";
            } else {
                document.getElementById("text").innerHTML = "<span class='text-primary' style='background-color:rgba(0, 0, 0, .1);'>" + keystring.value.replace(/  +/g, (match) => { return " " + Array(match.length).join('&nbsp;') }) + "</span>" + "<span id='scroll'></span>" + (texto.contenido.substring(keystring.value.length, texto.contenido.length)) + "<div id='linea' class='w-100'></div>";
            }
            document.getElementById("ppm").innerHTML = Math.round((keystring.value.split(" ").length / ((Date.now() - inicio) / 1000 / 60)) * 100) / 100 + " ppm";

            if (keystring.value.length == texto.contenido.length) {
                document.getElementById("text").style.backgroundColor = "rgba(0, 0, 0, 0)";
                inicio = 0;
                keystring.removeEventListener("keyup", press);
                keystring.blur();
            }
        } else {
            if (tema) {
                document.getElementById("text").innerHTML = "<span class='text-danger' style='background-color:rgba(0, 0, 0, .4);'>" + keystring.value.replace(/  +/g, (match) => { return " " + Array(match.length).join('&nbsp;') }) + "</span>" + "<span id='scroll'></span>" + (texto.contenido.substring(keystring.value.length, texto.contenido.length)) + "<div id='linea' class='w-100'></div>";
            } else {
                document.getElementById("text").innerHTML = "<span class='text-danger' style='background-color:rgba(0, 0, 0, .1);'>" + keystring.value.replace(/  +/g, (match) => { return " " + Array(match.length).join('&nbsp;') }) + "</span>" + "<span id='scroll'></span>" + (texto.contenido.substring(keystring.value.length, texto.contenido.length)) + "<div id='linea' class='w-100'></div>";
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