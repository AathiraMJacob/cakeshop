const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var bgImg,background;
var chef;
var burger;
var ground;
var gameState="wait";
var person2;

function preload(){
  bgImg=loadImage("images/background.png");
  chefStanding= loadImage("images/chef.png")
  chefKicking= loadImage("images/chef 2.png")
  person11=loadImage("images/person1.png")
  person21=loadImage("images/person2.png")
  person31=loadImage("images/person3.png")
  person41=loadImage("images/person4.png")
  crying =loadImage("sad.jpg")
  smiling =loadImage("happy.jpg")
  cake=loadImage("images/cake.png")
  cakeShop=loadImage("images/cakeshop.jpg")

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  //console.log(windowWidth);
  //console.log(windowHeight);
  engine = Engine.create();
  world = engine.world;
  ground=Bodies.rectangle(0,height-10,width*50,10,{isStatic:true});
  World.add(world,ground)
  burger=new Burger(800,200,25);


  person1=new Person(2000,500,100,100);
 
  person2=new Person(4000,400,100,100);
 //image("person21",4000,400)
  person3=new Person(6000,400,100,100);
//  image("person31",6000,400)
  person4=new Person(8000,400,100,100);
 // image("person41",8000,400)
  person5=new Person(10000,400,100,100);
  

	Engine.run(engine);
   
}

function draw() {
  drawSprites();
 
  Engine.update(engine);

  fill("black");
  //rectMode(CENTER)
  rect(ground.position.x,ground.position.y,width*50,10);

  if(gameState==="wait"){
    image(cakeShop,1000,1000);

    var button =createSprite(displayWidth/2,displayHeight/2,100,100);
    text("Click here to Play",590,400)
    fill("black")
    text("Joan has just started cake shop.One of her prime patrons has ",500,250);
    text(" ordered a chocolate cake to be home delivered.",500,265)
    text("Unfortunately,the deliverboys Johan and Adam are busy delivering ",500,280);
    text("on the other side of the city.She cannot go herself as there are",500,295);
    text(" a large number of customers in the shop.Will you help her?",500,310);

    if (mousePressedOver(button)){
    gameState = "start";
    }
  }
  
  if(gameState==="start"){
    chef = createSprite(200,250,200,200);
    chef.addImage(chefStanding);
    startGame();
    image(person11,person1.body.position.x-130,person1.body.position.y-100,200,300);
    image(person21,person2.body.position.x-250,person2.body.position.y-300,);
    image(person31,person3.body.position.x-120,person3.body.position.y-100,200,200);
    image(person41,person4.body.position.x-170,person4.body.position.y-100,300,300);
    image(cake,burger.body.position.x-70,burger.body.position.y-100,200,200);
    //image(person21,person2.position.x,person2.position.y)
  }
  if(gameState==="end"||gameState==="end1"){
    endGame();
  }
 

}

function startGame(){
  image(bgImg,-displayWidth,0,displayWidth*10,displayHeight+100);
 //image(chefStanding,200,250) ;
  Engine.update(engine)
 
  if (keyDown("space")){
   //chef.addImage(chefKicking);
    Matter.Body.setVelocity(burger.body,{x:10,y:15})
    Matter.Body.setStatic(burger.body,false);
   
  }
if (isTouching(burger,person5)){
  console.log("collided")
  Matter.Body.setStatic(burger.body,true)
  gameState="end";
}
if (isTouching(burger,person1)||isTouching(burger,person2)||isTouching(burger,person3)||isTouching(burger,person4)){
  Matter.Body.setStatic(burger.body,true);
  gameState="end1";
}
  isTouching(burger,person1);
  isTouching(burger,person2);
 
  isTouching(burger,person4);
  isTouching(burger,person5);

  burger.display();
  person1.display();
  person2.display();
  person3.display();
  person4.display();
  person5.display();
  camera.x=burger.body.position.x;
  camera.y= 400;

 // drawSprites();

}


function isTouching(object1,object2){
object1pos=object1.body.position;
object2pos=object2.body.position;
var distance=dist(object1pos.x,object1pos.y,object2pos.x,object2pos.y);
console.log(distance);
if (distance<=150){
 return true;
}else{
  return false;
}
}

function endGame(){
background("green")
  console.log("end");
  image(crying,camera.x-800,50,windowWidth,windowHeight);
  /*if (gameState===end1){
    image(crying,1000,400,100,100);
  }else if(gameState===end){
    image(smiling,1000,400,100,100);
  }*/

}

