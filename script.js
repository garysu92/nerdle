let h = 6;
let w = 8;

let col = 1;
let row = 1;

let num1 = 0;
let num2 = 0;
let op = 0;
let ans = 0;

const box = document.getElementById("box");

let nextRow = true;
let valid = false;

let ansBlock = [];
let currAns = [];

let iter = 0;
let ansIter = 0;

window.onload = function () {
  start();
};

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function start() {
  op = Math.floor(Math.random() * 4 + 1);
  while (!valid) {
    num1 = Math.floor(Math.random() * 999 + 1);
    num2 = Math.floor(Math.random() * 999 + 1);
    let remaining = 8 - 2 - num1.toString().length - num2.toString().length;
    let ans;
    if (op == 1) {
      ans = num1 + num2;
    } else if (op == 2) {
      ans = num1 - num2;
    } else if (op == 3) {
      ans = num1 * num2;
    } else {
      ans = num1 / num2;
    }
    if (op == 4 && ans * num2 != num1) {
      continue;
    }

    if (ans.toString().length != remaining) {
      continue;
    } else {
        valid = !valid;
        let arrNum1 = num1.toString().split("");
        let arrNum2 = num2.toString().split("");
        let arrNum3 = ans.toString().split("");
        for (let i = 0; i < arrNum1.length; i++) {
            ansBlock[iter] = arrNum1[i];
           iter++;
        }
        if (op == 1) {
            ansBlock[iter] = "+";
        } else if (op == 2) {
            ansBlock[iter] = "−";
        } else if (op == 3) {
            ansBlock[iter] = "×";
        } else {
            ansBlock[iter] = "÷";
        }
        iter++;
        for (let i = 0; i < arrNum2.length; i++) {
            ansBlock[iter] = arrNum2[i];
            iter++;
        }
        ansBlock[iter] = "=";
        iter++;
        for (let i = 0; i < arrNum3.length; i++) {
            ansBlock[iter] = arrNum3[i];
            iter++;
        }
        console.log(ansBlock);
    }
  }
  for (let i = 1; i <= h; i++) {
    for (let j = 1; j <= w; j++) {
      let tile = document.createElement("span");
      tile.id = i.toString() + "-" + j.toString();
      tile.classList.add("block");
      box.appendChild(tile);
    }
  }
  function updateTiles() {
    for (let i = 0; i < 8; i++) {
      console.log(currAns[i]+" " +ansBlock[i]);
      if (currAns[i] == ansBlock[i]) {
        let t = document.getElementById((row - 1).toString() + "-" + (i + 1).toString());
        ansBlock[i] = "NOTHING";
        t.classList.add("correct");
      }
    }
    for (let i = 0; i < 8; i++) {
      console.log(currAns[i]+ " " +ansBlock[i]);
      if (ansBlock.includes(currAns[i])) {
        let t = document.getElementById((row - 1).toString() + "-" + (i + 1).toString());
        let pos = ansBlock.indexOf(currAns[i]);
        ansBlock[pos] = "NOTHING";
        if (t.className != "correct") {
          t.classList.add("semi-correct");
        }
      }
    }
    for (let i = 0; i < 8; i++) {
      let t = document.getElementById((row - 1).toString() + "-" + (i + 1).toString());
      console.log(t.className);
      if (!hasClass(t, "correct") && !hasClass(t, "semi-correct")) {
        t.classList.add("wrong");
      }
    }
  }
  document.addEventListener("keyup", (e) => {
    if ("Digit0" <= e.code && e.code <= "Digit9") {
      if (col <= w && row <= h && nextRow) {
        let block = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        block.innerText = e.code[5];
        currAns[ansIter] = e.code[5];
        ansIter++;
        if (col == w) {
          col++;
          nextRow = false;
        } else {
          col++;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < col) {
        let del = document.getElementById(
          row.toString() + "-" + (col - 1).toString()
        );
        currAns[ansIter] = "";
        ansIter--;
        del.innerText = "";
        col--;
        nextRow = true;
      }
    } else if (e.code == "Enter") {
      if (col == w + 1) {
        row++;
        col = 1;
        nextRow = true;
        updateTiles();
      }
    }
  });
}

function onClick() {
  if (col <= w && row <= h && nextRow) {
    let block = document.getElementById(row.toString() + "-" + col.toString());
    if (this.id == "plus") {
      block.innerText = "+";
      currAns[ansIter] = "+";
      ansIter++;
    } else if (this.id == "minus") {
      block.innerText = "−";
      currAns[ansIter] = "−";
      ansIter++;
    } else if (this.id == "times") {
      block.innerText = "×";
      currAns[ansIter] = "×";
      ansIter++;
    } else if (this.id == "divide") {
      block.innerText = "÷";
      currAns[ansIter] = "÷";
      ansIter++;
    } else if (this.id == "equal") {
      block.innerText = "=";
      currAns[ansIter] = "=";
      ansIter++;
    }
    if (col == w) {
      col++;
      nextRow = false;
    } else {
      col++;
    }
  }
}

document.getElementById("plus").onclick = onClick;
document.getElementById("minus").onclick = onClick;
document.getElementById("times").onclick = onClick;
document.getElementById("divide").onclick = onClick;
document.getElementById("equal").onclick = onClick;
