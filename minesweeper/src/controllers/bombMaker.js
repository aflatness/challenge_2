export default function bombMaker() {
  const matrix = []

  for (let i = 0; i < 16; i++) {
    matrix[i] = [];
    for (let j = 0; j < 37; j++) {
      matrix[i][j] = false;
    }
  }
  const bombs = new Array(99).fill('');

  const findSpot = () => {
    const r = Math.floor(Math.random() * 16);
    const c = Math.floor(Math.random() * 36);
    if (!matrix[r][c]) {
      matrix[r][c] = !matrix[r][c];
      return;
    } else {
      findSpot();
    }
  }

  bombs.forEach(bomb => {
    findSpot();
  })
  return matrix;
};