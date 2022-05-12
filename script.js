// factory function I can reuse for the game
const playersFactory = (name, marker) => {
    return { name, marker };
};
console.log(playersFactory);

const gameBoard = (() => {
    const board = ['','','','','','','','','']
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("replayBtn");
    const text = document.querySelector('.text');
    const squares = document.querySelectorAll('.cell')

    squares.forEach((button, index) => button.addEventListener('click', () => {
        board[index] = gameStart.active.marker;
        button.textContent += gameStart.active.marker;
        button.style.pointerEvents = 'none';
        gameStart.cellsLeft -= 1;
        gameStart.checkWin();
        if (gameStart.winner == false) {
            if (gameStart.cellsLeft > 0) {
                gameStart.swapPlayer();
                gameStart.displayPlayer();
            } else if (gameStart.cellsLeft == 0) {
                (gameStart.winner == false)
                modal.style.display = "block";
                text.textContent += `it's a tie!`;
                console.log(text.textContent);                
            }
        } else{
            (gameStart.winner == true) 
                modal.style.display = "block";
                text.textContent += `${gameStart.active.name} wins`;
                console.log(text.textContent);

        }
    }));
    
    btn.addEventListener('click', () => {
        modal.style.display = "none";
        gameStart.cellsLeft = 9;
        gameStart.active = gameStart.playerOne;
        gameStart.winner = false;
        text.textContent = '';
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        squares.forEach((button) => {
            button.textContent = '';
            button.style.pointerEvents = '';
        });
    });

    return {
        board,
    }
})();


const gameStart = (() => {
    const playerOne = playersFactory('player one', 'X');
    const playerTwo = playersFactory('player two', 'O');
    const display = document.querySelector('.display');

    let active = playerOne;

    function swapPlayer() {
        this.active === playerOne ? this.active = playerTwo : this.active = playerOne;
        console.log(active);
    };

    function displayPlayer() {
        this.active === playerOne ? display.textContent = `${playerOne.name}, go!` : display.textContent = `${playerTwo.name}, go!`;
    };

    let cellsLeft = 9;
    let winner = false
    let winCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function checkWin() {
        winCombo.forEach((item) => {
            if (gameBoard.board[item[0]] === this.active.marker && gameBoard.board[item[1]] === this.active.marker && gameBoard.board[item[2]] === this.active.marker) {
                this.winner = true
            }
        });
    };

    return {
        active,
        swapPlayer,
        displayPlayer,
        playerOne,
        playerTwo,
        cellsLeft,
        winner,
        checkWin,    
    }
})();
