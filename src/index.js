import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        location: 0,
      }],
      //the trailing comma is a coding convention for cleaner git commits
      //See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1];
    /*
    Create a copy of the squares array and manipulate it rather than the original array. This is done because it 
    is easier to detect changes between immutable objects, rather than checking one mutating object to see if it has 
    changed. This makes it easier for React to deteremine if a component needs to be re-rendered.
    */
    const squares = current.squares.slice();

    //don't set the state if the game is won or the square is already occupied.
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      //concat does not mutate the array
      history: history.concat([{
        squares: squares,
        location: i,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      const location = move ? getLocation(step.location) : '';
      const applyStyle = move === this.state.stepNumber 
      return (
        <li key={move}>
          <button className={applyStyle ? 'current-move' : null} onClick={() => this.jumpTo(move)}>{desc}</button> {location}
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getLocation(arrayIndex) {
  const gridSize = 3;
  const offset = 1; //Start grid columns & rows at 1 instead of 0 for easier reading
  const col = offset + arrayIndex % gridSize;
  const row = offset + Math.floor(arrayIndex / gridSize);
  return `[${col},${row}]`
}

