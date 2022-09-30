status="";
objects="";

function setup(){
    canvas=createCanvas(480,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function gotresults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,480,480);
    if(status!=""){
    objectdetector.detect(video,gotresults);
        for(i=0 ;i < objects.length; i++){
            document.getElementById("status").innerHTML="object is detected";

fill("#808080");
percent=floor(objects[i].confidence*100);
text(objects[i].label +""+ percent+ "%", objects[i].x,objects[i].y);
noFill();
stroke("#808080");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label==obj){
    video.stop();
    objectdetector.detect(gotresults);
    document.getElementById("status").innerHtml=obj+"Found";
    synth=window.speechSynthesis;
    utterThis=new SpeechSynthesisUtterance(obj +"found");
    synth.speak(utterThis);
}
else{
    document.getElementById("status").innerHTML=obj+" not found";
}
        }
    }
}
function start(){
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status:detecting objects";
    obj=document.getElementById("obj").value;
   
}
function modelLoaded(){
    console.log("Model is loaded");
    status=true;
    
}
