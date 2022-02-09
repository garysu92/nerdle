let h = 6;
let w = 10;

let col = 1;
let row = 1;

const box = document.getElementById("box");

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
            if (col <= w && row <= h) {
                let block = document.getElementById(row.toString() + "-" + col.toString());
                block.innerText = e.code[5];
                if (col == w) {
                    row++;
                    col = 1;
                } else {
                    col++;
                }
            }
        }
    })
}

function onClick() {
    if (col <= w && row <= h) {
        let block = document.getElementById(row.toString() + "-" + col.toString());
        if (this.id == "plus") {
            console.log("gdsaf");
            block.innerText = '+';
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
            row++;
            col = 1;
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