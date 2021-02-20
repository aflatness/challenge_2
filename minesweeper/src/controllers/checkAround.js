/* eslint-disable no-unused-expressions */
const checkHorz = (matrix, r, c) => {
  let bombs = 0;
  c - 1 >= 0 && matrix[r][c - 1] ? bombs++ : null;
  c + 1 <= 35 && matrix[r][c  + 1] ? bombs++ : null;
  return bombs;
}

const checkVert = (matrix, r, c) => {
  let bombs = 0;
  r - 1 >= 0 && matrix[r - 1][c] ? bombs++ : null;
  r + 1 <= 15 && matrix[r + 1][c] ? bombs++ : null;
  return bombs;
}

const checkMajorDia = (matrix, r, c) => {
  let bombs = 0;
  r - 1 >= 0 && c - 1 >= 0 && matrix[r - 1][c - 1] ? bombs++ : null;
  r + 1 <= 15 && c + 1 <= 35 && matrix[r + 1][c + 1] ? bombs++ : null;
  return bombs;
}

const checkMinorDia = (matrix, r, c) => {
  let bombs = 0;
  r - 1 >= 0 && c + 1 <= 35 && matrix[r - 1][c + 1] ? bombs++ : null;
  r + 1 <= 15 && c - 1 >= 0 && matrix[r + 1][c - 1] ? bombs++ : null;
  return bombs;
}

module.exports = {
  checkHorz,
  checkVert,
  checkMajorDia,
  checkMinorDia
}