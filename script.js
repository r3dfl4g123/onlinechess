const board = document.getElementById("chessboard");
let selectedPiece = null;

// Unicode pieces
const pieces = {
    'r':'♜', 'n':'♞', 'b':'♝', 'q':'♛', 'k':'♚', 'p':'♟',
    'R':'♖', 'N':'♘', 'B':'♗', 'Q':'♕', 'K':'♔', 'P':'♙'
};

// Initial Board Setup
let boardState = [
['r','n','b','q','k','b','n','r'],
['p','p','p','p','p','p','p','p'],
['','','','','','','',''],
['','','','','','','',''],
['','','','','','','',''],
['','','','','','','',''],
['P','P','P','P','P','P','P','P'],
['R','N','B','Q','K','B','N','R']
];

function drawBoard(){
    board.innerHTML = '';
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let square = document.createElement('div');
            square.classList.add('square');
            square.classList.add( (i+j)%2==0 ? 'white' : 'black' );
            square.dataset.row = i;
            square.dataset.col = j;
            square.innerHTML = pieces[boardState[i][j]] || '';
            square.addEventListener('click', onSquareClick);
            board.appendChild(square);
        }
    }
}

function onSquareClick(e){
    let row = parseInt(this.dataset.row);
    let col = parseInt(this.dataset.col);
    
    if(selectedPiece){
        // Move piece
        boardState[row][col] = boardState[selectedPiece.row][selectedPiece.col];
        boardState[selectedPiece.row][selectedPiece.col] = '';
        selectedPiece = null;
        drawBoard();
    } else if(boardState[row][col] !== ''){
        // Select piece
        selectedPiece = {row,col};
    }
}

drawBoard();
