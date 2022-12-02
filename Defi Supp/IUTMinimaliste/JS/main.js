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
    ['../Edited/1.html','../Edited/2.html','../Edited/3.html'],
    ['../Edited/4.html',"",'../Edited/6.html'],
    ['../Edited/7.html','../Edited/8.html','../Edited/9.html']
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
    if (code == "Backspace") {
        window.history.back();
    }
    arr[x][y].focus();
    arr[x][y].style.color="red";

    arr[x][y].addEventListener('click',function(e){    // On écoute l'événement click
        window.open(links[x][y],"_self");
    })
});

