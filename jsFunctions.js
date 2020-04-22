var keystring = "";
var fallos = 0;
var inicio = 0;
var primero = true;
var string1 = string1 = document.getElementById("text").innerHTML;

window.addEventListener("load", () => {
    document.getElementsByTagName("a")[0].addEventListener("click", () => {
        if (document.getElementsByTagName("input")[0].value != "") {
            document.getElementById("text").innerHTML = document.getElementsByTagName("input")[0].value;
            string1 = document.getElementById("text").innerHTML;
        }
        window.addEventListener("keydown", press)
    });
});

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
        document.getElementById("text").innerHTML = "<span class='text-primary bg-muted'>" + keystring + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.length, string1.length));
        document.getElementById("ppm").innerHTML = Math.round((keystring.split(" ").length / ((Date.now() - inicio) / 1000 / 60)) * 100) / 100 + " ppm";
        if (keystring.length == string1.length) {
            window.removeEventListener("keydown", press);
        }
    } else {
        document.getElementById("text").innerHTML = "<span class='text-danger bg-muted'>" + keystring + "</span>" + "<span id='scroll'></span>" + (string1.substring(keystring.length, string1.length));
        if (event.key != "Backspace") {
            if (primero == false) {
                fallos++;
            }
        }
    }
    window.scroll(0, document.getElementById("scroll").offsetTop - window.innerHeight / 2);
    document.getElementById("fallos").innerHTML = "fallos: " + fallos + ", el " + Math.round(fallos / string1.length * 100 * 100) / 100 + "%";
}