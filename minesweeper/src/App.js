import { useState, useEffect } from 'react';
import './App.css';
import bombMaker from './controllers/bombMaker';
import { checkHorz, checkVert, checkMajorDia, checkMinorDia } from './controllers/checkAround';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    setMatrix(bombMaker());
  }, []);

  const checkAround = ([r, c]) => {
    [r, c] = [Number(r), Number(c)];
    const bombs = checkHorz(matrix, r, c) + checkVert(matrix, r, c) + checkMajorDia(matrix, r, c) + checkMinorDia(matrix, r, c);
    return bombs;
  }

  const checkBomb = ({ target }) => {
    console.log('space clicked')
    if (Array.from(target.classList).includes('true')) {
      Array.from(document.getElementsByClassName('block')).forEach(block => block.disabled = true);
      Array.from(document.getElementsByClassName('true')).forEach(bomb => bomb.classList.add('revealBomb'));
      setGameOver(true);
      return;
    }
    const number = checkAround(target.id.split(', '));
    if (number) {
      target.classList.add(number.toString());
      console.log(target.classList)
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
        {matrix.map((row, i) => <div>
          {row.map((space, j) => <button onClick={checkBomb} className={`${space} block`} id={`${i}, ${j}`}></button>)}
        </div>)}
      </div>
    </div>
  );
}

export default App;
