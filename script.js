const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');

const currentStreak = document.getElementById('streak-number');
let streak = '';

const longestStreak = document.getElementById('longest-number');
let longest = '';


let currentlyPlaying = true;

let numClosedDoors = 3;

let openDoor1 = ''
let openDoor2 = ''
let openDoor3 = ''

const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

const startButton = document.getElementById('start');

const isBot = (door) => {
  if(door.src === botDoorPath) {
    return true;
  } else {
    return false;
  };
};

const isClicked = (door) => {
  if(door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  };
};

const playDoor = (door) => {
  numClosedDoors--;
  if(numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver();
  };
};

const randomChoreBotGenerator = () => {
  let choreDoor = Math.floor(Math.random()*numClosedDoors);

  if(choreDoor == 0) {
    openDoor1 = botDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = beachDoorPath;

  } else if(choreDoor == 1) {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;

  } else if(choreDoor == 2) {
    openDoor1 = spaceDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = botDoorPath;

  };

};


doorImage1.onclick = () => {
  if(currentlyPlaying === true && !isClicked(document.getElementById('door1'))) {
  document.getElementById('door1').src = openDoor1;
  playDoor(document.getElementById('door1'));
 };
};

doorImage2.onclick = () => {
  if(currentlyPlaying === true && !isClicked(document.getElementById('door2'))) {
  document.getElementById('door2').src = openDoor2;
  playDoor(document.getElementById('door2'))
 };
};

doorImage3.onclick = () => {
  if(currentlyPlaying === true && !isClicked(document.getElementById('door3'))) {
  document.getElementById('door3').src = openDoor3;
  playDoor(document.getElementById('door3'))
 };
};

const startRound = () => {
  document.getElementById('door1').src = closedDoorPath;
  document.getElementById('door2').src = closedDoorPath;
  document.getElementById('door3').src = closedDoorPath;

  numClosedDoors = 3;

  startButton.innerHTML = "Good luck!";

  currentlyPlaying = true;

  randomChoreBotGenerator();
};


startButton.onclick = () => {
  if(currentlyPlaying === false) {
    startRound();
  }
}

const gameOver = (status) => {
  if(status === 'win') {
    startButton.innerHTML = "You win! Play again?";
    streak++;
    currentStreak.innerHTML++;

  } else {
    startButton.innerHTML = "Game over! Play again?";
    if (streak > longest) {
      longest = streak;
      longestStreak.innerHTML = streak;
    };
    currentStreak.innerHTML = '0';
    streak = '0';
  };
  currentlyPlaying = false;
};

startRound();
