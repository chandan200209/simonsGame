const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var bool = false;
var level = 0;
var randomChosenColor;
var userChosenColor;
$(document).ready(function () {
    $(document).keypress(function () {
        if (!bool) {
            $('#level-title').text(`Level ${level}`);
            nextSequence();
            bool = true;
        }
    });
});
$('.btn').click(function () {
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});
const startOver = function () {
    level = 0;
    gamePattern = [];
    bool = false;
}
const playSound = function (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
const animatePress = function (currentColor) {
    $("#" + currentColor).addClass('pressed');
    setTimeout(function () {
        $("#" + currentColor).removeClass('pressed');
    }, 100);
}
const checkAnswer = function (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        $('#level-title').text("Game Over, Press Any key to Restart").css("fontSize", "32px");
        startOver();
    }
    console.log(userClickedPattern);
    console.log(gamePattern);
}
const nextSequence = function () {
    userClickedPattern = [];
    level++;
    $('#level-title').text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);
    randomChosenColor = buttonColors[randomNumber];
    // console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}