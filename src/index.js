let cell = document.getElementsByClassName("cell");
let reset = document.getElementById("reset");
var message = document.getElementById("message");
let pvpBtn = document.getElementById("pvp");
let player = "X";
let stepCount = 0;
let winCombination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],

  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],

  [1, 5, 9],
  [3, 5, 7]
];
let dataX = [];
let data0 = [];
for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", currentStep);
}
function currentStep() {
  let num = +this.getAttribute("data-ceil");
  console.log(num);
  if (!this.textContent) {
    this.innerText = player;
    if (player === "X") {
      dataX.push(num);
    } else {
      data0.push(num);
    }
    if (
      (dataX.length > 2 || data0.length > 2) &&
      (chekWinner(dataX, num) || chekWinner(data0, num))
    ) {
      for (let i = 0; i < cell.length; i++) {
        cell[i].removeEventListener("click", currentStep);
      }
      return (message.innerText = "Победил " + player);
    }
    changePlayer();
    stepCount++;
    if (stepCount === 9) {
      message.innerText = "Ничья!";
    } else {
      message.innerText = "Ходит игрок " + player;
    }
  }
}
function changePlayer() {
  if (player === "X") {
    player = "O";
  } else {
    player = "X";
  }
}

reset.addEventListener("click", function() {
  for (let i = 0; i < cell.length; i++) {
    cell[i].innerText = "";
  }
  message.innerText = "";
  data0 = [];
  dataX = [];
  player = "X";
  stepCount = 0;
  for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", currentStep);
  }
});

function chekWinner(arr, num) {
  for (let i = 0; i < winCombination.length; i++) {
    let winLine = winCombination[i];
    let count = 0;
    if (winLine.indexOf(num) !== -1) {
      for (let i = 0; i < winLine.length; i++) {
        if (arr.indexOf(winLine[i]) !== -1) {
          count++;
          if (count === 3) {
            return true;
          }
        }
      }
      count = 0;
    }
  }
}
pvpBtn.addEventListener("click", function() {
  message.innerText = "Ходит игрок " + player;
});
