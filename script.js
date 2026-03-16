const board = document.getElementById("chessboard");
const effect = document.getElementById("effect");
let selectedPiece = null;
const pieces = {
  'r':'♜','n':'♞','b':'♝','q':'♛','k':'♚','p':'♟',
  'R':'♖','N':'♘','B':'♗','Q':'♕','K':'♔','P':'♙'
};

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

let playerTurn = 'white';

function drawBoard(){
  board.innerHTML = '';
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      let square = document.createElement('div');
      square.classList.add('square');
      square.classList.add((i+j)%2===0?'white':'black');
      square.dataset.row=i;
      square.dataset.col=j;
      square.innerHTML = pieces[boardState[i][j]] || '';
      square.addEventListener('click', onSquareClick);
      if(selectedPiece && selectedPiece.row==i && selectedPiece.col==j) square.classList.add('selected');
      board.appendChild(square);
    }
  }
}

function createEffect(x,y){
  let e = document.createElement('div');
  e.classList.add('explosion');
  e.style.left = (y*60)+'px';
  e.style.top = (x*60)+'px';
  effect.appendChild(e);
  setTimeout(()=>effect.removeChild(e),500);
}

function onSquareClick(e){
  let row=parseInt(this.dataset.row);
  let col=parseInt(this.dataset.col);

  if(playerTurn!=='white') return;

  if(selectedPiece){
    if(boardState[row][col] !== '') createEffect(row,col); // Capture effect
    boardState[row][col] = boardState[selectedPiece.row][selectedPiece.col];
    boardState[selectedPiece.row][selectedPiece.col] = '';
    selectedPiece=null;
    drawBoard();
    playerTurn='black';
    setTimeout(botMove,500);
  } else if(boardState[row][col] && boardState[row][col]===boardState[row][col].toUpperCase()){
    selectedPiece={row,col};
    drawBoard();
  }
}

// Simple bot: random move for black
function botMove(){
  let blackPieces=[];
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(boardState[i][j] && boardState[i][j]===boardState[i][j].toLowerCase())
        blackPieces.push({row:i,col:j});
    }
  }
  if(blackPieces.length===0){playerTurn='white'; return;}
  let piece=blackPieces[Math.floor(Math.random()*blackPieces.length)];

  let moves=[];
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(boardState[i][j]==='') moves.push({row:i,col:j});
    }
  }
  if(moves.length===0){playerTurn='white'; return;}
  let target=moves[Math.floor(Math.random()*moves.length)];

  if(boardState[target.row][target.col] !== '') createEffect(target.row,target.col); // bot capture effect
  boardState[target.row][target.col] = boardState[piece.row][piece.col];
  boardState[piece.row][piece.col] = '';
  drawBoard();
  playerTurn='white';
}

drawBoard();
