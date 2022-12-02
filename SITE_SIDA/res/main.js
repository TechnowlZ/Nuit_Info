//une fonction permettant de changer quelque chose toute les 30 secondes
var questionrepondue = false;
var droitAuClick = true;
timer();
var elemNoticeAnswer = document.getElementById("noticeAnswer");

const buttons = ["choix1", "choix2", "choix3", "choix4"];
for (let i = 0; i < buttons.length; i++) {
  buttons[i] = document.getElementById(buttons[i]);
  buttons[i].addEventListener("click", function (e) {
    choice(i + 1);
  });
}

//ajout element appuyer sur entrée ssi déjà choix question

document.addEventListener("keydown", (event) => {
  var code = event.code;
  if (code == "Enter") {
    passNextQuestion();
  }
});

const nextInfo = document.getElementById("nextInfo");
document.addEventListener("click", function (e) {
  passNextQuestion();
});

//---------------------FONCTIONS-----------------------

//est appelée une fois que l'information a été affichée et que le client ait cliqué sur entrée
//permet de changer l'image de background et l'intérieur des bouttons
/*function passNextQuestion() {
  searchNextSituation(id_situation_next);
  questionrepondue = false;
  droitAuClick = true;
}*/

//est appelée lors du clique du choix
//permet d'enlever l'affichage des autres bouttons
<<<<<<< HEAD
function choice(numchoix) {
  if (droitAuClick) {
    for (let i = 0; i < buttons.length; i++) {
      if (numchoix != i + 1) {
        buttons[i].style.display = "none";
      }
    }
    droitAuClick = false;
  }
  elemNoticeAnswer.style.display = "block";
=======
function choice(a){

    if (droitAuClick){
        for (let index = 0; index < document.getElementsByClassName("haut").length; index++) {
            const element = document.getElementsByClassName("haut")[index];
            element.style.setProperty("animation", "slide-out-elliptic-bottom-bck 0.7s ease-out 0.5s both");
        }
        for (let index = 0; index < document.getElementsByClassName("bas").length; index++) {
            const element = document.getElementsByClassName("bas")[index];
            element.style.setProperty("animation", "slide-out-elliptic-bottom-bck 0.7s ease-out .75s both");
        }
        
        droitAuClick=false;

    }
    document.getElementById("nextInfo").style.display ="block";
    document.getElementById("nextInfo").style.setProperty("animation", "swing-in-bottom-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) 2.5s both, jello-horizontal 2s infinite 4s both");
    
    elemNoticeAnswer.style.display="block";
>>>>>>> 5bbbb9287a6caadad2991e695aa473130da42fd8

  document.getElementById("question-phrase").display = "block";

  document.getElementById("texte-solution").innerText =
    arrayButtonTextSolution[numchoix];
  if (situation.choice[numchoix].value == situation.choice[numchoix].id_situation_next) {
    document.getElementById("noticeAnswer").style.backgroundColor = "red";
  } else {
    document.getElementById("noticeAnswer").style.backgroundColor = "green";
  }

  questionrepondue = true;
}

//la fonction cleanboard permet de tout enlever pour passer à la prochaine question
function cleanboard() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
  elemNoticeAnswer.style.display = "none";
}

// TIMER

function timer() {
  const timerElement = document.getElementById("timer");
  timerElement.display = "block";
  let temps = 10;
  
  let stop = setInterval(diminuerTemps, 1000);
  setTimeout(() => {
    timerElement.style.display="none";
    clearInterval(stop);

  }, "12000")

  function diminuerTemps() {
    timerElement.innerText = temps;
    temps--;
  }
}

var allSituations = null;
getAllSituations(2);

//Appel à l'API de base
function getAllSituations(idStory) {
  let url =
    "https://publicedge.ml/night-info/get_first_situation.php?id_story=" +
    idStory;
  console.log(url);

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {
    jsonObj = JSON.parse(this.responseText);
    allSituations = jsonObj;
    loadSituation(jsonObj[0]);
  };
  xmlhttp.open("GET", url);
  xmlhttp.send();
}

var allSituations;
var arrayButtonTextSolution = [];

function onDataLoaded(jsonObj) {
  console.log(jsonObj);
  let situation = jsonObj[0];
}

function loadSituation(situation) {
  textereponse = situation.title;
  if (situation.url.length > 0) {
    document.getElementById(
      "image"
    ).style.backgroundImage = `url('${situation.url}')`;
  }
  document.getElementById("question-phrase").innerText = situation.title;
  arrayButtonTextSolution = [];
  for (let i = 0; i < buttons.length; i++) {
    if (i < situation.choice.length) {
      arrayButtonTextSolution.push(situation.choice[i].text_result);
      buttons[i].innerText = situation.choice[i].text_btn;
    } else {
      buttons[i].style.display = "none";
    }
  }
}

function searchNextSituation(id) {
  if (id != -1) {
    for (situation in allSituations) {
      if (situation.id_situation_next == id) {
        loadSituation(situation);
      }
    }
  } else {
    window.alert("C'est fini, bro");
  }
}
