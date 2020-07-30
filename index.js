let gameStart = false
let onlyOnceFlag = false
let otherOnlyOnce = false
let newFlag = false
let decText = false
let twentyNinteenText = false
let rbmPlaying = false
let start = false
let gameState = false
let clockScore = 6
let startTime = false;
let am = true
let isTwentyTwenty = false;
let cnv

let enemies = []
let hero

function preload(){

  song = loadSound('./assets/rbm.mp3');
  happyImg = loadImage('assets/img/happy.png');


}

function setup() {

  songMK = loadSound('./assets/mk.mp3');
  sadImg = loadImage('assets/img/concern.png');

  cnv = createCanvas(window.innerWidth, window.innerHeight);

  setInterval(() => {
    if (startTime == true){
      clockScore += 1
    }
  }, 5210)

   for (let x = 0; x < 500; x+=100){
     enemies.push(new Bubble({x: x, y:30}, 30, sadImg))

   }

   hero = new Hero({x: window.innerWidth/2, y:window.innerHeight-200}, 30, happyImg)

}



function draw() {


  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont("Futura");

  textSize(window.innerWidth * .1);
  text('Tap to begin', window.innerWidth/2, window.innerHeight/2);

  cnv.mousePressed(canvasPressed);

  if (rbmPlaying) {
    background(0)
    gameStart = true
  }


  if (gameStart == true) {
/*
    if (decText == false) {
      setTimeout(() => {
        decText = true;
      }, 5000)
    }

    if (decText == true) {
      background(0);
      textSize(window.innerWidth * .25);
      text("Dec. 31", window.innerWidth/2, window.innerHeight/2);
    }

    if (twentyNinteenText == false) {
      setTimeout(() => {
        twentyNinteenText = true;
      }, 7100)
    }

    if (twentyNinteenText == true) {
      background(0);
      textSize(window.innerWidth * .36);
      text("2019", window.innerWidth/2, window.innerHeight/2);
    }

    if (start == false) {
      setTimeout(() => {
        start = true;
      }, 9500)
    }

    if (start == true) {
      background(0);
      textSize(window.innerWidth * .2);
      text("COLLECT", window.innerWidth/2, window.innerHeight/2);
    }

    if (gameState == false) {
      setTimeout(() => {
        gameState = true;
      }, 14800)
    }
*/
  //  if (gameState == true) {
      gameStateF()
   //}

  }
}

function gameStateF() {

    let bgColor = [0,0,0]
    let delay = 2444

    startTime = true

    background(...bgColor);

    textSize(55);

    if (clockScore == 12) {
      am = false
      if (!otherOnlyOnce){
        otherOnlyOnce = true
        mountainKing()
      }

    }

    if (am) {
      text(clockScore+":00 A.M.", (window.innerWidth/2), 50);
    }

    if (!am  && clockScore < 9 || clockScore == 12) {
      text(clockScore+":00 P.M.", (window.innerWidth/2), 50);
    }

    if (!am && clockScore > 8 && clockScore != 12) {
      text(clockScore+":00 P.M.", (window.innerWidth/2) + Math.floor(Math.random()*2), 50);
    }

    textSize(45);


    text("2019", (window.innerWidth/2), 123);
    textSize(30)
    text("Score: "+hero.health, (window.innerWidth/2), 185)


    if (clockScore > 12 && onlyOnceFlag == false) {
      clockScore = 1
      newFlag = true
      onlyOnceFlag = true
    }

    if (clockScore >= 12 && newFlag) {
      background(0)
      textSize(window.innerWidth * .33);
      text("2020", window.innerWidth/2 + Math.floor(Math.random()*30), window.innerHeight/2  + Math.floor(Math.random()*30));
      background(0)
      text("2020", window.innerWidth/2 + Math.floor(Math.random()*30), window.innerHeight/2  + Math.floor(Math.random()*30));
      background(0)
      text("2020", window.innerWidth/2 + Math.floor(Math.random()*30), window.innerHeight/2  + Math.floor(Math.random()*30));
    }


    enemies.forEach(enemy => {
      enemy.update({x:enemy.getX()+1, y:enemy.getY()+1})
      enemy.render()
      if(hero.intersectingWithCircle(enemy)){
        hero.addHealth(1)
      }
    })




    hero.enableControl()
    hero.render()




}

function canvasPressed() {
  if (rbmPlaying == false) {
    song.play();
    rbmPlaying = true;

  }
}

function mountainKing() {
  songMK.play();
}

class Bubble {

  constructor(cords, r, imgSkin = null){
    this.x = cords.x
    this.y = cords.y
    this.r = r
    this.imageSkin = imgSkin
  }

  getCords() {
    return {
      x: this.x,
      y: this.y
    }
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  getRadius() {
    return this.r
  }

  update(cords) {
    this.x = cords.x
    this.y = cords.y
  }

  render() {

    ellipse(this.x, this.y, this.r*2, this.r*2)

    if (this.imageSkin) {
      imageMode(CENTER)
      image(this.imageSkin, this.getX(), this.getY());
    }

  }

  intersectingWithCircle(Circle) {
    if (dist(this.x, this.y, Circle.getX(), Circle.getY()) > (this.r + Circle.getRadius()) ) {
      return false
    }
    return true
  }

}

class Hero extends Bubble {

  constructor(cords, r, imgSkin = null){
    super(cords, r, imgSkin)
    this.health = 0
    this.history = []
    this.count = 0
  }

  update(cords) {
    if (cords.x < 0){
      cords.x = 0
    }

    if (cords.x > window.innerWidth) {
      cords.x = window.innerWidth
    }

    if (cords.y < 0) {
      cords.y = 0
    }

    if (cords.y > window.innerHeight){
      cords.y = window.innerHeight
    }

    this.x = cords.x
    this.y = cords.y

    this.count += 1

    if (this.count % 4 == 0){
      this.history.push({x: this.x, y: this.y, opacity:1})
    }

    if(this.history.length > 7){
      this.history.shift()
    }


  }

  addHealth(health) {
    this.health += health;
  }

  doDamage(dmg) {
    this.health -= dmg;
  }

  enableControl() {

    if (keyIsDown(LEFT_ARROW)) {
      this.update({x:this.getCords().x - 6.9, y:this.getCords().y})
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.update({x:this.getCords().x + 6.9, y:this.getCords().y})
    }

    if (keyIsDown(UP_ARROW)) {
      this.update({x:this.getCords().x, y:this.getCords().y - 6.9})
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.update({x:this.getCords().x, y:this.getCords().y + 6.9})
    }

  }

  render() {

    ellipse(this.x, this.y, this.r*2, this.r*2)

    if (this.imageSkin) {
      imageMode(CENTER)

      this.history.forEach( (point, index) => {

        if (this.history[index].opacity > 0){
          this.history[index].opacity -= .05;
        }

        drawingContext.globalAlpha = (this.history[index].opacity > 0) ? this.history[index].opacity : 0;
        image(this.imageSkin, point.x, point.y);
        drawingContext.globalAlpha = 1
      })

      image(this.imageSkin, this.getX(), this.getY());


    }

  }

}
