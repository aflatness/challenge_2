import logo from './logo.svg';
import './App.css';
import bombMaker from './bombMaker.js';
import { useState, useEffect } from 'react';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    setMatrix(bombMaker());
  }, []);

  const checkBomb = ({ target }) => {
    console.log('space clicked')
    if (Array.from(target.classList).includes('true')) {
      Array.from(document.getElementsByClassName('block')).forEach(block => block.disabled = true);
      Array.from(document.getElementsByClassName('true')).forEach(bomb => bomb.classList.add('revealBomb'));
      setGameOver(true);
    }
  }

  const resetGame = () => {
    setMatrix(bombMaker());
    setGameOver(false);
    Array.from(document.getElementsByClassName('block')).forEach(block => block.disabled = false);
    Array.from(document.getElementsByClassName('true')).forEach(bomb => bomb.classList.remove('revealBomb'));
  }

  return (
    <div className="App">
      {gameOver ? <div>Game Over! <button onClick={resetGame} >Reset</button></div> : ''}
      <div>
        {matrix.map(row => <div>
          {row.map(space => <button onClick={checkBomb} className={`${space} block`}></button>)}
        </div>)}
      </div>
    </div>
  );
}

export default App;
