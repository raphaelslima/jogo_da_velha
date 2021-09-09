// Initial date

let square = {
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: ''
}

let playerTurn = ''
let warning = ''
let playing = true

//Events

reset()

document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick)
})

//Function

function itemClick(e) {
  let item = e.target.getAttribute('data-item')
  if (playing && square[item] === '') {
    square[item] = playerTurn
    renderSquare()
    togglePlayer()
  }
}

function reset() {
  warning = ''

  let random = Math.floor(Math.random() * 2)
  if (random === 0) {
    playerTurn = 'X'
  } else {
    playerTurn = 'O'
  }

  for (let i in square) {
    square[i] = ''
  }

  playing = true

  renderSquare()
  renderInfo()
}

function renderSquare() {
  for (let i in square) {
    var item = document.querySelector(`div[data-item=${i}]`)
    item.innerHTML = square[i]
  }
  checkGame()
}

function renderInfo() {
  document.querySelector('.vez').innerHTML = playerTurn
  document.querySelector('.resultado').innerHTML = warning
}

function togglePlayer() {
  if (playerTurn === 'X') {
    playerTurn = 'O'
  } else {
    playerTurn = 'X'
  }
  renderInfo()
}

function checkGame() {
  if (checkWinner('X')) {
    warning = '"X" Venceu'
    playing = false
  } else if (checkWinner('O')) {
    warning = '"O" Venceu'
    playing = false
  } else if (isFull()) {
    warning = 'Empate'
    playing = false
  }
}

function checkWinner(playerTurn) {
  let p = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
  ]

  for (let w in p) {
    let pArray = p[w].split(',')
    let hasWon = pArray.every(option => square[option] === playerTurn)
    if (hasWon) {
      return true
    }
  }
  return false
}

function isFull() {
  for (let i in square) {
    if (square[i] === '') {
      return false
    }
  }
  return true
}
