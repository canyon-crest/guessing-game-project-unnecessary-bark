// time
date.textContent = time();
dayOfYear.textContent = dayOfTheYear();
// global variables/constants
let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
const timeArr = [];
let timeSum = 0;
// event listeners, when a user clicks the buttons that these variables are linked to, the function linked to them occurs
nameBtn.addEventListener("click", nameFunction);
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);
// timer at the top of the screen for the hour, minute, and second of the day that updates every second
function updateTimer() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById("timerDisplay").textContent = timeString;
}
updateTimer();
let timerInterval = setInterval(updateTimer, 1000);
// the following two functions are for the timer that determine how long each round is 
function startTimer() {
    start = new Date().getTime();
}
function stopTimer() {
    stopGame = new Date().getTime();
    gameTime = ((stopGame - start)/1000).toFixed(2);
    timeSum += Number(gameTime);
}
function giveUp() {
    // if you press the give up button after starting to play this function happens
    // the user's score is set to all possible guesses or range when pressing give up
    stopTimer();
    if (level == 100) {
        score = 100;
    }
    else if (level == 10) {
        score = 10;
    }
    else {
        score = 3;
    }
    msg.textContent = "Because you gave up, your score is the amount of possible guesses, which is " + score + ". Better luck next time " + userName + "! And your game took " + gameTime + " seconds!"
    guess.value = "";
    // after the user gives up, almost everything is reset except the user's name and the score is updated
    reset();
    updateScore();
}
function nameFunction() {
    // asks the user for their first name and cases it correctly
    nameBtn.disabled = true;
    userName = nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1).toLowerCase()
    if (userName == "") {
        // user must enter a name to play
        msg.textContent = "Please enter a name!"
        nameBtn.disabled = false;
        return;
    }
}
function time() {
    let d = new Date();
    let str = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear();
    return str;
}
function dayOfTheYear() {
    // determines the month and what suffix to add to the day of the month
    let d = new Date();
    month = "";
    day = "";
    if ((d.getMonth() + 1) == 1) {
        month = "January";
    }
    else if ((d.getMonth() + 1) == 2) {
        month = "February";
    }
    else if ((d.getMonth() + 1) == 3) {
        month = "March";
    }
    else if ((d.getMonth() + 1) == 4) {
        month = "April";
    }
    else if ((d.getMonth() + 1) == 5) {
        month = "May";
    }
    else if ((d.getMonth() + 1) == 6) {
        month = "June";
    }
    else if ((d.getMonth() + 1) == 7) {
        month = "July";
    }
    else if ((d.getMonth() + 1) == 8) {
        month = "August";
    }
    else if ((d.getMonth() + 1) == 9) {
        month = "September";
    }
    else if ((d.getMonth() + 1) == 10) {
        month = "October";
    }
    else if ((d.getMonth() + 1) == 11) {
        month = "November";
    }
    else {
        month = "December";
    }

    if (d.getDate() == 1 || d.getDate() == 21 || d.getDate() == 31) {
        day = d.getDate() + "st"
    }
    else if ((d.getDate()) == 2 || d.getDate() == 22) {
        day = d.getDate() + "nd"
    }
    else if ((d.getDate()) == 3 || d.getDate() == 23) {
        day = d.getDate() + "rd"
    }
    else {
        day = d.getDate() + "th"
    }
    let str = month + " " + day;
    return str;
}
function play(){
    if (nameBtn.disabled == false) {
        // user must have a name to play
        msg.textContent = "Please enter a name first!";
        return;
    }
    else {
    startTimer();
    playBtn.disabled = true;
    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    guess.disabled = false;
    for(let i = 0; i < levelArr.length; i++){
        levelArr[i].disabled = true;
        if(levelArr[i].checked) {
            level = levelArr[i].value;
        }
    }
    // determines the answer
    answer = Number(Math.floor(Math.random()*level) + 1);
    // tells the user directions on how to play the game based on the level they chose
    msg.textContent = "Guess a number 1-" + level + ", " + userName + "!";
    score = 0;
    }
}
function makeGuess(){
    let userGuess = parseInt(guess.value);
    temperature = "";
    // hot, warm, cold system
    if (level == 100){
        if (Math.abs(answer-userGuess)<= 10) {
            temperature = "hot";
        }
        else if (Math.abs(answer-userGuess)<= 25) {
            temperature = "warm";
        }
        else {
            temperature = "cold";
        }
    }
    else if (level == 10){
        if (Math.abs(answer-userGuess)<= 3) {
            temperature = "hot";
        }
        else if (Math.abs(answer-userGuess)<= 5) {
            temperature = "warm";
        }
        else {
            temperature = "cold";
        }
    }
    else {
        if (Math.abs(answer-userGuess)<= 1) {
            temperature = "hot";
        }
        else {
            temperature = "warm";
        }
    }
    // determines whether the user's guess is a number
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level) {
        msg.textContent = "INVALID, guess a number in between 1-" + level + ", " + userName + "!";
        guess.value = "";
        return;
    } 
    score++;
    // too high too low system
    if(userGuess > answer){
        msg.textContent = "Too high " + userName + "! You are " + temperature + "!";
        guess.value = "";
    }
    else if(userGuess < answer){
        msg.textContent = "Too low " + userName + "! You are " + temperature + "!"; 
        guess.value = "";
    }
    else {
        // determines how to judge the user's game
        stopTimer();
        if(level == 3){
            if (score == 1){
                userSkill = "Great job";
            }
            else if (score == 2){
                userSkill = "Good job"
            }
            else {
                userSkill = "Could've done better,"
            }
        }
        else if (level == 10) {
            if (score <= 3){
            userSkill = "Great job";
            }
            else if(score <= 5){
            userSkill = "Good job"
            }
            else {
            userSkill = "Could've done better,"
            }
        }

        else {
            if (score <= 6){
            userSkill = "Great job"
            }
            else if (score <= 9) {
            userSkill = "Good job"
            }
            else {
            userSkill = "Could've done better,"
            }
        }
        if (userSkill == "Could've done better,") {
        msg.textContent = "Correct! It took " + score + " tries." + " " + userSkill + " " + userName + ".  Your game took " + gameTime + " seconds!";
        }
        else {
            if (score == 1) {
                msg.textContent = "Correct! It took " + score + " try." + " " + userSkill + " " + userName + "! Your game took " + gameTime + " seconds!";
            }
            else {
                msg.textContent = "Correct! It took " + score + " tries." + " " + userSkill + " " + userName + "! Your game took " + gameTime + " seconds!";
            }
            
        }
        // after the user gets the right answer, almost everything gets reset except the user's name and the score is updated
        reset();
        updateScore();
    }
}
function reset() {
    // resets everything back to normal other than the user's name after they win
    guessBtn.disabled = true;
    guess.value = "";
    guess.disabled = true;
    playBtn.disabled = false;
    giveUpBtn.disabled = true;
    start = 0;
    stopGame = 0;
    for(let i = 0; i < levelArr.length; i++) {
        levelArr[i].disabled = false;
    }
}
function updateScore() {
    scoreArr.push(score); // adds current score to array of scores
    timeArr.push(gameTime); // adds current time to array of times
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    scoreArr.sort((a, b) => a - b); // sorts ascending
    timeArr.sort((a, b) => a - b);
    // leaderboard
    const lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < scoreArr.length; i++) {
        sum += scoreArr[i];
        if(i < lb.length) {
            lb[i].textContent = scoreArr[i];
        }
    }
    // average score
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
    // time leaderboard
    const tlb = document.getElementsByName("timeLeaderboard");
    for(let i = 0; i < timeArr.length; i++) {
        if(i < tlb.length) {
            tlb[i].textContent = timeArr[i];
        }
    }
    // average time per round
    let timeAvg = timeSum/scoreArr.length;
    avgTime.textContent = "Average Time: " + timeAvg.toFixed(2);

}