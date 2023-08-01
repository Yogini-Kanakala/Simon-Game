var buttonColours =["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[]
var level=0;
var started=false;

//button animation whan pressed
function animatePress(currentColour){
    $("#"+currentColour).addClass('pressed');
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
    },100);
    
}

//functionto play sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

//if button got clicked things to do
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  });

//function for the next sequence

function nextSequence(){
    userClickedPattern = [];
    level=level+1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   

}


$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  
//Checking the answers

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length=== gamePattern.length){
      setTimeout(function (){ nextSequence(); },1000);
    }
  }
  else{
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over"); 
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}
//Game start over resetting
function startOver(){
  level=0;
  gamePattern=[];
  started=false;

}

