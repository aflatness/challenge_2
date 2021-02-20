import { useState, useEffect } from 'react';
import './App.css';
import bombMaker from './controllers/bombMaker';
import { checkHorz, checkVert, checkMajorDia, checkMinorDia } from './controllers/checkAround';
import clickBorderedElements from './controllers/clickBordered';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [matrix, setMatrix] = useState([]);
  const [mode, setMode] = useState('clear');
  const [flags, setFlags] = useState(99);
  const [won, setWon] = useState(false);
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    setMatrix(bombMaker());
  }, []);

  const checkAround = ([r, c]) => {
    [r, c] = [Number(r), Number(c)];
    const bombs = checkHorz(matrix, r, c) + checkVert(matrix, r, c) + checkMajorDia(matrix, r, c) + checkMinorDia(matrix, r, c);
    return bombs;
  }

  const checkBomb = ({ target }) => {
    if (mode === 'clear') {
      if (Array.from(target.classList).includes('flag')) {
        return;
      }
      target.disabled = true;
      if (Array.from(target.classList).includes('true')) {
        Array.from(document.getElementsByClassName('block')).forEach(block => block.disabled = true);
        Array.from(document.getElementsByClassName('true')).forEach(bomb => {
          bomb.classList.remove('flag');
          bomb.classList.add('revealBomb')
        });
        setGameOver(true);
        return;
      }
      const number = checkAround(target.id.split(', '));
      if (number) {
        target.classList.add(number.toString());
        setClicked(clicked + 1);
      } else {
        target.classList.add('clicked');
        setClicked(clicked + 1);
        clickBorderedElements(target.id.split(', '));
      }
      if (clicked === 477) { setWon(true)}
      return;
    }
    const classes = Array.from(target.classList);
    if (flags === 0) {
      alert('No more flags left!');
      return;
    }
    if (classes.includes('flag')) {
      target.classList.remove('flag')
      setFlags(flags + 1);
    }
    else {
      target.classList.add('flag')
      setFlags(flags - 1)
    };
  }

  const resetGame = () => {
    setMatrix(bombMaker());
    setGameOver(false);
    setFlags(99);
    setMode('clear');

    Array.from(document.getElementsByClassName('block')).forEach(block => {
      block.disabled = false
      block.classList = ['block']
    });
    // Array.from(document.getElementsByClassName('true')).forEach(bomb => bomb.classList.remove('revealBomb'));
  }

  const changeMode = () => {
    mode === 'clear' ? setMode('Flags') : setMode('clear');
  }

  return (
    <div className="App">
      {gameOver ? <div>Game Over! <button onClick={resetGame} >Reset</button></div> : <div>{mode} <button onClick={changeMode} >Switch mode</button></div>}
      {!won ? `Flags left: ${flags}` : <div>You Won! <button onClick={resetGame} >Reset</button></div>}
      <br/><br/>
      <div>
        {matrix.map((row, i) => <div>
          {row.map((space, j) => <button onClick={checkBomb} className={`${space} block`} id={`${i}, ${j}`}></button>)}
        </div>)}
      </div>
    </div>
  );
}

export default App;
