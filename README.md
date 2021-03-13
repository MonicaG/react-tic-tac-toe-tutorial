# About

These are my solutions to the challenges provided at the end of [React's Tic-Tac-Toe Tutorial](https://reactjs.org/tutorial/tutorial.html). I did each challenge as a separate commit. At the time of writing the challenges are:

- [x] Display the location for each move in the format (col, row) in the move history list. 
  - [Code Changes](https://github.com/MonicaG/react-tic-tac-toe-tutorial/commit/cd0ed792b0650e952188871ab73dd59be02e0d0c)
- [x] Bold the currently selected item in the move list. 
  - [Code Changes](https://github.com/MonicaG/react-tic-tac-toe-tutorial/commit/b7143be9e43d5f0ff3308aef9c170cbed04889ad)
- [x] Rewrite Board to use two loops to make the squares instead of hardcoding them. 
  - [Code Changes](https://github.com/MonicaG/react-tic-tac-toe-tutorial/commit/35bc0ac4641a4aea4f9f1e4564950fad511cad25)
  - I thought about creating the nested loops within the render method. In the end I decided to break the inner loop out into its own method. 
- [x] Add a toggle button that lets you sort the moves in either ascending or descending order. 
  - [Code Changes](https://github.com/MonicaG/react-tic-tac-toe-tutorial/commit/3559931e2b71030429ed152ef91bab66de23eb43)
- [x] When someone wins, highlight the three squares that caused the win. 
  - [Code Changes](https://github.com/MonicaG/react-tic-tac-toe-tutorial/commit/cf0ed492d0715bb03405fdd59ca2ea392b59f0ea)
  - I used [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) for returning the result from `function calculateWinner(squares)` . This style seems to be used with [React Hooks](https://reactjs.org/docs/hooks-state.html#tip-what-do-square-brackets-mean), so I tried it out here.
- [x] When no one wins, display a message about the result being a draw. 
-  [Code Changes](https://github.com/MonicaG/react-tic-tac-toe-tutorial/commit/d802afa16026de077c9b7937f0219c8359ff30b7)
-  In the previous code, the first item returned by the `function calculateWinner(squares)` was a 'X' or 'O' if there was a winner. A value in this spot indicated the game was over. A null value means a winner has not been found and play can continue. I continued this strategy and introduced 'D' (for draw) as another value that will end the game. A 'D' is returned if all spots in the array have been filled (no nulls) but a winner was not found.




