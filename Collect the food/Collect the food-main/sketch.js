var backgroundImg, truckImgLeft, truckImgRight, orangeJuiceImg, iceCreamImg, burgerImg, gameOverImg;
var truck, foodGroup, Bgm, gameOver;
var foodItem, shop;
var PLAY = 1;
var END = 0;
var gameState = 1;
var cloud1Img, shrub1Img, shrub2Img, treeImg, cloud2Img, cloud3Img, cloud4Img; 
var cloud1, cloud2, cloud3, cloud4, shrub1, shrub2, tree, tree2;
var sunImg, sun, shopImg;
var screen = 0;

function preload(){
  backgroundImg = loadImage("Background.png");
  truckImgLeft = loadImage("truckLeft.png");
  truckImgRight = loadImage("truckRight.png");
  orangeJuiceImg = loadImage("Orange juice.png");
  iceCreamImg = loadImage("Icecream.png");
  burgerImg = loadImage("Burger.png");
  Bgm = loadSound("Bgm-funny.mp3");
  gameOverImg = loadImage("gameOver.png");
  cloud1Img = loadAnimation("cloud1.gif");
  cloud2Img = loadAnimation("cloud2.gif");  
  cloud3Img = loadAnimation("cloud3.gif");
  cloud4Img = loadAnimation("cloud4.gif");
  sunImg = loadAnimation("sun.gif");
  shrub1Img = loadImage("shrub1.png");
  shrub2Img = loadImage("shrub2.png");
  treeImg = loadAnimation("tree.gif");
  shopImg = loadImage("smallshop.png");
}
function setup() {
  createCanvas(1200, 700);

  let resetButton = createButton("Restart", 100);
  resetButton.position(1244, 77);
  resetButton.size(105, 40);
  resetButton.style('font-size', '25px');
  resetButton.mousePressed(resetGame);

  cloud1 = createSprite(200, 100);
  cloud1.addAnimation("cloud1",cloud1Img);
  cloud1.scale = 0.5;

  cloud2 = createSprite(510, 150);
  cloud2.addAnimation("cloud2",cloud2Img);
  cloud2.scale = 0.5;

  sun = createSprite(900, 100);
  sun.addAnimation("sun",sunImg);
  sun.scale = 0.45;

  cloud3 = createSprite(750, 120);
  cloud3.addAnimation("cloud3",cloud3Img);
  cloud3.scale = 0.5;

  cloud4 = createSprite(980, 140);
  cloud4.addAnimation("cloud4",cloud4Img);
  cloud4.scale = 0.5;

  tree = createSprite(230, 280);
  tree.addAnimation("tree", treeImg);
  tree.scale = 1.2;

  shrub2 = createSprite(160, 520);
  shrub2.addAnimation("shrub2",shrub2Img);
  shrub2.scale = 0.5;

  shrub1 = createSprite(400, 520);
  shrub1.addAnimation("shrub1",shrub1Img);
  shrub1.scale = 0.5;

  shop = createSprite(900, 400);
  shop.addAnimation("smallShop",shopImg);
  shop.scale = 1;

  truck = createSprite(600,580);
  truck.addImage(truckImgLeft);
  truck.scale = 0.7;
  
  invisibleGround = createSprite(600, 700, 1200, 10)
  invisibleGround.shapeColor = "red";
  invisibleGround.visible = false;

  truck.setCollider("rectangle",0,0,200,100);
  score = 0;
  foodGroup = new Group();

  //Bgm.loop();

}
//gamescreen

function draw() {
background(backgroundImg)


if (gameState===PLAY || (screen = 0)){
  food();
  truck.visible = true;
  Bgm.setVolume(1);
  //truck.x = mouseX;
  if (keyDown("LEFT_ARROW")){
    truck.x -= 12;
    truck.addImage(truckImgLeft);
  }
  if (keyDown("RIGHT_ARROW")){
    truck.x += 12;
    truck.addImage(truckImgRight);
  }
  if (foodGroup.isTouching(truck)){
    foodGroup.destroyEach();
    score += 2;
  }
   if (foodGroup.isTouching(invisibleGround)){
    gameState = END;
   }
}
if (gameState===END){
   foodGroup.destroyEach();
   gameOver = createSprite(600,350);
   gameOver.addAnimation("gameOver",gameOverImg)
   gameOver.scale = 0.7;
}
if (screen = 2){
  
}
  drawSprites();
  textSize(40);
  fill("black")
  text("Score: "+ score, 15,40);
}

function food() {
  if (World.frameCount % 80===0) {
  foodItem = createSprite(400,200,20,20);
  foodItem.y = 0;
  
  foodItem.velocityY = (7+(score/4));
  foodItem.scale = 0.3;

  foodItem.debug = true;
  r = Math.round(random(1,3));
 if (r == 1){
   foodItem.addImage(iceCreamImg);
   foodItem.scale = 0.5
 }else if(r == 2){
   foodItem.addImage(orangeJuiceImg);
 }else if(r == 3){
   foodItem.addImage(burgerImg);
 }
 
 foodItem.x = Math.round(random(50, 1200))
 foodItem.setLifetime = 700;
 foodGroup.add(foodItem);
}
}
function resetGame(){
location.reload();
}


