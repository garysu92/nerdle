let h = 6;
let w = 10;

let col = 1;
let row = 1;

window.onload = function (){
    start();
}

function start () {
    const box = document.getElementById("box");
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
