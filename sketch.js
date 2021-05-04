//Create variables here
var dog,saddog,happydog;
var foodObj;
var foodS, foodStock;
var fedTime,lastFed,feed,addFood;
var gameState;

function preload()
{
	//load images here
  saddog = loadImage("dog1.png");
  happydog = loadImage("dog2.png");
  garden=loadImage("Garden.png");
washroom=loadImage("WashRoom.png");
bedroom=loadImage("BedRoom.png");
livingroom = loadImage("Living Room.png");

}

function setup() {
	createCanvas(1000, 1000);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(saddog);
  dog.scale = 0.15;

  food = createButton("Feed the dog");
  food.position(700,95);
  food.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
 

  
  background("yellow");

  foodObj.display();
  

  if(foodS == 0){

    dog.addImage(happydog);
    this.image.visible = false;
  }
  else{
    dog.addImage(saddog);
    this.image.visible = true;
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >=12){
    text ("Last Feed: "+lastFed%12+"PM",350,90);
   }
   else{
     text("Last Feed : "+lastFed+"AM",350,30);
   }

   if(gameState === 1){

    dog.addImage(happyDog);
    dog.scale = 0.175;
    dog.y = 250;
   }

   if(gameState === 2){
     dog.addImage(sadDog);
     dog.scale = 0.175;
     this.image.visible = false;
     dog.y =250;
   }

   var Bath = createButton("I want to take bath");
   Bath.position(580,125);
   if(Bath.mousePressed(function(){
     gameState =3;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===3){
     dog.addImage(washroom);
     dog.scale = 1;
     this.image.visible = false;

   }
   var Sleep = createButton("I am very sleepy");
   Sleep.position(710,125);
   if(Sleep.mousePressed(function(){
     gameState =4;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===4){
     dog.addImage(bedroom);
     dog.scale = 1;
     this.image.visible = false;

   }
   var Play = createButton("Let's Play");
   Play.position(500,160);
   if(Play.mousePressed(function(){
     gameState =5;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===5){
     dog.addImage(livingroom);
     dog.scale = 1;
     this.image.visible = false;

   }
 
   var PlayInGarden = createButton("Let's play in the park");
   PlayInGarden.position(585,160);
   if(PlayInGarden.mousePressed(function(){
     gameState =6;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===6){
     dog.addImage(garden);
     dog.scale = 1;
     this.image.visible = false;

   }
 
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    food : x
  })
}

function feedDog() {
  dog.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: gameState
  })
}
