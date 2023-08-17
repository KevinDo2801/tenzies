import React, { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import CountUpTimer from "./CountUpTimer";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollNum, setRollNum] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  useEffect(() => {
    if (resetTimer) {
      setResetTimer(false);
    }
  }, [resetTimer]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
      setRollNum((prevRollNum) => prevRollNum + 1);
    }
    if (tenzies || gameOver) {
      setTenzies(false);
      setDice(allNewDice());
      setRollNum(0);
      setGameOver(false);
      setResetTimer(true);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function handleGameOver() {
    setGameOver(true);
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <CountUpTimer
        onGameOver={handleGameOver}
        tenzies={tenzies}
        reset={resetTimer}
      />

      <div className="dice-container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>

      <button className="roll-dice" onClick={rollDice}>
        {gameOver ? "Restart" : tenzies ? "New Game" : "Roll"}
      </button>
      <h3>Attempts: {rollNum}</h3>
    </main>
  );
}
