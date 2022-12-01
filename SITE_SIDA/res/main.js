

//une fonction permettant de changer quelque chose toute les 30 secondes
var defaultTimeSeconds = 30;
var secondLeft = defaultTimeSeconds;



setInterval(function() {
    defaultTimeSeconds -= 1;
    if(secondLeft <= 0){
        passNextQuestion();
        secondLeft = defaultTimeSeconds;
    }
}, 1000)



const elt1 = document.getElementById('choix1');    // On récupère l'élément sur lequel on veut détecter le clic
elt1.addEventListener('click', choice(1) {          // On écoute l'événement click
})
const elt2 = document.getElementById('choix2');
elt2.addEventListener('click', choice(2) {
}
const elt3 = document.getElementById('choix3');
elt3.addEventListener('click', choice(3) {
})

const elt4 = document.getElementById('choix4');
elt4.addEventListener('click', choice(4) {

})

//document.getElementById("myDIV").style.display = "none"; 

//setInterval(function, milliseconds)
//---------------------FONCTIONS-----------------------
const buttons = [elt1, elt2, elt3, elt4];

function passNextQuestion() {
    
}

function choice(a){
    for (let i; i<buttons.length;i++){
        if (a != i){
            buttons[i].style.display="none"; 
        }
    }
    textereponse.style.display="block";
}

function cleanboard()

    for (let i; i<buttons.length;i++){
        buttons[i].style.display="none";
    }
    

    


    