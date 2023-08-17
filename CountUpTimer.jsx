import React, { useState, useEffect } from "react";

const CountUpTimer = (props) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestTime, setBestTime] = useState(
    JSON.parse(localStorage.getItem("bestTime") || 0)
  );

  useEffect(() => {
    let timerId;

    if (displayMinutes === 9 && displaySeconds > 0) {
      setGameOver(true);
      props.onGameOver();
    }

    if (props.tenzies) {
      console.log("0");
      if (bestTime === 0 || elapsedTime < bestTime) {
        setBestTime(elapsedTime);
        localStorage.setItem("bestTime", JSON.stringify(elapsedTime));
      }
      clearInterval(timerId);
    } else {
      timerId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [elapsedTime, props.tenzies]);

  useEffect(() => {
    if (props.reset) {
      setElapsedTime(0);
      setGameOver(false);
    }
  }, [props.reset]);

  const displayMinutes = Math.floor(elapsedTime / 60);
  const displaySeconds = elapsedTime % 60;

  const displayMin = Math.floor(bestTime / 60);
  const displaySec = bestTime % 60;

  return (
    <div>
      {gameOver ? (
        <p className="gameOver">Game Over</p>
      ) : (
        <p className="timer">
          ⏱{displayMinutes.toString().padStart(2, "0")}:
          {displaySeconds.toString().padStart(2, "0")}
        </p>
      )}
      {bestTime !== 0 && (
        <h3 className="best-time">
          🏆 Best Time: {displayMin.toString().padStart(2, "0")}:
          {displaySec.toString().padStart(2, "0")}
        </h3>
      )}
    </div>
  );
};

export default CountUpTimer;
