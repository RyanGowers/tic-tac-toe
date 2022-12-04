var tiles = ["X", "O"];
var players = [];
var turn = 0;
var totals = [];
var winNum = [14, 112, 146, 168, 292, 546, 584, 896];
var gameOver;
players[0] = prompt("Player 1");
players[1] = prompt("Player 2");

function start() {
  var counter = 2;
  var innerDivs = "";
  for (i = 1; i <= 3; i++) {
    innerDivs += '<div id="row-' + i + '">';

    for (j = 1; j <= 3; j++) {
      innerDivs += '<div onclick="startGame(this, ' + counter + ')"></div>';
      counter *= 2;
    }

    innerDivs += "</div>";
  }
  document.getElementById("gameboard").innerHTML = innerDivs;
  totals = [0, 0];
  gameOver = false;
  document.getElementById("game-message").innerText =
    "It's " + players[turn] + "'s turn";
}

function startGame(clickedDiv, divNum) {
  if (!isWin()) {
    clickedDiv.innerText = tiles[turn];

    totals[turn] += divNum;
    if (isWin()) {
      document.getElementById("game-message").innerText =
        players[turn] + " Wins!";
    } else if (gameOver) {
      document.getElementById("game-message").innerText = "Tie!";
    } else {
      if (turn) turn = 0;
      else turn = 1;

      clickedDiv.attributes["0"].nodeValue = "";

      document.getElementById("game-message").innerText =
        "It's " + players[turn] + "'s turn";
    }
  }
}

function isWin() {
  for (i = 0; i < winNum.length; i++) {
    if ((totals[turn] & winNum[i]) == winNum[i]) {
      gameOver = true;
      return true;
    }

    if (totals[0] + totals[1] == 1022) {
      gameOver = true;
    }
  }
  return false;
}
