function openModalDialog() { 
	document.getElementById("myDialog").showModal(); 
} 

function closeModalDialog() { 
	document.getElementById("myDialog").close(); 
}

//Div seperation code

$('#nav_login').on('click',function(){
	if(($('#welcome').css('display')!='none') || ($('#register').css('display')!='none') || ($('#game_stats').css('display')!='none')){
	$('#login').show().siblings('div').hide();
}});
$('#login_button').on('click',function(){
	if(($('#welcome').css('display')!='none') || ($('#register').css('display')!='none')){
	$('#login').show().siblings('div').hide();
}});

$('#nav_welcome').on('click',function(){
	if(($('#login').css('display')!='none') || ($('#register').css('display')!='none') || ($('#game_stats').css('display')!='none')){
	$('#welcome').show().siblings('div').hide();
}});

$('#nav_register').on('click',function(){
	if(($('#login').css('display')!='none') || ($('#welcome').css('display')!='none') || ($('#game_stats').css('display')!='none')){
	$('#register').show().siblings('div').hide();
}});

$('#register_button').on('click',function(){
	if(($('#login').css('display')!='none') || ($('#welcome').css('display')!='none')){
	$('#register').show().siblings('div').hide();
}});


// Forms code

var usersArr;
var pwArr;

$(document).ready(function () {
	usersArr = ["a"];
	pwArr = ["a"];
	$("#form[name='login_form']").submit(function (e) {
		e.preventDefault();
	});
    $("form[name='reg_form']").validate({
		rules: {
		  username: {
			required: true,
			validusername: true
		  },
		  lname: {
			required: true,
			validname: true,
		  },
		  fname: {
			required: true,
			validname: true,
		  },
		  email: {
			required: true,
			email: true,
		  },
		  password: {
			required: true,
			validpw: true,
			minlength: 8
		  },
		  bday: "required"
		},
		messages: {
		  username: {
			required: "Please enter your username",
			validusername: "Username already taken. Please choose another"
		  },
		  lname: {
			required: "Please enter your last name",
			validname: "Name must not include digits"
		  },
		  fname: {
			required: "Please enter your first name",
			validname: "Name must not include digits"
		  },
		  password: {
			required: "Please provide a password",
			validpw: "Password must include digits and english letters",
			minlength: "Your password must be at least 8 characters long"
		  },
		  bday: "Please enter your date of birth",
		  email: "Please enter a valid email address"
		},
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		submitHandler: function(form) {
		}
	});
	  
	$.validator.addMethod("validname", function(value) {
        if(/[0-9]/.test(value))
            return false;
        else 
			return true;
    });
	$.validator.addMethod("validpw", function (value) {
        if (/^[A-Za-z0-9\d=!\-@._*]*$/.test(value)) // Checking if characters are valid
            if (/[a-zA-Z]/.test(value) && /\d/.test(value)) //Check for atleast one digit and char.
                return true;
            else
                return false;
    });
	$.validator.addMethod("validusername", function(value) {
		if(usersArr.indexOf(value)>=0)
            return false;
        else 
			return true;
    });
	
	$(function (){
		$('#reg_form').submit(function (){
			if($(this).valid()){
				var currUserName = $('#username').val();
				var currPassword = $('#password').val();
				usersArr.push(currUserName);
				pwArr.push(currPassword);
				window.alert('Registration completed successfully!');
				$('#login').show().siblings('div').hide();
			}
		});
	});
});

var userName;

//Login foo

function login(){
	userName = $(document.getElementsByName('login_username')).val();
	var userPass = $(document.getElementsByName('login_password')).val();
	var userIndex = usersArr.indexOf(userName);
	// window.alert(userIndex);
	//Remove alert from above.
	if(userIndex >= 0){	//User exists
		if(userPass == pwArr[userIndex]){ 	//Check matching pw
			window.alert("Login successfull!");
			//Need to transfer to game window here.
			$('#game_stats').show().siblings('div').hide();
			
		}
		else{
			window.alert("Password incorrect");
		}
	}
	else{
		window.alert("Username does not exist");
	}
}


var ballsMax = 91;	// Max is 90 but because of random we set to 91
var ballsMin = 50;
var lengthMin = 60;
var lengthMax = 601;
var monstersMax = 4; //Max is 3 but because of random function we set to 4
var monstersMin = 1;
//Randomize game stats foo
function randomizestats(){
	var ballsRandom = Math.floor(Math.random() * (+ballsMax - +ballsMin) + +ballsMin); 
	var lengthRandom = Math.floor(Math.random() * (+lengthMax - +lengthMin) + +lengthMin); 
	var monstersRandom = Math.floor(Math.random() * (+monstersMax - +monstersMin) + +monstersMin); 
	$('#balls_number').val(ballsRandom);
	$('#game_time').val(lengthRandom);
	$('#monsters').val(monstersRandom);
	$('#color5').val(getRandomColor());
	$('#color15').val(getRandomColor());
	$('#color25').val(getRandomColor());
}

//Randomize colors and return random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function start_stats(){
	// upkey = $('#up').val();
	// downkey = $('#down').val();
	// rightkey = $('#right').val();
	// leftkey = $('#left').val();
	numBalls = $('#balls_number').val();
	gameLength = parseInt($('#game_time').val(), 10);
	numMonsters = $('#monsters').val();
	color60 = $('#color5').val();
	color30 = $('#color15').val();
	color10 = $('#color25').val();
	if ((!upkey.length == 0 && !downkey.length ==0 && !leftkey.length == 0 && !rightkey.length == 0) && (leftkey == upkey || leftkey == downkey || leftkey == rightkey || upkey == downkey || upkey == rightkey || downkey == rightkey)){
		window.alert("Please select different keys for each control");
	}
	else if (numBalls < 50 || numBalls > 90){
		window.alert("Number of balls must be between 50 and 90");
	}
	else if (gameLength < 60){
		window.alert("Game length must be at least 60 seconds");
	}
	else if (numMonsters < 1 || numMonsters > 3){
		window.alert("Number of monsters must be between 1 and 3");
	}
	else{
		$('#game').show().siblings('div').hide();
		Start();
	}
}

//Modal code
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When escape is pressed
document.onkeydown = function(e) {
	e = e || window.event;
	var esc = false;
	if ("key" in e) 
	{
		esc = (e.key === "Esc" || e.key === "Escape");
	} 
	else 
	{
		esc = (e.keyCode === 27);
	}
	if (esc) {
		modal.style.display = "none";
	}
};

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// Game vars
var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var lastMove;
var rightMove = 2, leftMove = 5, upMove = 6, downMove = 7;
var monster = 10;
var monsterX, monsterY;
var pacX, pacY;
var monstersBoard;
var monsterIDs = [11, 12, 13]
var monstersLocations;
var m1_loc_x, m1_loc_y;
var m2_loc_x, m2_loc_y;
var m3_loc_x, m3_loc_y;
var boardSize = 20;
var lastMoves = new Array();
var remaningLife = 3, remaningFood;
var firstTypeValue = 21, secondTypeValue = 22, thirdTypeValue = 23;
var totalScore;
var rewardX, rewardY, isRewardEaten = false;
var moveTimer = true;
var clock = 100, extraLife = 200;
var wallImg, greenMonsterPicture, redMonsterPicture, blueMonsterPicture;
var clockPicture, strawberryPicture, up1Picture;
var upkey = 'ArrowUp', downkey = 'ArrowDown', leftkey = 'ArrowLeft', rightkey = 'ArrowRight';

function Start() {
	document.getElementById('sound').play();
    document.getElementById('sound').currentTime = 0;
	
	var
	board = new Array();
	monstersBoard = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	start_time = new Date();
	for (var i = 0; i < boardSize; i++) {
			board[i] = new Array();
			monstersBoard[i] = new Array();
	}
	loadImages();
	initBoard();
	putObstacles();
	addFoodToBoard(numBalls);
	addPacManToBoard();
	initMonsters();
	initRandomReward();
	addToBoardInEmptyCell(clock);
	addToBoardInEmptyCell(extraLife);

	keysDown = {};
	keysDown[upkey] = false;
	keysDown[downkey] = false;
	keysDown[leftkey] = false;
	keysDown[rightkey] = false;
	addEventListener("keydown", function (e) {
			keysDown[e.code] = true;
	}, false);
	addEventListener("keyup", function (e) {
			keysDown[e.code] = false;
	}, false);
	lastMove = rightMove;
	clearInterval(interval);
	interval = setInterval(UpdatePosition, 250);
}


function findRandomEmptyCell() {
	var i = Math.floor(Math.random() * boardSize);
	var j = Math.floor(Math.random() * boardSize);
	while (board[i][j] !== 0) {
			i = Math.floor(Math.random() * boardSize);
			j = Math.floor(Math.random() * boardSize);
	}
	return [i, j];
}

/**
* @return {number}
*/
function GetKeyPressed() {
	if (keysDown[upkey]) {
			// keysDown[upkey] = false;
			return upMove;
	}
	if (keysDown[downkey]) {
			return downMove;
	}
	if (keysDown[leftkey]) {
			return leftMove;
	}
	if (keysDown[rightkey]) {
			return rightMove;
	}
	return -1;
}

function Draw() {
	context.clearRect(0, 0, canvas.width, canvas.height); //clean board
	document.getElementById("lblUName").innerHTML = userName;
	document.getElementById("lblScore").innerHTML = score;
	document.getElementById("lblTime").innerHTML = parseInt(gameLength - time_elapsed, 10);
	document.getElementById("lblLife").innerHTML = remaningLife;
	// lblScore.value = score;
	// lblTime.value = parseInt(gameLength - time_elapsed, 10);
	// lblLife.value = remaningLife;
	for (var i = 0; i < boardSize; i++) {
			for (var j = 0; j < boardSize; j++) {
					var center = new Object();
					center.x = i * 25 + 12;
					center.y = j * 25 + 12;
				
				if (pacManMove(i, j)) {
							values = drawPacman(board[i][j]);
							piAngle1 = values[0];
							piAngle2 = values[1];
							addToX = values[2];
							addToY = values[3];
							context.beginPath();
							context.arc(center.x, center.y, 12, piAngle1 * Math.PI, piAngle2 * Math.PI); // half circle
							context.lineTo(center.x, center.y);
							context.fillStyle = pac_color; //color
							context.fill();
							context.beginPath();
							context.arc(center.x + addToX, center.y + addToY, 2, 0, 2 * Math.PI); // circle
							context.fillStyle = "black"; //color
							context.fill();

				} else if (!isRewardEaten && rewardX === i && rewardY === j) {
					context.drawImage(strawberryPicture, center.x - 12, center.y - 12, 25, 25);
				} else if (monstersBoard[i][j] != 0) {
					if (monstersBoard[i][j] === monsterIDs[0]) {
						context.drawImage(redMonsterPicture, center.x - 12, center.y - 12, 25, 25);
					} else if (monstersBoard[i][j] === monsterIDs[1]) {
						context.drawImage(greenMonsterPicture, center.x - 12, center.y - 12, 25, 25);
					} else if (monstersBoard[i][j] === monsterIDs[2]) {
						context.drawImage(blueMonsterPicture, center.x - 12, center.y - 12, 25, 25);
					}					

				} else if (board[i][j] === 21 || board[i][j] === 22 || board[i][j] === 23) {
					context.beginPath();
					context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
					if (board[i][j] === 21){
						context.fillStyle = color60; //color
					} else if (board[i][j] === 22){
						context.fillStyle = color30; //color
					} else if (board[i][j] === 23){
						context.fillStyle = color10; //color
					}
					context.fill();
				} else if (board[i][j] === 4) {
					context.drawImage(wallImg, center.x - 12, center.y - 12, 25, 25);
				}	else if (board[i][j] === clock) {
					context.drawImage(clockPicture, center.x - 12, center.y - 12, 25, 25);
				} else if (board[i][j] === extraLife) {
					context.drawImage(up1Picture, center.x - 12, center.y - 12, 25, 25);
			} 	
		}
	}
}

function drawPacman(move) {
	var values;
	if (move == rightMove) {
		values = [0.15, 1.85, 2, -7]
	} else if (move == leftMove) {
		values = [1.15, 0.85, -2, -7]
	} else if (move == upMove) {
		values = [1.65, 1.35, 7, -2]
	} else if (move == downMove) {
		values = [0.65, 0.35, 7, 5]
	}
	return values;
}


function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x === upMove) {
			if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
					shape.j--;
			}
	}
	if (x === downMove) {
			if (shape.j < boardSize && board[shape.i][shape.j + 1] !== 4) {
					shape.j++;
			}
	}
	if (x === leftMove) {
			if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
					shape.i--;
			}
	}
	if (x === rightMove) {
			if (shape.i < boardSize && board[shape.i + 1][shape.j] !== 4) {
					shape.i++;
			}
	}
	if (isScore()) {
			addScore();
	}
	if (!isRewardEaten && shape.i === rewardX && shape.j === rewardY) {
		isRewardEaten = true;	
		score += 50;
	}
	if (board[shape.i][shape.j] == clock){
			gameLength += 5;
			board[shape.i][shape.j] = 0;
			addToBoardInEmptyCell(clock);
	}
	if (board[shape.i][shape.j] == extraLife){
		remaningLife++;
		board[shape.i][shape.j] = 0;
}

	if (x == -1) {
		board[shape.i][shape.j] = lastMove;
	} else if (x == rightMove) {
		board[shape.i][shape.j] = rightMove;
	} else if (x == leftMove) {
		board[shape.i][shape.j] = leftMove;
	} else if (x == upMove) {
		board[shape.i][shape.j] = upMove;
	} else if (x == downMove) {
		board[shape.i][shape.j] = downMove;
	}
	lastMove = board[shape.i][shape.j];
	pacX = shape.i;
	pacY = shape.j;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 350 && time_elapsed <= 10) {
			pac_color = "purple";
	}

	if (time_elapsed > gameLength) {
		if (score < 150) {
			window.clearInterval(interval);
			window.alert("You can do better - you scored: " + score.toString());
		} else {
			window.clearInterval(interval);
			window.alert("We Have a winner!!!");
		}
	}

	if (!isRewardEaten) {
		moveReward();
	}
	moveMonsters();
	Draw();
	checkIfEaten();

	if (remaningFood === 0) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}
}

function putObstacles() {
	for (var i = 0; i < boardSize; i++) {
		board[0][i] = 4;
		board[i][0] = 4;
		board[boardSize - 1][i] = 4;
		board[i][boardSize - 1] = 4;
	}
	buildObs(0, 0);
	buildObs(19, 0);
	buildObs(0, 19);
	buildObs(19, 19);

	board[8][9] = 4;
	board[9][9] = 4;
	board[10][9] = 4;
	board[11][9] = 4;
	board[8][10] = 4;
	board[9][10] = 4;
	board[10][10] = 4;
	board[11][10] = 4;

}

function addMonster(){
	initMonstersBoard();
	var flag = true;
	while (flag) {
		var x = Math.floor(Math.random() * 10);
		var y = Math.floor(Math.random() * 10);
		if (board[x][y] == 0) {
			monstersBoard[x][y] = monster;
			monsterX = x;
			monsterY = y;
			flag = false;
		}
	}
}

function initMonstersBoard(){
	for (var i = 0; i < boardSize; i++) {
			for (var j = 0; j < boardSize; j++) {
					monstersBoard[i][j] = 0;
			}
	}
	m1_loc_x = 1;
	m1_loc_y = 1;
	m2_loc_x = 18;
	m2_loc_y = 18;
	m3_loc_x = 18;
	m3_loc_y = 1;
}

function moveMonsters() {
	if (moveTimer){
		for (var i = 0; i < numMonsters; i++) {
			monsterX = monstersLocations[i][0];
			monsterY = monstersLocations[i][1];
			monstersBoard[monsterX][monsterY] = 0;
			if (pacX > monsterX && freePlace(monsterX + 1, monsterY, i)) {
				monsterX = monsterX + 1;
			} else if (pacY > monsterY && freePlace(monsterX, monsterY + 1, i)) {
				monsterY = monsterY + 1;
			} else if (pacX < monsterX && freePlace(monsterX - 1, monsterY, i)) {
				monsterX = monsterX - 1;
			} else if (pacY < monsterY && freePlace(monsterX, monsterY - 1, i)) {
				monsterY = monsterY - 1;
			} else {
				var freeSpaces = getAllAvaliablePlace(monsterX, monsterY, i);
				if (freeSpaces.length > 0) {
					var randPick = Math.floor(Math.random() * freeSpaces.length);
					monsterX = freeSpaces[randPick][0];
					monsterY = freeSpaces[randPick][1];
				} else {
					monsterX = lastMoves[i][0];
					monsterY = lastMoves[i][1];
				}
				
			}
			lastMoves[i][0] = monstersLocations[i][0];
			lastMoves[i][1] = monstersLocations[i][1];
			monstersLocations[i][0] = monsterX;
			monstersLocations[i][1] = monsterY;
			monstersBoard[monsterX][monsterY] = monsterIDs[i];
		}
		moveTimer = false;
	}	else {
		moveTimer = true;
	}
}

function freePlace(x, y, id) {
	return x < board.length && y < board[x].length && board[x][y] != 4 && isLastMove(x, y, id);
}

function isLastMove(x, y, id) {
	return x != lastMoves[id][0] || y != lastMoves[id][1];
}

function getAllAvaliablePlace(x, y, i) {
	var freeSpaces = new Array();
	if (freePlace(x + 1, y, i)) {
		freeSpaces.push([x + 1, y])
	}
	if (freePlace(x, y + 1, i)) {
		freeSpaces.push([x, y + 1])
	}
	if (freePlace(x - 1, y, i)) {
		freeSpaces.push([x - 1, y])
	}
	if (freePlace(x, y - 1, i)) {
		freeSpaces.push([x, y - 1])
	}
	return freeSpaces;
}

function initMonsters() {
	initMonstersBoard();
	monstersLocations = new Array();
	monstersLocations.push([m1_loc_x, m1_loc_y]);
	addMonsterToMonstersBoard(m1_loc_x, m1_loc_y, monsterIDs[0]);
	lastMoves[0] = [0, 0];
	
	if (numMonsters > 1) {
		monstersLocations.push([m2_loc_x, m2_loc_y]);
		addMonsterToMonstersBoard(m2_loc_x, m2_loc_y, monsterIDs[1]);
		lastMoves[1] = [0, 0];

		if (numMonsters > 2) {
			monstersLocations.push([m3_loc_x, m3_loc_y]);
			addMonsterToMonstersBoard(m2_loc_x, m2_loc_y, monsterIDs[2]);
			lastMoves[2] = [0, 0];
		}
	}

}

function addMonsterToMonstersBoard(x, y, id) {
	monstersBoard[x][y] = id;
}

function buildObs(offSetX, offSetY) {
	board[Math.abs(offSetX - 2)][Math.abs(offSetY - 2)] = 4;
	board[Math.abs(offSetX - 2)][Math.abs(offSetY - 3)] = 4;
	board[Math.abs(offSetX - 3)][Math.abs(offSetY - 2)] = 4;
	board[Math.abs(offSetX - 3)][Math.abs(offSetY - 3)] = 4;
	board[Math.abs(offSetX - 4)][Math.abs(offSetY - 2)] = 4;
	board[Math.abs(offSetX - 4)][Math.abs(offSetY - 3)] = 4;

	board[Math.abs(offSetX - 2)][Math.abs(offSetY - 5)] = 4;
	board[Math.abs(offSetX - 3)][Math.abs(offSetY - 5)] = 4;
	board[Math.abs(offSetX - 4)][Math.abs(offSetY - 5)] = 4;

	board[Math.abs(offSetX - 6)][Math.abs(offSetY - 2)] = 4;
	board[Math.abs(offSetX - 6)][Math.abs(offSetY - 3)] = 4;
	board[Math.abs(offSetX - 7)][Math.abs(offSetY - 2)] = 4;
	board[Math.abs(offSetX - 7)][Math.abs(offSetY - 3)] = 4;
	board[Math.abs(offSetX - 8)][Math.abs(offSetY - 2)] = 4;
	board[Math.abs(offSetX - 8)][Math.abs(offSetY - 3)] = 4;

	board[Math.abs(offSetX - 6)][Math.abs(offSetY - 5)] = 4;
	board[Math.abs(offSetX - 6)][Math.abs(offSetY - 6)] = 4;
	board[Math.abs(offSetX - 6)][Math.abs(offSetY - 7)] = 4;
	board[Math.abs(offSetX - 6)][Math.abs(offSetY - 8)] = 4;
	board[Math.abs(offSetX - 6)][Math.abs(offSetY - 9)] = 4;
	board[Math.abs(offSetX - 7)][Math.abs(offSetY - 7)] = 4;
	board[Math.abs(offSetX - 8)][Math.abs(offSetY - 7)] = 4;

	board[Math.abs(offSetX - 8)][Math.abs(offSetY - 5)] = 4;
	board[Math.abs(offSetX - 9)][Math.abs(offSetY - 5)] = 4;
	
	board[Math.abs(offSetX - 1)][Math.abs(offSetY - 7)] = 4;
	board[Math.abs(offSetX - 1)][Math.abs(offSetY - 8)] = 4;
	board[Math.abs(offSetX - 2)][Math.abs(offSetY - 7)] = 4;
	board[Math.abs(offSetX - 2)][Math.abs(offSetY - 8)] = 4;
	board[Math.abs(offSetX - 3)][Math.abs(offSetY - 7)] = 4;
	board[Math.abs(offSetX - 3)][Math.abs(offSetY - 8)] = 4;
	board[Math.abs(offSetX - 4)][Math.abs(offSetY - 7)] = 4;
	board[Math.abs(offSetX - 4)][Math.abs(offSetY - 8)] = 4;

}

function checkIfEaten(){
	for (var i = 0; i < numMonsters; i++) {
		if (pacX === monstersLocations[i][0] && pacY === monstersLocations[i][1]) {
			if (remaningLife === 1) {
				score -= 10;
				window.alert('You Lost!');
			}
			else {
				remaningLife--;
				window.alert('You have been EATEN! Life remaning: ' + remaningLife.toString());
				score -= 10;
				reStartAfterEaten();
			}
		}
	}
}

function addFoodToBoard(foodAmount) {
	remaningFood = foodAmount;
	var firstType = 60;
	var secondType = 30;
	var thirdType = 10;
	
	firstType = firstType * foodAmount / 100;
	secondType = secondType * foodAmount / 100;
	thirdType = thirdType * foodAmount / 100;
	totalScore = firstType * 5 + secondType * 15 + thirdType * 25;

	while (foodAmount > 0) {
		emptyCell = findRandomEmptyCell();
		if (firstType > 0) {
			board[emptyCell[0]][emptyCell[1]] = firstTypeValue;
			firstType--;
		} else if (secondType > 0) {
			board[emptyCell[0]][emptyCell[1]] = secondTypeValue;
			secondType--;
		} else if (thirdType > 0) {
			board[emptyCell[0]][emptyCell[1]] = thirdTypeValue;
			thirdType--;
		}
		foodAmount--;
	}
}

function addPacManToBoard(){
	emptyCell = findRandomEmptyCell();
	board[emptyCell[0]][emptyCell[1]] = rightMove;
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	pacX = shape.i;
	pacY = shape.j;
}

function initBoard() {
	board = new Array();
	for(var i = 0; i < boardSize; i++) {
		board[i] = new Array();
		for(var j = 0; j < boardSize; j++) {
			board[i][j] = 0;
		}
	}
}

function pacManMove(x, y){
	return board[x][y] === rightMove || board[x][y] === leftMove || board[x][y] === upMove || board[x][y] === downMove;
}

function isScore(){
	return board[shape.i][shape.j] == 21 || board[shape.i][shape.j] == 22 || board[shape.i][shape.j] == 23;
}

function addScore() {
	if (board[shape.i][shape.j] == 21) {
		score += 5;
	} else if (board[shape.i][shape.j] == 22) {
		score += 15;
	} else if (board[shape.i][shape.j] == 23) {
		score += 25;
	}
	remaningFood--;
}

function initRandomReward(){
	emptyCell = findRandomEmptyCell();
	rewardX = emptyCell[0];
	rewardY = emptyCell[1];
}

function moveReward() {
	freeSpaces = getAllAvaliablePlaceRward(rewardX, rewardY);
	if (freeSpaces.length > 0) {
		var randPick = Math.floor(Math.random() * freeSpaces.length);
		rewardX = freeSpaces[randPick][0];
		rewardY = freeSpaces[randPick][1];
	}
}

function getAllAvaliablePlaceRward(x, y) {
	var freeSpaces = new Array();
	if (board[x + 1][y] != 4) {
		freeSpaces.push([x + 1, y])
	}
	if (board[x][y + 1] != 4) {
		freeSpaces.push([x, y + 1])
	}
	if (board[x - 1][y] != 4) {
		freeSpaces.push([x - 1, y])
	}
	if (board[x][y - 1] != 4) {
		freeSpaces.push([x, y - 1])
	}
	return freeSpaces;
}

function reStartAfterEaten() {
	board[shape.i][shape.j] = 0;
	addPacManToBoard();
	initMonsters();
}

function addToBoardInEmptyCell(addToBoardValue) {
	emptyCell = findRandomEmptyCell();
	board[emptyCell[0]][emptyCell[1]] = addToBoardValue;
}

function loadImages(){
	wallImg = new Image();
	wallImg.src = "files\\wall.png";

	greenMonsterPicture = new Image();
	greenMonsterPicture.src = "files\\monsterGREEN.png";
	blueMonsterPicture = new Image();
	blueMonsterPicture.src = "files\\monsterBLUE.png";
	redMonsterPicture = new Image();
	redMonsterPicture.src = "files\\monsterRED.png";

	strawberryPicture = new Image();
	strawberryPicture.src = "files\\strawberry.png";
	clockPicture = new Image();
	clockPicture.src = "files\\clock.png";
	up1Picture = new Image();
	up1Picture.src = "files\\1up.png";
}

function updateKey(key){
	$(document).keydown(function(event){
		if (key === "up") {
			upkey = "Key" + String.fromCharCode(event.keyCode);
			document.getElementById("setUpKey").value = upkey;
			$(document).unbind();
		} else if (key === "down") {
			downkey = "Key" + String.fromCharCode(event.keyCode);
			document.getElementById("setDownKey").value = downkey;
			$(document).unbind();
		} else if (key === "right") {
			rightkey = "Key" + String.fromCharCode(event.keyCode);
			document.getElementById("setRightKey").value = rightkey;
			$(document).unbind();
		} else if (key === "left") {
			leftkey = "Key" + String.fromCharCode(event.keyCode);
			document.getElementById("setLeftKey").value = leftkey;
			$(document).unbind();
		}
	}
	);
}
