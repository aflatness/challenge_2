import { useState, useEffect } from 'react';
import './App.css';
import bombMaker from './controllers/bombMaker';
import { checkHorz, checkVert, checkMajorDia, checkMinorDia } from './controllers/checkAround';
import clickBorderedElements from './controllers/clickBordered';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [matrix, setMatrix] = useState([]);
  const [mode, setMode] = useState('clear');

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
    if (mode === 'clear') {
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
      } else {
        clickBorderedElements(target.id.split(', '));
      }
      return;
    }
    const classes = Array.from(target.classList);
    if (classes.includes('flag')) { target.classList.remove('flag') }
    else { target.classList.add('flag')};
  }

  const resetGame = () => {
    setMatrix(bombMaker());
    setGameOver(false);
    Array.from(document.getElementsByClassName('block')).forEach(block => block.disabled = false);
    Array.from(document.getElementsByClassName('true')).forEach(bomb => bomb.classList.remove('revealBomb'));
  }

  const changeMode = () => {
    mode === 'clear' ? setMode('flags') : setMode('clear');
  }

  return (
    <div className="App">
      {gameOver ? <div>Game Over! <button onClick={resetGame} >Reset</button></div> : <div>{mode} <button onClick={changeMode} >Switch mode</button></div>}
      <div>
        {matrix.map((row, i) => <div>
          {row.map((space, j) => <button onClick={checkBomb} className={`${space} block`} id={`${i}, ${j}`}></button>)}
        </div>)}
      </div>
    </div>
  );
}

export default App;
