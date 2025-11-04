// time
date.textContent = time();
// global variables/constants
let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
// event listeners
nameBtn.addEventListener("click", nameFunction)
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
function nameFunction() {
    nameBtn.disabled = true;
    userName = nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1).toLowerCase()
}
function time() {
    let d = new Date();
    // concatenate the date and time
    let str = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear();
    // update here
    return str;
}
function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
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
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level) {
        msg.textContent = "INVALID, guess a number in between 1-" + level + ", " + userName + "!";
        guess.value = "";
        return;
    } 
    score++;
    if(userGuess > answer){
        msg.textContent = "Too high!"
        guess.value = "";
    }
    else if(userGuess < answer){
        msg.textContent = "Too low!"
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