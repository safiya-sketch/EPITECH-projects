export function Morpion() {
  let playerOne = "Player 1";
  let playerTwo = "Player 2";
  let currentPlayer = playerOne;
  let winnerDisplay = document.querySelector(".win-display");
  let winner = "";
  let scorePlayerOne = document.getElementById("playerOne");
  let scorePlayerTwo = document.getElementById("playerTwo");
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.innerHTML !== "" || winner !== "") return;
      let symbol = "";
      if (currentPlayer === playerOne) {
        document.getElementById("currentPlayer").textContent = "Joueur 1";
        symbol = "X";
        cell.innerHTML = symbol;
        currentPlayer = playerTwo;
      } else {
        document.getElementById("currentPlayer").textContent = "Joueur 2";
        symbol = "O";
        cell.innerHTML = symbol;
        currentPlayer = playerOne;
      }

      // HORIZONTAL
      if (
        (cells[0].innerHTML === symbol &&
          cells[1].innerHTML === symbol &&
          cells[2].innerHTML === symbol) ||
        (cells[3].innerHTML === symbol &&
          cells[4].innerHTML === symbol &&
          cells[5].innerHTML === symbol) ||
        (cells[6].innerHTML === symbol &&
          cells[7].innerHTML === symbol &&
          cells[8].innerHTML === symbol) ||
        // VERTICAL
        (cells[0].innerHTML === symbol &&
          cells[3].innerHTML === symbol &&
          cells[6].innerHTML === symbol) ||
        (cells[1].innerHTML === symbol &&
          cells[4].innerHTML === symbol &&
          cells[7].innerHTML === symbol) ||
        (cells[2].innerHTML === symbol &&
          cells[5].innerHTML === symbol &&
          cells[8].innerHTML === symbol) ||
        // DIAGONAL
        (cells[0].innerHTML === symbol &&
          cells[4].innerHTML === symbol &&
          cells[8].innerHTML === symbol) ||
        (cells[2].innerHTML === symbol &&
          cells[4].innerHTML === symbol &&
          cells[6].innerHTML === symbol)
      ) {
        winner = symbol;
        winnerDisplay.textContent = `${
          symbol === "X" ? "Joueur 1" : "Joueur 2"
        } a gagné !`;

        document.getElementById("grid").classList.add("won");

        if (symbol === "X") {
          scorePlayerOne.textContent = parseInt(scorePlayerOne.textContent) + 1;
        } else {
          scorePlayerTwo.textContent = parseInt(scorePlayerTwo.textContent) + 1;
        }
      }
    });
  });

  document.querySelector("button").addEventListener("click", () => {
    cells.forEach((cell) => (cell.innerHTML = ""));
    winner = "";
    winnerDisplay.textContent = "";
    currentPlayer = playerOne;
    document.getElementById("currentPlayer").textContent = "Joueur 1";
    document.getElementById("grid").classList.remove("won");
  });
}
