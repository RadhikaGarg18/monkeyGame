var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var topEgde;

function preload(){
  //loads animation of the monkey
  monkey_running =                  loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  //loads image for the bananas and ostacles
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  //creates a canvas
  createCanvas(550,500);
  
  //creates a sprite for the top edge
  topEdge = createSprite(2,2,800,2);
  
  //creates the survival time
  var survivalTime=0;
  
  //creates a sprite of the monkey
  //adds the animation for the monkey
  //decreses the size of the monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  //creates the sprite of the ground
  //gives velocity to the ground
  ground = createSprite(400,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  //creates the groups for the obstacles and the fruits
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
  //sets the background green
  background("green");

  //if the ground goes out of the screen it will increase by half of its     length
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  //monkey jumps when space is pressed
  if(keyDown("space") ) {
    monkey.velocityY = -12;
  }

  //gives gravity to the monkey
  //collides the monkey with the ground
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  //conditions for the monkey if it touches the obstacle
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.pause();
  }

  //prints the text survival
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 200,50);
  drawSprites();

  //makes the monkey bounce the top edge
  monkey.bounceOff(topEdge)

}

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    //creates a banana sprite
    banana = createSprite(600,250,40,10);
    
    //makes the banana come randomly in different places
    banana.y = random(120,200);    
    
    //gives velocity to the banana
    banana.velocityX = -5;
    
    //gives lifetime to the banana
    banana.lifetime = 100;
    
    //adds the image to the banana
    banana.addImage(bananaImage);
    
    //decreases the size of the monkey
    banana.scale=0.05;

    //adds the banana in the food group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    //creates the obstacle sprite
    obstacle = createSprite(800,320,10,40);
    
    //gives velocity to the obstacle
    obstacle.velocityX = -6;
    
    //adds the image for the obstacle
    obstacle.addImage(obstaceImage);
    
    //decreases the size of the obstacle
    obstacle.scale=0.15;
    
    //gives lifetime to the obstale
    obstacle.lifetime = 300;
    
    //adds the obstacle to the obstacle group
    obstaclesGroup.add(obstacle);
  }
}
