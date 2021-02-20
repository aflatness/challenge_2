export default function clickBorderedElements([r, c]) {
  [r, c] = [Number(r), Number(c)];
  for (let i = r - 1; i < (r + 2); i++) {
    for(let j = c - 1; j < (c + 2); j++) {
      if (i >= 0 && i <= 15 && j >= 0 && j <= 35) {
        console.log({i, j})
        document.getElementById(`${i}, ${j}`).click();
      }
    }
  }
}