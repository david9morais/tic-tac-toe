import React from 'react';
import Board from "./Board";

export default class Game extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                {squares: Array(9).fill(null)}
            ]
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);

        if(winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext? 'X': 'O';

        this.setState({
            history: history.concat({
                squares: squares,
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        }); 

    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to #' + move : 'Start the Game';

            return (
                <li key={move}>
                    <button onClick={() => {this.jumpTo(move)}}>
                        {desc}
                    </button>
                </li>
            );
        });

        let status = winner? 'Winner is ' + winner: 'Next Player is ' + (this.state.xIsNext? 'X':'O');

        return (
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)} squares={current.squares}></Board>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }

}

function calculateWinner(squares) {
    const winnerLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0;i < winnerLines.length; i++){
        const [a,b,c] = winnerLines[i];
        console.log(a,b,c);

        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}