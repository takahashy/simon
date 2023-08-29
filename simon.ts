// global variables
let button_colors:string[] = ["red", "blue", "green", "yellow"];
let game_pattern:string[] = [];
let user_pattern:string[] = [];
let level:number = 0;
let started:boolean = false;


// play the sound of corresponding color
function playSound(color:string) : void {
    let sound:HTMLAudioElement = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}


// adding pressed class to button when clicked
function animatePressed(color:string): void {
    $("#" + color).addClass("pressed");
    setTimeout(function () {$("#" + color).removeClass("pressed")}, 100);
}


// start over
function startOver() : void {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("GAME OVER!<br>LEVEL " + level + "<br>Press any Key to Restart");
    level = 0;
    started = false;
    game_pattern = [];
}


// Computer chooses a random color and push onto array while playing animation
function newSequence(): void {
    // update level text
    $("h1").html("LEVEL " + level);
    level++;

    // clear user_pattern array
    user_pattern = [];

    // show which color to press next
    let rand = Math.floor(Math.random() * 4);
    let random_color:string = button_colors[rand];
    game_pattern.push(random_color);
    $("#" + random_color).fadeOut(200).fadeIn(200);
    playSound(random_color);
}


// Check that the user inputted color is the same as that of the game
function checkPattern(index:number) : void {
    if (user_pattern[index] === game_pattern[index]) {
        if (index === game_pattern.length - 1) {
            setTimeout(() => {
                newSequence();
            }, 800);
        }
    } else {
        startOver();
    }
}


////// USER INTERACTION //////

// start game once key is pressed
$(document).on("keydown", () => {
    if (!started) {
        $("body").removeClass("game-over");
        newSequence();
        started = true;
    }
});

// detect clicking on the site
$(".btn").on("click", function () {
    if (started) {
        let color:string = this.id;
        if (color == "red" || color == "blue" || color == "green" || color == "yellow") {
            user_pattern.push(color);
            playSound(color);
            animatePressed(color);
            checkPattern(user_pattern.length - 1);
        }
    }
});




