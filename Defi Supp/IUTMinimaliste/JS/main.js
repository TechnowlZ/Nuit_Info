var arr = [] ;
let cont = 1;
for (var i = 0; i < 3; i++) {
    arr[i] = new Array();
    for (var j = 0; j < 3; j++) {
        arr[i].push(document.getElementById(cont));
        cont++;
    }
}
let x = 0;
let y = 0;
arr[x][y].focus();
arr[x][y].style.color="red";
var links =[
    ["https://iut-montpellier-sete.edu.umontpellier.fr/liut/","https://iut-montpellier-sete.edu.umontpellier.fr/formations/","https://iut-montpellier-sete.edu.umontpellier.fr/inscriptions/"],
    ["https://iut-montpellier-sete.edu.umontpellier.fr/scolarite/","","https://iut-montpellier-sete.edu.umontpellier.fr/relations-entreprises/"],
    ["https://iut-montpellier-sete.edu.umontpellier.fr/international/","https://iut-montpellier-sete.edu.umontpellier.fr/vie-etudiante/","https://iut-montpellier-sete.edu.umontpellier.fr/actualites/"]
]

document.addEventListener('keydown', (event) => {

    var code = event.code;
    arr[x][y].style.color="black";
    if (code == 'ArrowUp') {
        if (x > 0) {
            x--;
        }
    }
    else if (code == 'ArrowDown') {
        if (x < 2) {
            x++;
        }
    }
    else if (code == 'ArrowLeft') {
        if (y > 0) {
            y--;
        }
    }
    else if (code == 'ArrowRight') {
       if (y < 2) {
        y++;
       }
    }
    arr[x][y].focus();
    arr[x][y].style.color="red";

    arr[x][y].addEventListener('click',function(e){    // On écoute l'événement click
        window.open(links[x][y],"_self");
    })
}, false);

