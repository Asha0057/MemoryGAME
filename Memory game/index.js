let cardarray = [
    {
        name: 'hippo',
        icon: '<i class="fas fa-hippo" style="color: #001e52;"></i>'
    },
    {
        name: 'dog',
        icon: '<i class="fa-solid fa-dog" style="color: #002057;"></i>'
    },
    {
        name: 'spider',
        icon: '<i class="fa-solid fa-spider" style="color: #002970;"></i>'
    },
    {
        name: 'fish',
        icon: '<i class="fa-solid fa-fish-fins" style="color: #00276b;"></i>'

    },
    {
        name: 'frog',
        icon: '<i class="fa-solid fa-frog" style="color: #002b75;"></i>'

    },
    {
        name: 'horse',
        icon: '<i class="fa-solid fa-horse" style="color: #002970;"></i>'

    },
    {
        name: 'hippo',
        icon: '<i class="fas fa-hippo" style="color: #001e52;"></i>'
    },
    {
        name: 'dog',
        icon: '<i class="fa-solid fa-dog" style="color: #002057;"></i>'
    },
    {
        name: 'spider',
        icon: '<i class="fa-solid fa-spider" style="color: #002970;"></i>'
    },
    {
        name: 'fish',
        icon: '<i class="fa-solid fa-fish-fins" style="color: #00276b;"></i>'

    },
    {
        name: 'frog',
        icon: '<i class="fa-solid fa-frog" style="color: #002b75;"></i>'

    },
    {
        name: 'horse',
        icon: '<i class="fa-solid fa-horse" style="color: #002970;"></i>'

    }
]
let flipcard = [];
shuffle();
display();
//console.log(cardarray)



function shuffle() {
    for (let i = cardarray.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [cardarray[i], cardarray[rand]] = [cardarray[rand], cardarray[i]]
    }
}
function display() {
    cardarray.forEach((curr, index, arr) => {
        const card = document.createElement('div');
        card.setAttribute('id', index);
        card.classList.add('cardback');
        card.classList.add('active');
        GameBoard.append(card);
        card.addEventListener('click', flip)
    });
}

function flip() {
    if (flipcard.length < 2 && this.classList.contains('active')) {

        if (!flipcard.includes(this)) {
            let cardId = this.getAttribute('id');
            flipcard.push(this);
            this.classList.remove('cardback');
            this.classList.add('cardicon')
            this.innerHTML = cardarray[cardId].icon;
            this.style.borderRadius = "4px";
            if (flipcard.length == 2) {
                setTimeout(matched, 500)
            }
        }

    }

}
let match = 0;
let points = 0;
function matched() {
    let card1 = flipcard[0].getAttribute('id');
    let card2 = flipcard[1].getAttribute('id');
    if (cardarray[card1].name == cardarray[card2].name) {
        flipcard[0].classList.remove('cardicon');
        flipcard[0].innerHTML = "";
        flipcard[0].classList.remove('cardback');
        flipcard[0].style.border = "none";
        flipcard[0].classList.remove('active');
        flipcard[1].innerHTML = "";
        flipcard[1].classList.remove('cardicon');
        flipcard[1].classList.remove('cardback');
        flipcard[1].style.border = "none";
        flipcard[1].classList.remove('active');
        match++;
        points++;
        gameWon();

    }
    else {
        flipcard[0].classList.remove('cardicon');
        flipcard[0].innerHTML = "";
        flipcard[0].classList.add('cardback');
        flipcard[1].classList.remove('cardicon');
        flipcard[1].innerHTML = "";
        flipcard[1].classList.add('cardback');

    }
    flipcard = [];
}
let timerID;
let ispaused = false;
let seconds = 60; // Total duration in seconds
let stop;

function updateTimer() {
    if (seconds > 0 && match != cardarray.length / 2) {
        timer.innerHTML = seconds + " seconds left";
        seconds--;
        timerID = setTimeout(updateTimer, 700);
    } else {
        if (match != cardarray.length / 2) {

            timer.innerHTML = " Oops Time's up!";
            timer.style.backgroundColor = "#912C22";
            stop.style.display = "none";

            let removediv = document.getElementById('GameBoard');
            removediv.remove();
            // Perform game over actions here

            let won = document.createElement('div');
            won.classList.add('won');
            won.innerHTML = "YOU LOSE";
            Displaying.appendChild(won);

            let pts = document.createElement('div');
            pts.classList.add('pts');
            if (points == 0) {
                pts.innerHTML = "YOUR SCORE : " + "0" + " \u{1F97A}";
            }
            else {
                pts.innerHTML = "YOUR SCORE : " + points * 100 + " \u{1F60A}";

            }
            let removeExit = document.getElementById('exitID');
            removeExit.style.display = "block";
            styling();

            Displaying.appendChild(pts);
            newGame();
        }

    }
}
updateTimer(); // Start the timer


function gameWon() {
    if (match == cardarray.length / 2 && points == cardarray.length / 2) {
        while (GameBoard.firstChild) {
            GameBoard.removeChild(GameBoard.firstChild)
        }
        let removediv = document.getElementById('GameBoard');
        removediv.remove();

        let won = document.createElement('div');
        won.classList.add('won');
        won.innerHTML = "YOU WON";
        Displaying.appendChild(won);

        let pts = document.createElement('div');
        pts.classList.add('pts');
        pts.innerHTML = "YOUR SCORE: " + ((points * 100) + ((++seconds) * 30)) + "&#x1F60D;";
        Displaying.appendChild(pts);
        timer.style.backgroundColor = "#027148";
        stop.style.display = "none";
        let removeExit = document.getElementById('exitID');
        removeExit.style.display = "block";
        styling();

        newGame();
    }

}
function pause() {
    stop = document.createElement('button')
    stop.classList.add('stop')
    stop.innerHTML = "PAUSE &#x23F8;";
    stop.id = "stopID";
    Displaying.appendChild(stop);
    stop.addEventListener('click', () => {
        if (ispaused) {
            ispaused = false;
            stop.innerHTML = "PAUSE &#x23F8;";
            stop.style.backgroundColor = "#333333";
            GameBoard.style.display = "grid";

            let removeButton = document.getElementById('newGameButton');
            Displaying.removeChild(removeButton);

            let removeCurr = document.getElementById('curr');
            Displaying.removeChild(curr);

            let removeMsg = document.getElementById('currMsg');
            Displaying.removeChild(currMsg);

            let removeExit = document.getElementById('exitID');
            removeExit.style.display = "none";
            updateTimer();
        }
        else {
            ispaused = true;
            clearTimeout(timerID);
            stop.innerHTML = "RESUME &#x25B6;";
            stop.style.backgroundColor = "#912C22";
            stop.addEventListener('mouseover', () => {
                if (ispaused) {
                    stop.style.backgroundColor = "#027148"; // green when paused
                } else {
                    stop.style.backgroundColor = "#912C22"; // black when resumed
                }
            });

            stop.addEventListener('mouseout', () => {
                if (ispaused) {
                    stop.style.backgroundColor = "#912C22"; // red when paused
                } else {
                    stop.style.backgroundColor = "#333333"; // black when resumed
                }
            });

            newGame();
            GameBoard.style.display = "none";

            let currMsg = document.createElement('div');
            currMsg.classList.add('currMsg');
            Displaying.appendChild(currMsg);
            currMsg.innerHTML = "Do You Wanna Continue?";
            currMsg.id = "currMsg";

            let currpoints = document.createElement('div');
            currpoints.classList.add('currpoints');
            Displaying.appendChild(currpoints);
            currpoints.innerHTML = "YOUR SCORE: " + points * 100;
            currpoints.id = "curr";

            styling();

        }
    });
}
pause();

function styling() {

    let removeExit = document.getElementById('exitID');
    removeExit.style.display = "block";
    removeExit.style.position = "absolute";
    removeExit.style.top = "83%";
    removeExit.style.paddingTop = "12px";
    removeExit.style.background = "linear-gradient(to left, #121FCF 0%, #CF1512 100%)";
    removeExit.style.boxShadow = "0px 10px 15px -1px black";
    removeExit.style.width = "150px"
    removeExit.style.height = "35px"
    removeExit.style.hover = "black"
    removeExit.addEventListener("mouseover", () => {
        removeExit.style.background = "linear-gradient(to right, #121FCF 0%, #CF1512 100%)";
    });
    removeExit.addEventListener("mouseout", () => {
        removeExit.style.background = "linear-gradient(to left, #121FCF 0%, #CF1512 100%)";
    });



}

let starting = false;
function startGame() {
    let removediv = document.getElementById('GameBoard');
    removediv.style.display = 'none';

    clearTimeout(timerID);
    let removeTimer = document.getElementById('timer');
    removeTimer.style.display = 'none';


    let removePause = document.getElementById('stopID');
    removePause.style.display = 'none';
    if (!starting) {

        let start = document.createElement('button');
        start.classList.add('start');
        Displaying.appendChild(start);
        start.innerHTML = "START GAME";
        start.id = 'startID';

        start.addEventListener('click', () => {
            document.body.style.background = 'radial-gradient(circle, rgba(245,240,240,1) 0%, rgba(245,240,240,1) 18%, rgba(133,135,135,1) 69%)';
            let removediv = document.getElementById('GameBoard');
            removediv.style.display = 'grid';

            let removeTimer = document.getElementById('timer');
            removeTimer.style.display = "block";

            let removePause = document.getElementById('stopID');
            removePause.style.display = "block";

            let removeExit = document.getElementById('exitID');
            removeExit.style.display = "none";

            let headingChange = document.getElementById('heading');

            headingChange.classList.remove('frst-heading')
            headingChange.classList.add('new-heading');


            Displaying.removeChild(start);

            seconds = 60;
            updateTimer();
            starting = true;
        })
    }
}
startGame();

function newGame() {
    let restart = document.createElement('button');
    restart.classList.add('button');
    restart.innerHTML = "NEW GAME";
    restart.id = "newGameButton"
    Displaying.appendChild(restart);
    restart.addEventListener('click', () => {
        location.reload();
    });
}
function exitGame() {
    let removediv = document.getElementById('GameBoard');
    removediv.style.display = 'none';

    clearTimeout(timerID);
    let removeTimer = document.getElementById('timer');
    removeTimer.style.display = 'none';


    let removePause = document.getElementById('stopID');
    removePause.style.display = 'none';

    let exitG = document.createElement('button');
    exitG.classList.add('exitG');
    Displaying.appendChild(exitG);
    exitG.innerHTML = "EXIT";
    exitG.id = 'exitID';

    exitG.addEventListener('click', () => {
        window.close();
    })

}
exitGame();

