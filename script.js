// time
date.textContent = time();
dayOfYear.textContent = dayOfTheYear();
// global variables/constants
let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
// event listeners
nameBtn.addEventListener("click", nameFunction)
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp)
function giveUp() {
    if (level == 100) {
        score = 100;
    }
    else if (level == 10) {
        score = 10;
    }
    else {
        score = 3;
    }
    msg.textContent = "Because you gave up, your score is the amount of possible guesses, which is " + score + ". Better luck next time " + userName + "!"
    guess.value = "";
    reset();
    updateScore();
}
function nameFunction() {
    nameBtn.disabled = true;
    userName = nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1).toLowerCase()
    if (userName == "") {
        msg.textContent = "Please enter a name!"
        nameBtn.disabled = false;
        return;
    }
}
function time() {
    let d = new Date();
    let str = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear();
    // update here
    return str;
}
function dayOfTheYear() {
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
        msg.textContent = "Please enter a name first!";
        return;
    }
    else {
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
    answer = Number(Math.floor(Math.random()*level) + 1);
    msg.textContent = "Guess a number 1-" + level + ", " + userName + "!";
    guess.placeholder = answer;
    score = 0;
    }
}
function makeGuess(){
    let userGuess = parseInt(guess.value);
    temperature = "";
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
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level) {
        msg.textContent = "INVALID, guess a number in between 1-" + level + ", " + userName + "!";
        guess.value = "";
        return;
    } 
    score++;
    if(userGuess > answer){
        msg.textContent = "Too high " + userName + "! You are " + temperature + "!";
        guess.value = "";
    }
    else if(userGuess < answer){
        msg.textContent = "Too low " + userName + "! You are " + temperature + "!"; 
        guess.value = "";
    }
    else {
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
        msg.textContent = "Correct! It took " + score + " tries." + " " + userSkill + " " + userName + ".";
        }
        else {
            if (score == 1) {
                msg.textContent = "Correct! It took " + score + " try." + " " + userSkill + " " + userName + "!";
            }
            else {
                msg.textContent = "Correct! It took " + score + " tries." + " " + userSkill + " " + userName + "!";
            }
            
        }
        reset();
        updateScore();
    }
}
function reset() {
    guessBtn.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    guess.disabled = true;
    playBtn.disabled = false;
    giveUpBtn.disabled = true;
    for(let i = 0; i < levelArr.length; i++) {
        levelArr[i].disabled = false;
    }
}
function updateScore() {
    scoreArr.push(score); // adds current score to array of scores
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    scoreArr.sort((a, b) => a - b); // sorts ascending
    // leaderboard?
    const lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < scoreArr.length; i++) {
        sum += scoreArr[i];
        if(i < lb.length) {
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: " + avg.toFixed(2);

}