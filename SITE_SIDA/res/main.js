//une fonction permettant de changer quelque chose toute les 30 secondes
var questionrepondue = false;
var situation = null;

//Appel à l'API de base
let url = "https://bales.ml/nuit-info-2022/backend/get_first_situation.php?id_story";
console.log("[DEBUG] API call emitted");

const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {
  jsonObj = JSON.parse(this.responseText);
  allSituations = jsonObj;
  console.log("[DEBUG] API connection successfull");
  console.log("[INFO] Lookup for allSituations var for results");
  loadUI(0);
};
xmlhttp.open("GET", url);
xmlhttp.send();
//

const buttons = ["choix1", "choix2", "choix3", "choix4"];
for (let i = 0; i < buttons.length; i++) {
  buttons[i] = document.getElementById(buttons[i]);
  buttons[i].addEventListener("click", function (e) {
    choice(i + 1);
  });
}

//ajout element appuyer sur entrée ssi déjà choix question

document.addEventListener("keydown", (event) => {
  var code = event.key;
  if (code == "Enter" && questionrepondue) {
    passNextQuestion();
  }
});

const nextInfo = document.getElementById("nextInfo");
document.addEventListener("click", function (e) {
  if (questionrepondue) {
    passNextQuestion();
  }
});
 
//---------------------FONCTIONS-----------------------

//est appelée une fois que l'information a été affichée et que le client ait cliqué sur entrée
//permet de changer l'image de background et l'intérieur des bouttons
/*function passNextQuestion() {
  searchNextSituation(id_situation_next);
  questionrepondue = false;
  droitAuClick = true;
}*/

function loadUI(numQuestion) {
  console.log("[DEBUG] Loading details for question", numQuestion);
  
  situation = allSituations[numQuestion];

  document.getElementById("question-phrase").style ="";
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style = "";
  }
  document.getElementById("noticeAnswer").style = "";
  document.getElementById("nextInfo").style = "";

  loadSituation(situation);
  
  document.getElementById("question").style = "";
  document.getElementById("choix").style = "";
  document.getElementById("haut").style = "";
  document.getElementById("bas").style = "";

  document.getElementById("question").style.display = "flex";
  document.getElementById("choix").style.display = "flex";
  document.getElementById("haut").style.display = "flex";
  document.getElementById("bas").style.display = "flex";

  timer();
}

//est appelée lors du clique du choix
//permet d'enlever l'affichage des autres bouttons
function choice(numchoix) {
  PublicNumAnswered = numchoix;

  document.getElementById("haut").style.setProperty(
    "animation",
    "slide-out-elliptic-bottom-bck 0.7s ease-out 0.5s both");

  document.getElementById("bas").style.setProperty(
    "animation",
    "slide-out-elliptic-bottom-bck 0.7s ease-out .75s both"
  );

  var element = document.getElementById("nextInfo");
  element.style.display = "block";
  element.style.setProperty(
    "animation",
    "swing-in-bottom-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) 2.5s both, jello-horizontal 2s infinite 4s both"
  );

  var elemNoticeAnswer = document.getElementById("noticeAnswer");
  
  elemNoticeAnswer.style.display = "block";

  document.getElementById("question-phrase").display = "block";

  document.getElementById("texte-solution").innerText = arrayButtonTextSolution[numchoix];
  if (
    situation.choice[numchoix].value ==
    situation.choice[numchoix].id_situation_next
  ) {
    elemNoticeAnswer.style.backgroundColor = "red";
  } else {
    elemNoticeAnswer.style.backgroundColor = "green";
  }

  setTimeout(() => {
    questionrepondue = true;
  }, "1");
}

//la fonction cleanboard permet de tout enlever pour passer à la prochaine question
function cleanboard() {
  document.getElementById("question-phrase").style.display="none";
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
  document.getElementById("noticeAnswer").style.display = "none";
  document.getElementById("nextInfo").style.display = "none";
  
}

// TIMER

function timer() {
  const timerElement = document.getElementById("timer");
  timerElement.display = "block";
  let temps = 20;

  let stop = setInterval(diminuerTemps, 1000);
  function stoptimer(){
    clearInterval(stop);
  }
  setTimeout(() => {
    clearInterval(stop);
  }, "12000");

  function diminuerTemps() {
    timerElement.innerText = temps;
    temps--;
    if (questionrepondue) {
      stoptimer();
    }
  }
}

/*var allSituations;
console.log(allSituations);
var arrayButtonTextSolution = [];

function onDataLoaded(jsonObj) {
  console.log(jsonObj);
  let situation = jsonObj[0];
}*/

function loadSituation(situation) {
  //background
  if (situation.url.length > 0) {
    document.getElementById(
      "image"
    ).style.backgroundImage = `url('${situation.url}')`;
  }
  //question
  document.getElementById("question-phrase").innerText = situation.title;
  arrayButtonTextSolution = [];
  //bouton
  for (let i = 0; i < buttons.length; i++) {
    if (i < situation.choice.length) {
      arrayButtonTextSolution.push(situation.choice[i].text_result);
      buttons[i].innerText = situation.choice[i].text_btn;
    } else {
      buttons[i].style.display = "none";
    }
  }
}

/*function searchNextSituation(id) {
  if (id != -1) { //fini
    for (situation in allSituations) {
      if (situation.id_situation_next == id) {
        loadSituation(situation);
      }
    }
  } else {
    window.alert("C'est fini, bro");
  }
}*/

function passNextQuestion(idQuestion) {
  cleanboard();
  questionrepondue = false;
  loadUI(situation.choice[PublicNumAnswered].id_situation_next);
}
