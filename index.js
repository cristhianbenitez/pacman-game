const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const gameStatus = document.querySelector('.game');
const startButton = document.getElementById('start-button');
let squares = [];
let score = 0;

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

//create <div> for my layout
function divMaker() {
  for (let i = 0; i < layout.length; i++) {
    const newSquare = document.createElement('div');
    grid.appendChild(newSquare);
    squares.push(newSquare);
    if (layout[i] === 0) {
      newSquare.classList.add('pac-dot');
    } else if (layout[i] === 1) {
      newSquare.classList.add('wall');
    } else if (layout[i] === 2) {
      newSquare.classList.add('ghost-lair');
    } else if (layout[i] === 3) {
      newSquare.classList.add('power-pellet');
    }
  }
}
divMaker();
//Starting Position for my Pacman
let pacmanCurrentPosition = 490;
squares[pacmanCurrentPosition].classList.add('pacman');

//control my pacman and avoid it to touch the walls
function control(e) {
  squares[pacmanCurrentPosition].classList.remove('pacman');
  switch (e.key) {
    case 'ArrowDown':
      if (
        !squares[pacmanCurrentPosition + width].classList.contains(
          'ghost-lair'
        ) &&
        !squares[pacmanCurrentPosition + width].classList.contains('wall') &&
        pacmanCurrentPosition + width <= width * width
      )
        pacmanCurrentPosition += width;
      break;
    case 'ArrowRight':
      if (
        !squares[pacmanCurrentPosition + 1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentPosition + 1].classList.contains('wall') &&
        pacmanCurrentPosition % width !== width - 1
      )
        pacmanCurrentPosition += 1;
      // move pacman to position 364 when he pass thru position 391
      if (pacmanCurrentPosition === 391) {
        pacmanCurrentPosition = 364;
      }
      break;
    case 'ArrowUp':
      if (
        !squares[pacmanCurrentPosition - width].classList.contains(
          'ghost-lair'
        ) &&
        !squares[pacmanCurrentPosition - width].classList.contains('wall') &&
        pacmanCurrentPosition - width >= 0
      )
        pacmanCurrentPosition -= width;
      break;
    case 'ArrowLeft':
      // move pacman to position 391 when he pass thru position 361
      if (
        !squares[pacmanCurrentPosition - 1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentPosition - 1].classList.contains('wall') &&
        pacmanCurrentPosition % width !== 0
      )
        pacmanCurrentPosition -= 1;
      if (pacmanCurrentPosition === 364) {
        pacmanCurrentPosition = 391;
      }

      break;
    default:
      return;
  }
  eatingPaddot();
  powerPelletEaten();

  squares[pacmanCurrentPosition].classList.add('pacman');
}
document.addEventListener('keyup', control);

//Eat the pad-dot
function eatingPaddot() {
  if (squares[pacmanCurrentPosition].classList.contains('pac-dot')) {
    squares[pacmanCurrentPosition].classList.remove('pac-dot');
    score++;
    scoreDisplay.textContent = score;
  }
}
eatingPaddot();
// power pellet eat, get 100 scores and scare the ghosts
function powerPelletEaten() {
  if (squares[pacmanCurrentPosition].classList.contains('power-pellet')) {
    score += 10;
    scoreDisplay.textContent = score;
    squares[pacmanCurrentPosition].classList.remove('power-pellet');
    ghosts.forEach((ghost) => {
      ghost.isScared = true;
      setTimeout(() => {
        ghost.isScared = false;
      }, 10000);
    });
  }
}
//Create Class of Ghosts
class Ghost {
  constructor(className, startPosition, speed) {
    this.className = className;
    this.startPosition = startPosition;
    this.speed = speed;
    this.currentPosition = startPosition;
    this.isScared = false;
    this.timerId = NaN;
  }
}
//store the subClasses of my Ghosts
const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500),
];

//place the ghosts into the ghost-lair
ghosts.forEach((ghost) => {
  squares[ghost.currentPosition].classList.add(ghost.className);
  squares[ghost.currentPosition].classList.add('ghost');
});
//reset ghost around
//Start Game Button
startButton.addEventListener('click', () => {
  moveGhost();
});
// check if game has started and move the ghosts
function moveGhost() {
  ghosts.map((ghost) => {
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    return (ghost.timerId = setInterval(function () {
      // move ghost in random directions
      if (
        !squares[ghost.currentPosition + direction].classList.contains(
          'wall'
        ) &&
        !squares[ghost.currentPosition + direction].classList.contains('ghost')
      ) {
        squares[ghost.currentPosition].classList.remove(ghost.className);
        squares[ghost.currentPosition].classList.remove(
          'ghost',
          'scared-ghost'
        );
        ghost.currentPosition += direction;
        squares[ghost.currentPosition].classList.add(ghost.className);
        squares[ghost.currentPosition].classList.add('ghost');
      } else direction = directions[Math.floor(Math.random() * directions.length)];

      if (ghost.isScared) {
        squares[ghost.currentPosition].classList.add('scared-ghost');
      }
      // if ghost is scared and pacman in inside the div .ghost
      if (
        ghost.isScared &&
        squares[ghost.currentPosition].classList.contains('pacman')
      ) {
        squares[ghost.currentPosition].classList.remove(
          ghost.className,
          'ghost',
          'scared-ghost'
        );
        ghost.currentPosition = ghost.startPosition;
        score += 100;
        squares[ghost.currentPosition].classList.add(ghost.className, 'ghost');
      }
      checkgameOver();
      checkWin();
    }, ghost.speed));
  });
}

//check for game over
function checkgameOver() {
  if (
    squares[pacmanCurrentPosition].classList.contains('ghost') &&
    !squares[pacmanCurrentPosition].classList.contains('scared-ghost')
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener('keyup', control);
    gameStatus.textContent = 'GAME OVER';
  }
}

// check for win
function checkWin() {
  if (score === 250) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener('keyup', control);
    gameStatus.textContent = 'YOU HAVE WON';
  }
}
