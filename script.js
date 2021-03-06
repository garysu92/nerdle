let h = 6;
let w = 8;

let col = 1;
let row = 1;

let num1 = 0;
let num2 = 0;
let op = 0;
let ans = 0;

let wrongs = 0;

const box = document.getElementById("box");

let nextRow = true;
let valid = false;

let ansBlock = [];
let currAns = [];

let iter = 0;
let ansIter = 0;

// START OF PROGRAM
window.onload = function () {
  start();
};

// checks if element has class className
function hasClass(element, className) {
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

// determines if str is an operator
function isOp(str) {
  if (
    str == "=" ||
    str == "+" ||
    str == "-" ||
    str == "*" ||
    str == "×" ||
    str == "/" ||
    str == "÷"
  ) {
    return true;
  }
  return false;
}

// checks validity of user's input
function checkValid() {
  let eqnCount = 0;
  let eqnPos = 0;
  // find number of equal signs and position
  for (let i = 0; i < 8; i++) {
    if (currAns[i] === "=") {
      eqnCount++;
      eqnPos = i;
    }
  }
  // replace × with *, ÷ with /
  for (let i = 0; i < 8; i++) {
    if (currAns[i] === "×") {
      currAns[i] = "*";
    } else if (currAns[i] === "÷") {
      currAns[i] = "/";
    }
  }
  // make sure only 1 equal sign, and it is not in the first or
  //   last position
  if (eqnCount != 1) {
    document.getElementById("alertText").innerText = "INVALID: MISSING OR TOO MANY EQUAL SIGNS";
    return false;
  }
  if (eqnPos == 0 || eqnPos == 7) {
    document.getElementById("alertText").innerText = "INVALID: EQUAL SIGNS AT BAD PLACES";
    return false;
  }
  // find the left and right expressions
  let leftRes = "",
    rightRes = "";
  for (let i = 0; i < eqnPos; i++) {
    leftRes += currAns[i];
  }
  for (let i = eqnPos + 1; i < 8; i++) {
    rightRes += currAns[i];
  }
  // check for leading 0s
  for (let i = 0; i < 7; i++) {
    if (isOp(currAns[i]) && currAns[i + 1] == 0) {
      document.getElementById("alertText").innerText = "INVALID: LEADING ZEROES";
      return false;
    }
  }
  // make sure there are no operators in a row
  for (let i = 0; i < 7; i++) {
    if (
      isOp(currAns[i]) &&
      isOp(currAns[i + 1]) &&
      !(currAns[i] == "=" && currAns[i + 1] == "-")
    ) {
      document.getElementById("alertText").innerText = "INVALID: OPERATORS CANNOT BE NEXT TO EACH OTHER";
      return false;
    }
  }
  if (leftRes.charAt[0] == "0") {
    leftRes == leftRes.slice(0, leftRes.length);
  }
  if (rightRes.charAt[0] == "0") {
    rightRes == rightRes.slice(0, rightRes.length);
  }
  // evaluate both expressions
  let lrCalc = Function("return " + leftRes)();
  let rrCalc = Function("return " + rightRes)();
  // switch them back
  for (let i = 0; i < 8; i++) {
    if (currAns[i] === "*") {
      currAns[i] = "×";
    } else if (currAns[i] === "/") {
      currAns[i] = "÷";
    }
  }
  // make sure no divide by 0
  if (
    lrCalc == Infinity ||
    lrCalc == -Infinity ||
    rrCalc == Infinity ||
    rrCalc == -Infinity
  ) {
    document.getElementById("alertText").innerText = "INVALID: DIVISION BY 0";
    return false;
  }
  // determine if they are equal
  if (lrCalc != rrCalc) {
    document.getElementById("alertText").innerText = "INVALID: EQUATION IS NOT EQUAL";
    return false;
  }
  return true;
}

// generates new game button and allows to start a new game
function genNew() {
  var btn = document.createElement("button");
  btn.textContent = "New Game";
  btn.id = "new";
  btn.classList.add("button");
  document.body.appendChild(btn);
  btn.addEventListener("click", function () {
    col = 1;
    row = 1;
    num1 = 0;
    num2 = 0;
    op = 0;
    ans = 0;
    wrongs = 0;
    nextRow = true;
    valid = false;
    ansBlock = [];
    currAns = [];
    iter = 0;
    ansIter = 0;
    document.getElementById("box").innerHTML = "";
    document.getElementById("new").remove();
    let z = document.getElementsByClassName("ops");
    Array.prototype.forEach.call(z, function (b) {
      b.classList.remove("correct");
      b.classList.remove("semi-correct");
      b.classList.remove("wrong");
    });
    z = document.getElementsByClassName("nums");
    Array.prototype.forEach.call(z, function (b) {
      b.classList.remove("correct");
      b.classList.remove("semi-correct");
      b.classList.remove("wrong");
    });
    document.getElementById("alertText").innerText = "";
    start();
  });
}

// updates the keyboard colours based on input
function changeKeys(w, inp) {
  if (w == 0) {
    document.getElementById(inp).classList.add("correct");
  } else if (w == 1) {
    let b = document.getElementById(inp);
    if (!hasClass(b, "correct")) {
      b.classList.add("semi-correct");
    }
  } else if (w == 2) {
    document.getElementById(inp).classList.add("wrong");
  }
}

// updates the tiles depending on if user got it right
function updateTiles() {
  // make a copy of user's answers
  aTemp = ansBlock.slice(0);
  // check for CORRECT
  let numCorrect = 0;
  for (let i = 0; i < 8; i++) {
    if (currAns[i] == aTemp[i]) {
      let t = document.getElementById(
        (row - 1).toString() + "-" + (i + 1).toString()
      );
      aTemp[i] = "NOTHING";
      t.classList.add("correct");
      changeKeys(0, currAns[i]);
      numCorrect++;
    }
  }
  if (numCorrect == 8) {
    setTimeout(() => {
      document.getElementById("alertText").innerText = "CONGRATS! YOU GOT IT!";
      genNew();
    }, 1);
    return;
  }
  wrongs++;
  // check for SEMI-CORRECT
  for (let i = 0; i < 8; i++) {
    if (aTemp.includes(currAns[i])) {
      let t = document.getElementById(
        (row - 1).toString() + "-" + (i + 1).toString()
      );
      let pos = aTemp.indexOf(currAns[i]);
      aTemp[pos] = "NOTHING";
      if (!t.classList.contains("correct")) {
        t.classList.add("semi-correct");
        changeKeys(1, currAns[i]);
      }
    }
  }
  // check for WRONG
  for (let i = 0; i < 8; i++) {
    let t = document.getElementById(
      (row - 1).toString() + "-" + (i + 1).toString()
    );
    if (!hasClass(t, "correct") && !hasClass(t, "semi-correct")) {
      t.classList.add("wrong");
      changeKeys(2, currAns[i]);
    }
  }
  // reset for next input
  currAns = [];
  ansIter = 0;
}

// listens for input
document.addEventListener("keyup", (e) => {
  // numbers
  if ("Digit0" <= e.code && e.code <= "Digit9") {
    if (col <= w && row <= h && nextRow) {
      if (!!e.shiftKey && e.code == "Digit8") {
        let block = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        block.innerText = "×";
        currAns[ansIter] = "×";
        ansIter++;
        if (col == w) {
          col++;
          nextRow = false;
        } else {
          col++;
        }
      } else {
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
    }
    // backspace
  } else if (e.code == "Backspace") {
    if (1 < col) {
      let del = document.getElementById(
        row.toString() + "-" + (col - 1).toString()
      );
      currAns[ansIter] = "";
      ansIter--;
      del.innerHTML = "";
      col--;
      nextRow = true;
    }
    // submit input
  } else if (e.code == "Enter") {
    if (col == w + 1) {
      // make sure that input is valid
      if (checkValid()) {
        document.getElementById("alertText").innerText = "";
        row++;
        col = 1;
        nextRow = true;
        updateTiles();
        if (wrongs == 6) {
          setTimeout(() => {
            let a = "";
            for (let i = 0; i < 8; i++) {
              if (isOp(ansBlock[i])) {
                a += " ";
              }
              a += ansBlock[i];
              if (isOp(ansBlock[i])) {
                a += " ";
              }
            }
            document.getElementById("alertText").innerText = "GAME OVER! THE EQUATION WAS " + a;
            genNew();
          }, 1);
        }
      }
    }
  } else if (e.code == "Minus") {
    let block = document.getElementById(row.toString() + "-" + col.toString());
    block.innerText = "-";
    currAns[ansIter] = "-";
    ansIter++;
    if (col == w) {
      col++;
      nextRow = false;
    } else {
      col++;
    }
  } else if (e.code == "Equal") {
    if (!!e.shiftKey) {
      let block = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      block.innerText = "+";
      currAns[ansIter] = "+";
      ansIter++;
      if (col == w) {
        col++;
        nextRow = false;
      } else {
        col++;
      }
    } else {
      let block = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      block.innerText = "=";
      currAns[ansIter] = "=";
      ansIter++;
      if (col == w) {
        col++;
        nextRow = false;
      } else {
        col++;
      }
    }
  } else if (e.code == "KeyX") {
    let block = document.getElementById(row.toString() + "-" + col.toString());
    block.innerText = "×";
    currAns[ansIter] = "×";
    ansIter++;
    if (col == w) {
      col++;
      nextRow = false;
    } else {
      col++;
    }
  } else if (e.code == "Slash") {
    let block = document.getElementById(row.toString() + "-" + col.toString());
    block.innerText = "÷";
    currAns[ansIter] = "÷";
    ansIter++;
    if (col == w) {
      col++;
      nextRow = false;
    } else {
      col++;
    }
  }
});

// create the tiles
function createTiles() {
  for (let i = 1; i <= h; i++) {
    for (let j = 1; j <= w; j++) {
      let tile = document.createElement("span");
      tile.id = i.toString() + "-" + j.toString();
      tile.classList.add("block");
      box.appendChild(tile);
    }
  }
}

// generate the equation
function start() {
  // pick random operator of +, -, *, /
  op = Math.floor(Math.random() * 4 + 1);
  while (!valid) {
    // generate remaining numbers
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
    // make sure that the quotient is not rounded and it is the correct integer
    if ((op == 4 && ans * num2 != num1) || ans % 1 != 0) {
      continue;
    }
    // make sure answer is of correct length before proceeding
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
      // update variables
      if (op == 1) {
        ansBlock[iter] = "+";
      } else if (op == 2) {
        ansBlock[iter] = "-";
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
      // console.log(ansBlock);
    }
  }
  createTiles();
}

// click operators
function onClick() {
  if (col <= w && row <= h && nextRow) {
    let block = document.getElementById(row.toString() + "-" + col.toString());
    block.innerText = this.id;
    currAns[ansIter] = this.id;
    ansIter++;
    if (col == w) {
      col++;
      nextRow = false;
    } else {
      col++;
    }
  }
}

// onclick
let t = document.getElementsByClassName("nums");
Array.prototype.forEach.call(t, function (elem) {
  elem.addEventListener("click", onClick);
});
let o = document.getElementsByClassName("ops");
Array.prototype.forEach.call(o, function (elem) {
  elem.addEventListener("click", onClick);
});
