import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=6, ncols=6, chanceLightStartsOn=.50 }) {
  const [board, setBoard] = useState(createBoard());

  /** Iterate through board and randomly flip boxes and the boxes around them
   * This ensures that the game is solvable!
  */
  useEffect(() => {
    if(board) {
      for(let y = 0; y < nrows; y++) {
        for(let x = 0; x < ncols; x++) {
          if(Math.random() < chanceLightStartsOn) {
            flipCellsAround(`${y}-${x}`)
          }
        }
      }
    }
  }, []);

  /** create a board nrows high/ncols wide, each cell starts off out */
  function createBoard() {
    let initialBoard = [];
    for(let y = 0; y < nrows; y++) {
      let row = [];
      for(let x = 0; x < ncols; x++) {
        row.push(0);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every(row => row.every(bool => !bool));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      // if this coord is actually on board, flip it.
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row])

      flipCell(y, x, boardCopy)
      flipCell(y, x+1, boardCopy)
      flipCell(y, x-1, boardCopy)
      flipCell(y+1, x, boardCopy)
      flipCell(y-1, x, boardCopy)

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  function showWinner() {
    return (
      <div>You Won!!!</div>
    )
  }

  // make table board
  function mapLightsToBoard() {
      return board.map((row, y) => {
        return row.map((cell, x) => {
          return <Cell
              key={`${y}-${x}`}
              isLit={board[y][x]}
              flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}/>
        })
    });
  }
  //if winner return hasWon or else continue.
  return (!hasWon() ?
      <div style={{
      display: `grid`,
      gridTemplateColumns: `repeat(${ncols}, 100px)`,
      gridTemplateRows: `repeat(${nrows}, 100px)`}}>
      {mapLightsToBoard()}</div>
    :
    showWinner()
  )
}



export default Board;
