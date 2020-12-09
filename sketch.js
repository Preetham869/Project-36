 var dog, happydogImg, database, foodS;
 var dogImg,foodStock,fedTime, lastFed;
 var foodObj;

 function preload()

 {

 dogImg = loadImage("images/Dog.png")  
 happydogImg = loadImage("images/happydog.png")

 }

 function setup() {
   
 database = firebase.database();

 createCanvas(1200, 500);

 foodObj = new Food();

 foodStock = database.ref('Food');
 foodStock.on("value" , readStock);
  
 dog = createSprite(700,250,20,20)
 dog.addImage(dogImg);
 dog.scale = 0.2;

 feed = createButton("Feed the dog");
 feed.position(700,140);
 feed.mousePressed(feedDog);

 addFood = createButton("Add Food");
 addFood.position(800,140);
 addFood.mousePressed(addFoods);

 }

 function draw() {  

 background(46,139,87);

 foodObj.display();

 fedTime = database.ref('FeedTime');
 fedTime.on("value", function(data){

 lastFed = data.val();

 });

 fill(255,255,254),
 textSize(15);
 
 if(lastFed >= 12){

  text("Last Feed  : " + lastFed % 12 + " PM" , 400 , 50);

 } else if(lastFed == 0){

    text("Last Feed : 12 AM" , 350 , 30);

 } else {

    text("Last Feed : " + lastFed + " AM", 400, 50);

 }

 

 drawSprites();

 }

 function readStock(data){

 foodS = data.val();
 foodObj.updateFoodStock(foodS);
 }

 function writeStock(x){

 if(x <= 0){

  x = 0;

 } else {

  x = x - 1;

 }

 database.ref('/').update({
  
 Food: x

 })

 }

 function feedDog(){

 dog.addImage(happydogImg);

 foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
 database.ref('/').update({

 Food: foodObj.getFoodStock(),
 FeedTime: hour()

 })

 }

 function addFoods(){

 foodS++;
 database.ref('/').update({

 Food: foodS

 })

 }