var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = []; // Reset the user's pattern at the start of each sequence.
  level++; // Increment the level each time nextSequence is called.
  $("#level-title").text("Level " + level); // Update the level text in the H1.

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userChosenColour);
});

function playSound(color) {
  var audio = new Audio('sounds/' + color + '.mp3');
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentColor) {
    var currentLevel = userClickedPattern.length;

    if (currentColor === gamePattern[currentLevel - 1]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("h1").text("Game Over! Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000);
        playSound("wrong");  // Play the "wrong" sound
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

