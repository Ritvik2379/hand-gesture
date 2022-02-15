prediction_1 = ""

Webcam.set({
   width:350,
   height:300,
   image_format:'png',
   png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+ data_uri +'"/>'
});}

console.log("ml5_version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_-JiC1fuV//model.json",modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
if(error){
    console.log(error);  
}
else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    prediction =results[0].label;
    speak();
    if (prediction == "&#128076;"){
        document.getElementById("update_emoji").innerHTML="&#128076;";
    }
    if (prediction == "&#128077;"){
        document.getElementById("update_emoji").innerHTML="&#128077;";
    }
    if (prediction == "&#9996;"){
        document.getElementById("update_emoji").innerHTML="&#9996;";
    }
}
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1="the first prediction is " + prediction ;
    utterThis= new SpeechSynthesisUtterance (speak_data_1);
    synth.speak(utterThis);
}
