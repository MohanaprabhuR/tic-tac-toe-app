import { useState } from "react";
import "./Board.css";
const Board = () => {
  const [matrix, setMatrix] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [char, setChar] = useState("x");
  const [winner, setWinner] = useState("");
  const [count, setCount] = useState(1);

  const getBgColor = (value) => {
    if (value === "x") {
      return "yellow";
    }
    if (value === "o") {
      return "orange";
    }
    return "";
  };

  const reset = () => {
    setMatrix([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setWinner("");
  };

  const checkWinner = () => {
    //check row winner
    if (
      matrix[0][0] &&
      matrix[0][0] === matrix[0][1] &&
      matrix[0][0] === matrix[0][2]
    ) {
      setWinner(matrix[0][0] + " is the winner");
    }
    if (
      matrix[1][0] &&
      matrix[1][0] === matrix[1][1] &&
      matrix[1][0] === matrix[1][2]
    ) {
      setWinner(matrix[1][0] + " is the winner");
    }
    if (
      matrix[2][0] &&
      matrix[2][0] === matrix[2][1] &&
      matrix[2][0] === matrix[2][2]
    ) {
      setWinner(matrix[2][0] + " is the winner");
    }

    //check column winner
    if (
      matrix[0][0] &&
      matrix[0][0] === matrix[1][0] &&
      matrix[0][0] === matrix[2][0]
    ) {
      setWinner(matrix[2][0] + " is the winner");
    }
    if (
      matrix[0][1] &&
      matrix[0][1] === matrix[1][1] &&
      matrix[1][1] === matrix[2][1]
    ) {
      setWinner(matrix[2][1] + " is the winner");
    }
    if (
      matrix[0][2] &&
      matrix[0][2] === matrix[1][2] &&
      matrix[1][2] === matrix[2][2]
    ) {
      setWinner(matrix[2][2] + " is the winner");
    }

    //check dignal winner
    if (
      matrix[0][0] &&
      matrix[0][0] === matrix[1][1] &&
      matrix[1][1] === matrix[2][2]
    ) {
      setWinner(matrix[2][2] + " is the winner");
    }
    if (
      matrix[0][2] &&
      matrix[0][2] === matrix[1][1] &&
      matrix[1][1] === matrix[2][0]
    ) {
      setWinner(matrix[2][0] + " is the winner");
    }

    if (count === 9) {
      setWinner("The Match has been drawn");
    }
  };

  const handleClick = (r, c) => {
    if (matrix[r][c]) return;
    const temMatrix = [...matrix];
    temMatrix[r][c] = char;
    setMatrix(temMatrix);
    setChar(char === "x" ? "o" : "x");
    setCount(count + 1);
    checkWinner();
  };
  return (
    <div className="bord-conatiner">
      {!winner && <p className="character">{char} turn now</p>}
      <p className="character">{winner}</p>
      {winner ||
        matrix.map((row, rIndex) => (
          <div className="row">
            {row.map((cell, cIndex) => (
              <div
                className={`cell ${getBgColor(matrix[rIndex][cIndex])}`}
                onClick={() => handleClick(rIndex, cIndex)}
              >
                {matrix[rIndex][cIndex]}
              </div>
            ))}
          </div>
        ))}
      <div className="reset-button">
        <button onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
};

export default Board;
