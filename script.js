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

let iter = 0;

window.onload = function () {
  start();
};

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

  document.addEventListener("keyup", (e) => {
    if ("Digit0" <= e.code && e.code <= "Digit9") {
      if (col <= w && row <= h && nextRow) {
        let block = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        block.innerText = e.code[5];
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
        console.log(del.innerText);
        del.innerText = "";
        col--;
        nextRow = true;
      }
    }
  });
}

function onClick() {
  if (col <= w && row <= h && nextRow) {
    let block = document.getElementById(row.toString() + "-" + col.toString());
    if (this.id == "plus") {
      block.innerText = "+";
    } else if (this.id == "minus") {
      block.innerText = "−";
    } else if (this.id == "times") {
      block.innerText = "×";
    } else if (this.id == "divide") {
      block.innerText = "÷";
    } else if (this.id == "equal") {
      block.innerText = "=";
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
