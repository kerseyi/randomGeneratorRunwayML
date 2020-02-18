let vector = [];
let randomVector;
let database;
let data;
let trunk = 0.7;
let randomArray= [];
function setup() {
  //createCanvas(400, 400);
  noCanvas();
  let generateButton = select('#gen');
  //let saveButton = select('#saveAll');
  //saveButton.mousePressed(saveLocally);
  
  generateButton.mousePressed(generateVector);

  let firebaseConfig = {
    apiKey: "AIzaSyDpekFiMuZ14oyqmjMIqZ1mBuHPSXUrJao",
    authDomain: "dinogan-5d235.firebaseapp.com",
    databaseURL: "https://dinogan-5d235.firebaseio.com",
    projectId: "dinogan-5d235",
    storageBucket: "dinogan-5d235.appspot.com",
    messagingSenderId: "446090199932",
    appId: "1:446090199932:web:4aba81e213db9820845af9",
    measurementId: "G-R7RDZLNGYE"
  };
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
}

function draw() {
  background(220);
  let vectorDisplay = select('#trunk');
  vectorDisplay.html(trunk);
}

function generateVector() {
	vector = [];
for (let i = 0; i < 256; i++) {
    randomVector = random(0.1,0.00000000000000000000001);
    append(vector, randomVector);
  }
  for (let i = 0; i < 256; i++) {
    randomVector = random(-0.1,0.00000000000000000000001);
    append(vector, randomVector);
  }
  randomArray = shuffle(vector);
  trunk = random(0.1,0.9);
  console.log(randomArray.length);

  
const inputs = {
  	"z": randomArray,
  	"truncation": trunk
	};
	console.log(inputs);

	fetch('http://localhost:8001/query', {
  method: 'POST',
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(inputs)
})
  .then(response => response.json())
  .then(outputs => {
    const { image } = outputs;
    console.log(outputs);
    saveDrawing(outputs);
   
    let dinoDisplay = select('#dinoPic');
    let dinoImage =  createImg(outputs.image);
    //let dinoLi = createElement('li', dinoImage);
  	//dinoimage.src = outputs.image;
    //image.alt = dinoDate;
    //dinoDisplay.appendChild(dinoLi);
  })
}


function saveDrawing(outputs){
  let submitTime = month() + "/" + day() +" " + hour() + ":"+ minute();
  let dataURL = outputs.image;
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  let ref= database.ref('drawings');
  let data = {
    drawing: dataURL,
    time: submitTime
  }
  let result = ref.push(data, dataSent);
  console.log(result.key);
  function dataSent(err, status) {
    console.log(status);
  }
}

/*function saveLocally() {
  var allImages = document.getElementsByTagName('img');

  for(var i = 0; i < allImages.length ; i++) {
  // to open all photos in new tabs:
  // window.open(allImages[i].src, '_blank');
    
  }
  save(allImages);
}*/