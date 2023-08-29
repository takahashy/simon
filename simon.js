// global variables
var button_colors = ["red", "blue", "green", "yellow"];
var game_pattern = [];
var user_pattern = [];
var level = 0;
var started = false;
// play the sound of corresponding color
function playSound(color) {
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}
// adding pressed class to button when clicked
function animatePressed(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () { $("#" + color).removeClass("pressed"); }, 100);
}
// start over
function startOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("GAME OVER!<br>LEVEL " + level + "<br>Press any Key to Restart");
    level = 0;
    started = false;
    game_pattern = [];
}
// Computer chooses a random color and push onto array while playing animation
function newSequence() {
    // update level text
    $("h1").html("LEVEL " + level);
    level++;
    // clear user_pattern array
    user_pattern = [];
    // show which color to press next
    var rand = Math.floor(Math.random() * 4);
    var random_color = button_colors[rand];
    game_pattern.push(random_color);
    $("#" + random_color).fadeOut(200).fadeIn(200);
    playSound(random_color);
}
// Check that the user inputted color is the same as that of the game
function checkPattern(index) {
    if (user_pattern[index] === game_pattern[index]) {
        if (index === game_pattern.length - 1) {
            setTimeout(function () {
                newSequence();
            }, 800);
        }
    }
    else {
        startOver();
    }
}
////// USER INTERACTION //////
// start game once key is pressed
$(document).on("keydown", function () {
    if (!started) {
        $("body").removeClass("game-over");
        newSequence();
        started = true;
    }
});
// detect clicking on the site
$(".btn").on("click", function () {
    if (started) {
        var color = this.id;
        if (color == "red" || color == "blue" || color == "green" || color == "yellow") {
            user_pattern.push(color);
            playSound(color);
            animatePressed(color);
            checkPattern(user_pattern.length - 1);
        }
    }
});
