//meme defence is cool
var roadsBuilt = 1;
var pepeTowerDesired = false;
var waveMuscle = 0; // variable for deciding the max muscle per wave
var numMuscle = 0; // how many muscles have spawned in a wave
var muscles = []; //slang for all enemies
var spawnrate = 60; // once every second new guy 60fps
var waveOn = false;
var tearBullets = [];
var tiles = [];
var nodes = [];
var roadAmount = 7;
var nearestEnemy;
var boolinitializeTiles = true;
var enemies = []
var wave = 1;
var noSpammerino = 0;
//standard public hud

var lives = 20;
var gold = 3000;
// towers
var towers = [];
var shops = [];
var bullets = [];

var gamemode = 1 //0 for startpage 1 for gameplay 2 for gameover // 3 for pause

function setup() {
    //18 x 12
    createCanvas(1080, 720);
    muscleImg = loadImage("assets/Enemy.jpg");
    pepe = loadImage("assets/pepe.png");
    tear = loadImage("assets/tear.png");
    scarce = loadImage("assets/fat_scarce.jpg");
    water = loadImage("assets/water.jpg");
    stars = loadImage("assets/stars.jpg");
    buypepe = loadImage("assets/buypepe.jpg");
    weabland = loadImage("assets/weabland.jpg");
    doge = loadImage("assets/doge.jpg")
    BuyDoge = loadImage("assets/buyDoge.png")
}

function initializeTiles() {
    //creating all the scarce tiles
    for (var tillageX = 0; tillageX <= 17; tillageX++) {
        for (var tillageY = 0; tillageY <= 11; tillageY++) {
            tiles.push(new Tile(tillageX * 60, tillageY * 60))
        }

    }
    tiles[0] = new Road(0, 0);
    nodes.push(tiles[0]);
    

    // shop tiles
    tiles[204] = new BuyPepe(tiles[204].x, tiles[204].y);
    tiles[205] = new BuyPepe(tiles[205].x, tiles[205].y);
    tiles[206] = new BuyPepe(tiles[206].x, tiles[206].y);

    tiles[207] = new BuyPepe(tiles[207].x, tiles[207].y);
    tiles[208] = new BuyPepe(tiles[208].x, tiles[208].y);
    tiles[209] = new BuyPepe(tiles[209].x, tiles[209].y);

    tiles[210] = new BuyPepe(tiles[210].x, tiles[210].y);
    tiles[211] = new BuyPepe(tiles[211].x, tiles[211].y);
    tiles[212] = new BuyPepe(tiles[212].x, tiles[212].y);

    tiles[213] = new BuyPepe(tiles[213].x, tiles[213].y);
    tiles[214] = new BuyPepe(tiles[214].x, tiles[214].y);
    tiles[215] = new BuyPepe(tiles[215].x, tiles[215].y);

    //needed for the muscles
    //    muscles.push(new GameObject( -500, -500));

}

function draw() {
    if (gamemode == 0) {
        startScreen();

    } else if (gamemode == 1) {
        background(200); //todo replace with scarce
        //show and functions for the tiles including roads and whatnot


        isWaveFinished();
        
        if(roadAmount == roadsBuilt) {
            nodes[roadAmount-1].image = weabland;
        }
        
        if(noSpammerino < 20) [
            noSpammerino++
        ]
        
        if (boolinitializeTiles) {
            initializeTiles();
            boolinitializeTiles = false;
        }
        //spawning muscle
        if (frameCount % spawnrate == 0 && numMuscle < waveMuscle) {
            muscles.push(new NormieMuscle(0, 0));
            numMuscle++;

        }
        
        objectFunctions();
        drawHud();

    }

    
}

function drawHud() {
    textSize(30);
    fill("yellow");
    text("G: " + gold, mouseX, mouseY);
    fill(230, 150, 120);
    text("Lives: " + lives, mouseX, mouseY - 40);

    if (pepeTowerDesired) {
        image(pepe, mouseX, mouseY, 60, 60);
    }
}

function bringInstructions() {
    textSize(30);
    fill("yellow");
    text("G: " + gold, mouseX, mouseY);
    fill(230, 150, 120);
    text("Lives: " + lives, mouseX, mouseY - 40);
}

//instructions, towers etc
//
function keyPressed() {
    if (keyCode == 27) {
        //esc
    }

    if (waveOn == false && keyCode == 13 && roadsBuilt == roadAmount) {
        //decide spawn numbers
        decideWave();
    }

}

function startScreen() {

}

function objectFunctions() {
    if (muscles.length == 0 && numMuscle == waveMuscle) {
        waveOn = false;
    }
    //tile functions
    for (i = 0; i < tiles.length; i++) {
        tiles[i].show();
        if (tiles[i].clicked(i)) {
            tiles[i] = new Road;
        }

    }
    //tower functions
    for (t = 0; t < towers.length; t++) {
        towers[t].show();
        towers[t].lockon();
    }

    if (waveOn) {
        //enemy functions
        for (var m = 0; m < muscles.length; m++) {

            muscles[m].move(m);
            muscles[m].show();

        }

    }

    //bullet functions
    for (var bindex = 0; bindex < bullets.length; bindex++) {


        bullets[bindex].show();
        bullets[bindex].move(bindex);


    }


}
