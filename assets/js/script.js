let engine = {
   "animals": ['dog', 'cat', 'wolf', 'butterfly', 'horse', 'bear'],
   'animalsImg': {
      'dog': 'assets/imgs/dog.jpg',
      'cat': 'assets/imgs/cat.jpg',
      'wolf': 'assets/imgs/wolf.jpg',
      'butterfly': 'assets/imgs/butterfly.jpg',
      'horse': 'assets/imgs/horse.jpg',
      'bear': 'assets/imgs/bear.jpg',
   },
   'coins': 0
}

const coinAudio = new Audio('assets/audio/moeda.mp3');
const errorAudio = new Audio('assets/audio/errou.mp3');

function showImgAnimal() {
   let indexImg = Math.floor(Math.random() * engine.animals.length);
   let legendAnimal = document.getElementById('animal-in-the-box');
   let animalName = engine.animals[indexImg];

   legendAnimal.innerHTML = animalName.toUpperCase();

   return engine.animalsImg[animalName];
}

function applyImgAnimal(animalName) {
   let animalBox = document.getElementById('current-color');

   animalBox.style.backgroundImage = `url('${animalName}')`;
   animalBox.style.backgroundRepeat = 'no-repeat';
   animalBox.style.backgroundSize = "100%";
   animalBox.style.objectFit = 'cover';
}

function updateScore(valor) {
   let score = document.getElementById('current-score');

   engine.coins += valor;

   if(valor < 0) {
      errorAudio.play();
   } else {
      coinAudio.play();
   }

   score.innerText = engine.coins;
}

applyImgAnimal(showImgAnimal());

let btnRecorder = document.getElementById('btn-answer');
let audioTranscription = '';
let rightAnswer = '';

let SpeechApi = '';
let recorder = '';

if(window.SpeechRecognition || window.webkitSpeechRecognition) {
   SpeechApi = window.SpeechRecognition || window.webkitSpeechRecognition;
   recorder = new SpeechApi();

   recorder.continuos = false;
   recorder.lang = 'en-US'

   recorder.onstart = function() {
      btnRecorder.innerText = 'Estou ouvindo!';

      btnRecorder.style.backgroundColor = '#FFFFFF';
      btnRecorder.style.color = '#000000';
   }

   recorder.onend = function() {
      btnRecorder.innerText = 'Responder';

      btnRecorder.style.backgroundColor = 'transparent';
      btnRecorder.style.color = '#FFFFFF';
   }

   recorder.onresult = function(event) {
      audioTranscription = event.results[0][0].transcript.toUpperCase();
      rightAnswer = document.getElementById('animal-in-the-box').innerText.toUpperCase();

      if(audioTranscription === rightAnswer) {
         updateScore(1);
      } else {
         updateScore(-1);
      }
      
      applyImgAnimal(showImgAnimal());
   }
}

btnRecorder.addEventListener('click', function(e) {
   recorder.start();
})