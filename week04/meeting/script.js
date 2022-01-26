let gridContainer = document.getElementById('grid-container');
// let targetCell = gridContainer.addEventListener('mouseup', (event) => updateCell(event.target));
let targetCell = gridContainer.addEventListener('touchend', (event) => updateCell(event.target));

var player = "X";
var turns = 0;

function resetGame() {
    for (let i = 0; i < 9; i++) {
        gridContainer.children[i].setAttribute('class', 'cell');
    }
    player = "X"
    turns = 0;
    document.getElementById('output').innerText = "";
}

function updateCell(cell) {
    if (player === "X") {
        if (!cell.classList.contains('o') && !cell.classList.contains('x')) {
            cell.classList.toggle('x');
            player = "O";
            turns++;
        }
    } else if (player === "O") {
        if (!cell.classList.contains('o') && !cell.classList.contains('x')) {
            cell.classList.toggle('o');
            player = "X";
            turns++;
        }
    }
    if (turns >= 9) {
        document.getElementById('output').innerText = "Tie Game!";
    }

}