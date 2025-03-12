class Puissance4 {
  constructor() {
    this.playerOne = "Player 1";
    this.playerTwo = "Player 2";
    this.currentPlayer = this.playerOne;
    this.gameOver = false;
    this.rows = 6;
    this.columns = 7;
    this.board = [];
    this.currentColumn = [5, 5, 5, 5, 5, 5, 5];

    window.onload = () => {
      this.setGame();
    };
  }

  setGame() {
    this.board = [];
    this.currentColumn = [5, 5, 5, 5, 5, 5, 5];
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        row.push(" ");
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");
        tile.addEventListener("click", () => this.setPiece(tile));
        document.getElementById("board").append(tile);
      }
      this.board.push(row);
    }
  }

  setPiece(tile) {
    if (this.gameOver) {
      return;
    }
    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = this.currentColumn[c];
    if (r < 0) {
      return;
    }
    this.board[r][c] = this.currentPlayer;
    let tileToUpdate = document.getElementById(
      r.toString() + "-" + c.toString()
    );
    if (this.currentPlayer === this.playerOne) {
      tileToUpdate.classList.add("red-piece");
      this.currentPlayer = this.playerTwo;
    } else {
      tileToUpdate.classList.add("yellow-piece");
      this.currentPlayer = this.playerOne;
    }
    r -= 1;
    this.currentColumn[c] = r;
    this.checkWinner();
  }

  checkWinner() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] !== " ") {
          if (
            this.board[r][c] === this.board[r][c + 1] &&
            this.board[r][c + 1] === this.board[r][c + 2] &&
            this.board[r][c + 1] === this.board[r][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
      for (let c = 0; c < this.columns; c++) {
        for (let r = 0; r < this.rows - 3; r++) {
          if (this.board[r][c] !== " ") {
            if (
              this.board[r][c] === this.board[r + 1][c] &&
              this.board[r + 1][c] === this.board[r + 2][c] &&
              this.board[r + 3][c]
            ) {
              this.setWinner(r, c);
              return;
            }
          }
        }
      }
    }
    for (let r = 0; r < this.rows - 3; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] !== " ") {
          if (
            this.board[r][c] === this.board[r + 1][c + 1] &&
            this.board[r + 1][c + 1] === this.board[r + 2][c + 2] &&
            this.board[r + 2][c + 2] === this.board[r + 3][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }
    for (let r = 3; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] !== " ") {
          if (
            this.board[r][c] === this.board[r - 1][c + 1] &&
            this.board[r - 1][c + 1] === this.board[r - 2][c + 2] &&
            this.board[r - 2][c + 2] === this.board[r - 3][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }
  }

  setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (this.board[r][c] === this.playerOne) {
      winner.innerText = "Player 1 won!";
    } else {
      winner.innerText = "Player 2 won!";
    }
    this.gameOver = true;
  }
}

const game = new Puissance4();
