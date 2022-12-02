

//une fonction permettant de changer quelque chose toute les 30 secondes
var questionrepondue = false;
var droitAuClick = true;
timer()
var elemNoticeAnswer = document.getElementById('noticeAnswer')
elemNoticeAnswer.style.display="none";

const elt1 = document.getElementById('choix1');    // On récupère l'élément sur lequel on veut détecter le clic
elt1.addEventListener('click',function(e){    // On écoute l'événement click
    choice(1);
})  

const elt2 = document.getElementById('choix2');
elt2.addEventListener('click',function(e){
    choice(2);
})

const elt3 = document.getElementById('choix3');
elt3.addEventListener('click', function(e){
    choice(3);
})

const elt4 = document.getElementById('choix4');
elt4.addEventListener('click', function(e) {
    choice(4);
})

//ajout element appuyer sur entrée ssi déjà choix question
document.addEventListener('keypress', function(e) {
    if (e.key=='Enter' && questionrepondue){
        // quand entrer est presser faire
        passNextQuestion();
    }

})

//---------------------FONCTIONS-----------------------
const buttons = [elt1, elt2, elt3, elt4];

//est appelée une fois que l'information a été affichée et que le client ai cliqué sur entrée
//permet de changer l'image de background et l'intérieur des bouttons
function passNextQuestion() {
    cleanboard();
    //la faut changer valeur des boutons
    /*questionrepondue=false;
    newBoard();
    timer();
    droitAuClick=true;*/
}

//est appelée lors du clique du choix
//permet d'enlever l'affichage des autres bouttons
function choice(a){

    if (droitAuClick){
        for (let i=0; i<buttons.length;i++){
            if (a != i+1){
                buttons[i].style.display="none"; 
            }
        }
        elemNoticeAnswer.style.display="block";
        droitAuClick=false;

    }

    document.getElementById("question-phrase").display="block";
    document.getElementById("texte-solution").innerText = arrayButtonTextSolution[a]
    if(situation.choice[a].value == situation.choice[a].id_situation_next){
        document.getElementById("noticeAnswer").style.backgroundColor="red"
    }else{
        document.getElementById("noticeAnswer").style.backgroundColor="green"
    }
    

    questionrepondue=true;
}


//la fonction cleanboard permet de tout enlever pour passer à la prochaine question
function cleanboard(){
    for (let i=0; i<buttons.length;i++){
        buttons[i].style.display="none";
    }
    elemNoticeAnswer.style.display="none"; 
}

//la fonction newBoard permet de tout remettre en place pour la prochaine question
function newBoard(){
    for (let i=0; i<buttons.length;i++){
        buttons[i].style.display="block";
    }
    elemNoticeAnswer.style.display="block";     
}



// TIMER

function timer(){
    let temps = 5
    console.log("here")
    const timerElement = document.getElementById("timer")
        function diminuerTemps() {
            if(temps>=0){
                timerElement.innerText = temps
                temps--
                console.log("here")
            }
        }
        setInterval(diminuerTemps, 1000)
}





var allSituations = null
getAllSituations(2);

//Appel à l'API de base
function getAllSituations(idStory) {

    let url = "https://publicedge.ml/night-info/get_first_situation.php?id_story=" + idStory
    console.log(url);
  
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
      jsonObj = JSON.parse(this.responseText);
      allSituations = jsonObj;
        console.log(jsonObj)
      onDataLoaded(jsonObj)
    };
    xmlhttp.open("GET", url);
    xmlhttp.send();
}

var allSituations;
var arrayButtonTextSolution = []

function onDataLoaded(jsonObj){
    console.log(jsonObj)
    let situation = jsonObj[0];
    textereponse = situation.title;
    document.getElementById("image").style.backgroundImage = `url('${situation.url}')`;
    document.getElementById("question-phrase").innerText = situation.title
    arrayButtonTextSolution = []
    console.log( buttons.length)
    console.log( situation.choice.length);

    for (let i=0; i < buttons.length; i++) {
        console.log(i);
        if(i < situation.choice.length){
            arrayButtonTextSolution.push(situation.choice[i].text_result)
            buttons[i].innerText = situation.choice[i].text_btn
        } else {
            buttons[i].style.display = "none";
        }
        
    }
}

function searchNextSituation(){
    
    
}