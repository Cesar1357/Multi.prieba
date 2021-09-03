var ball1, database;
var Position;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);

    ball1 = createSprite(250,250,10,10);
    ball1.shapeColor = "red";
    var ball1Position = database.ref('ball/position');
    ball1Position.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(Position !== undefined){

    
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}
function writePosition(x,y){
    database.ref('ball/position').set({
        'x':Position.x + x,
        'y':Position.y + y
    })
}

function readPosition(data){
    Position = data.val();
    console.log(Position.x);
    ball1.x = Position.x;
    ball1.y = Position.y;
}

function showError(){
    console.log("error en escribir la base de datos");
}
