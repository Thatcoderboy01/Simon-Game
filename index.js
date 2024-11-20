var ButtonColors = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];

var userClickedPattern = [];
started = false;
var level = 0;
$(document).keypress(function(){
    if(!started){

        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;

    }
}); 
$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColour);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    } else{
        // console.log("wrong");

        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any key to restart.");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        

        gameOver();
    }

}

function nextSequence(){

    userClickedPattern =[];

    level++;
    $("#level-title").text("Level" + level);
 var randomNumber = Math.floor(Math.random() * 4);

 var randomChosenColour = ButtonColors[randomNumber];
 gamePattern.push(randomChosenColour);

 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

 playSound(randomChosenColour);

//  var audio = new audio("sounds/" + randomChosenColour + ".mp3");
//  audio.play();

}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")

    }, 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function gameOver(){
    level = 0;
    gamePattern = [];
    started = false;
}