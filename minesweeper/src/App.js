import { useState, useEffect } from 'react';
import './App.css';
import bombMaker from './controllers/bombMaker';
import { checkHorz, checkVert, checkMajorDia, checkMinorDia } from './controllers/checkAround';
import clickBorderedElements from './controllers/clickBordered';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [matrix, setMatrix] = useState([]);
  const [mode, setMode] = useState('Clear');
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
    if (mode === 'Clear') {
      if (Array.from(target.classList).includes('flag') || target.disabled) {
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
        clickBorderedElements(target.id.split(', '), setClicked, clicked);
      }
      if (clicked === 477) { setWon(true)}
      return;
    }
    const classes = Array.from(target.classList);
    if (classes.includes('flag')) {
      target.classList.remove('flag')
      setFlags(flags + 1);
    }
    else {
      if (flags === 0) {
        alert('No more flags left!');
        return;
      }
      target.classList.add('flag')
      setFlags(flags - 1)
    };
  }

  const resetGame = () => {
    Array.from(document.getElementsByClassName('block')).forEach(block => {
      block.disabled = false
      block.classList = ['block'];
    });
    setMatrix(bombMaker());
    setGameOver(false);
    setFlags(99);
    setMode('Clear');

    // Array.from(document.getElementsByClassName('true')).forEach(bomb => bomb.classList.remove('revealBomb'));
  }

  const changeMode = () => {
    mode === 'Clear' ? setMode('Flags') : setMode('Clear');
  }

  return (
    <div className="App">
      <div className='title' >FireworkSweeper!</div>
      {gameOver ? <div className='mode' >Game Over! <button onClick={resetGame} >Reset</button></div> : <div className='mode'>{mode} <button onClick={changeMode} >Switch mode</button></div>}
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
