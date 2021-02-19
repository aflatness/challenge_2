import React, { useState, useEffect } from 'react';


const App = () => {
  const [frame, setFrame] = useState(1);
  const [roll, setRoll] = useState(1);
  const [score, setScore] = useState(0);
  const [frameScore, setFrameScore] = useState(0);
  const [prevScores, setPrevScores] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [pins, setPins] = useState(Array(11).fill(''));

  const nextFrame = () => {
    setRoll(1);
    setFrame(frame + 1);
    setPins(Array(11).fill(''));
    setFrameScore(0);
  }

  const submitScore = () => {
    if (score === 10) {
      setTotalScore(totalScore + (prevScores[0] || 0) + (prevScores[1] || 0));
      setPrevScores([prevScores[1], frameScore]);
      nextFrame();
    } else if (roll === 2) {
      setFrameScore(frameScore + score);
      if (frameScore + score === 10) {
        setPrevScores([prevScores[1], frameScore + score]);
      } else {
        setTotalScore(totalScore + prevScores[1] + score);
        setPrevScores([prevScores[1], score]);
      }
      nextFrame();
    } else {
      setPins(Array(11 - score).fill(''));
      setFrameScore(frameScore + score);
      prevScores[1] === 10 ? setTotalScore(totalScore + 10 + score) : null;
      setPrevScores([prevScores[1], score]);
      setRoll(2);
    }
  }

  const reset = () => {
    setFrame(1);
    setRoll(1);
    setScore([]);
    setPrevScores([]);
    setTotalScore(0);
    setPins(Array(11).fill(''));
  }

  console.log(frame, score, prevScores, totalScore)
  return frame <= 10 ? ( <div>
      <div>Frame: {frame}</div>
      <div>Total score: {totalScore}</div>
      <br />
      <div>Select a score for your bowl: {''}
        <select value={score} onChange={(e) => setScore(Number(e.target.value))}>
          {pins.map((v, i) => <option key={i}>{i}</option>)}
        </select> {''}
        <button onClick={submitScore}>Roll!</button>
      </div>
    </div> )
    : (
    <div>
      <h2>You bowled a {totalScore}</h2>
      <button onClick={reset}>New game</button>
    </div> )
}

export default App;