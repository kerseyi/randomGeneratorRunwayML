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


/*function saveLocally() {
  var allImages = document.getElementsByTagName('img');

  for(var i = 0; i < allImages.length ; i++) {
  // to open all photos in new tabs:
  // window.open(allImages[i].src, '_blank');
    
  }
  save(allImages);
}*/