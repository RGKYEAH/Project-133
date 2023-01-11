img = "";
status = "";
object = [];

function preload() {
    img = loadImage("soccer.jfif");
}

function setup() {
    canvas = createCanvas(640,420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',ModelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(img,0,0,640,420);

    if(status != "") {
        for(i = 0;i<object.length;i++) {
        document.getElementById("status").innerHTML = "Status : Objects Detector";
        fill("red");
        percent = floor(object[i].confidence * 100);
        text(object[i].label+ " "+percent +"%",object[i].x,object[i].y);
        noFill();
        stroke("red");
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
    }
}

function ModelLoaded() {
    console.log("Model Is Loaded");
    status = true;
    objectDetector.detect(img,gotresult);
}

function gotresult(error,results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        object = results;
    }
}