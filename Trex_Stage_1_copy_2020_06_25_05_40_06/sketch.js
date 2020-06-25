var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage, cloudGroup;
var cactus1,  cactus2, cactus3, cactus4, cactus5, cactus6, cactusGroup;

var gameState="play";
var gameOver,restart,gameoverImage,restartImage
var score=0;



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  
  cloudImage = loadImage("cloud.png");
  
  gameoverImage = loadImage("gameOver.png");
  
  restartImage = loadImage("restart.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  cloudGroup= new Group();
  
  cactusGroup= new Group();
  
  gameOver= createSprite(180,200,10,10);
  gameOver.visible=false;
  
  restart= createSprite(180,230,10,10);
  restart.visible=false;
  
}

function draw() {
  background(255);
  
  
  gameOver.addImage(gameoverImage);
  gameOver.scale=0.5;
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  text("Score ="+score,320,20);
  
  if(cactusGroup.isTouching(trex)) {
     gameState="over";
     
     }
  
 if (gameState==="play"){
   
   ground.velocityX=-6;
   
   
   if(keyDown("space") && trex.y>360) {
    trex.velocityY = -14;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
   
   spawnCloud();
  spawnObstacle();
   
   
   score=score+Math.round(getFrameRate()/60);
   
   
 }
  
  trex.collide(invisibleGround);
  
  
  if (gameState==="over"){
    
    ground.velocityX=0;
    cloudGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    cloudGroup.destroyEach();
    cactusGroup.destroyEach();
    gameOver.visible=true;
    restart.visible=true;
    
  }
  
  if (mousePressedOver(restart)){
      
      gameState="play";
    gameOver.visible=false;
    restart.visible=false;
    score=0;
      
      }
  
  
  
  drawSprites();
  
  
}

function spawnCloud() {
  if (frameCount%60===0){
  var cloud = createSprite(400,random(50,250),10,10);
  cloud.velocityX=-5;
cloud.lifetime=200;
    cloud.addImage(cloudImage);
     cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudGroup.add(cloud);
  
  }
}

 function spawnObstacle() {
   
   if (frameCount%60===0){
    var cactus = createSprite(400,360,10,10);
     cactus.velocityX=-6;
     var rand = Math.round( random(1,6));
     switch(rand) {
         
      case 1:cactus.addImage(cactus1);
         break;  
      case 2:cactus.addImage(cactus2);
         break;
      case 3:cactus.addImage(cactus3);
         break;
      case 4:cactus.addImage(cactus4);
         break;
      case 5:cactus.addImage(cactus5);
         break;
      case 6:cactus.addImage(cactus6);
         break;
         
     }
     
     cactus.scale=0.6;
     cactus.lifetime=200;
     
     cactusGroup.add(cactus);
   }
   
   
   
   
 }

