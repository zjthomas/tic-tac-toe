const readline = require('readline');

const rl =  readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ticTacToe = {
  game: {
    tr: '_',
    tm: '_',
    tl: '_',
    mr: '_',
    mm: '_',
    ml: '_',
    br: ' ',
    bm: ' ',
    bl: ' ',
    turn: 'X',
    turnNum: 0,
    over: false,
  },
  makeMove(move) {
    if (this.game[move] === 'X' || this.game[move] === 'O') {
      console.log('Square is Taken');
      this.render();
    } else {
      this.game[move] = this.game.turn;
      this.game.turn = (this.game.turn === 'X' ? 'O' : 'X');
      this.game.turnNum++;
      this.checkWin();
    }
  },

  checkWin() {
    const { tl, tm, tr, ml, mm, mr, bl, bm, br,} = this.game;
    let options = [
      [tl, tm, tr],
      [ml, mm, mr],
      [bl, bm, br],
      [tl, ml, bl],
      [tm, mm, bm],
      [tr, mr, br],
      [tl, mm, br],
      [tr, mm, bl],
    ];

    let winner = false;
    // console.log()
   options.forEach((row) => {
      if ((row[0] === 'X' || row[0] === 'O') && row[0] === row[1] && row[0] === row[2]) {
        console.log(`${row[0]} won!`);
        winner = true;
        this.game.over = true;
        this.render();
      }
    });
    if (!winner) {
      if (this.game.turnNum === 9) {
        console.log('Cats Game');
        this.game.over = true;
        this.render();
      } else {
        this.render();
      }
    } 
  },

  newGame() {
    console.log('New Game')
    this.game = {
      tr: '_',
      tm: '_',
      tl: '_',
      mr: '_',
      mm: '_',
      ml: '_',
      br: ' ',
      bm: ' ',
      bl: ' ',
      turn: 'X',
      turnNum: 0,
      over: false,
    };
    this.render();
  },

  render() {
    const {
      tl,
      tm,
      tr,
      ml,
      mm,
      mr,
      bl,
      bm,
      br,
      turn,
    } = this.game;
    rl.question(`
      ${tl}|${tm}|${tr}
      ${ml}|${mm}|${mr}
      ${bl}|${bm}|${br}\n
      ${turn}'s move
      > `,(move) => {
      moves = ['tl', 'tm', 'tr', 'ml', 'mm', 'mr', 'bl', 'bm', 'br'];
      if (move === 'new') {
        this.newGame();
      } else if (this.game.over) {
        console.log('Game is Over');
        this.render();
      } else if (moves.includes(move)) {
        this.makeMove(move);
      } else {
        console.log('Invalid input please use tl, tm, tr, ml, mm, mr, bl, bm, or br');
        this.render();
      }
    });
  },
};

ticTacToe.render();


