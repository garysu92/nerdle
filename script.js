let h = 6;
let w = 10;

let col = 1;
let row = 1;

const box = document.getElementById("box");

let nextRow = true;

window.onload = function (){
    start();
}

function start () {
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
                let block = document.getElementById(row.toString() + "-" + col.toString());
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
                let del = document.getElementById(row.toString() + "-" + (col - 1).toString());
                console.log(del.innerText);
                del.innerText = "";
                col--;
                nextRow = true;
            }
        } 
    })
}

function onClick() {
    if (col <= w && row <= h && nextRow) {
        let block = document.getElementById(row.toString() + "-" + col.toString());
        if (this.id == "plus") {
            block.innerText = "+";
        } else if (this.id == 'minus') {
            block.innerText = "−";
        } else if (this.id == 'times') {
            block.innerText = "×";
        } else if (this.id == 'divide') {
            block.innerText = "÷";
        } else if (this.id == 'equal') {
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

document.getElementById('plus').onclick = onClick;
document.getElementById('minus').onclick = onClick;
document.getElementById('times').onclick = onClick;
document.getElementById('divide').onclick = onClick;
document.getElementById('equal').onclick = onClick;