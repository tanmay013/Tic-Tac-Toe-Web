const GameModeSelectionBox = document.querySelector('.GameModeSelection-Box');
const SinglePlayerBtn = GameModeSelectionBox.querySelector('.SinglePlayer');
const MultiPlayerBtn = GameModeSelectionBox.querySelector('.MultiPlayer');
const XoSelectionBox = document.querySelector('.XoSelection-Box');
const SelectXBtn = XoSelectionBox.querySelector('.playerX');
const SelectOBtn = XoSelectionBox.querySelector('.playerO');
const playingGrid = document.querySelector('.playing-grid');
const players = document.querySelector('.players');
const gridBoxes = document.querySelectorAll('section span');
const resultBox = document.querySelector('.result-box');
const winningText = resultBox.querySelector('.won-text');
const replayBtn = resultBox.querySelector('button');

var splayer= true;
let width = screen.width;
//when the site is loaded perform the following (includes single and multiplayer options and x-o player selection options)
window.onload = () => {
    
    //function to register click on boxes of playing grid
    for (let i = 0; i < gridBoxes.length; i++) {
        gridBoxes[i].setAttribute("onclick", "clickedGridBox(this)");
    }

    //when single player button is clicked 
    SinglePlayerBtn.onclick = () => {
        GameModeSelectionBox.classList.add('hide'); //hide the game mode selection menu
        XoSelectionBox.classList.add('show'); //show the x-o selection menu
    }


    //when multi player button is clicked 
    MultiPlayerBtn.onclick = () => {
        GameModeSelectionBox.classList.add('hide'); //hide the game mode selection menu
        playingGrid.classList.add('show');  //show the x-o selection menu
        splayer = false;
    }

    SelectXBtn.onclick = () => {
        XoSelectionBox.classList.remove('show'); // hides X-O selection Menu
        playingGrid.classList.add('show'); // shows the playing Grid
    }
    SelectOBtn.onclick = () => {
        XoSelectionBox.classList.remove('show'); // hides X-O selection Menu
        playingGrid.classList.add('show'); // shows the playing Grid
        players.setAttribute('class', 'players active player'); // o player is selected make class active
    }
}

var playerXIcon = 'X'; // X player icon to display in grid.
var playerOIcon = 'O'; // O player icon to display in grid.
var playerSign = 'X'; // lets assume first player selects X
let computerTurn = true; // for computer turn ongoing
var winner = false; // to prevent both draw and win conditions at last case

//function to handle click on grid
function clickedGridBox(element){
    if(players.classList.contains('player')) // O is selected by Player1 or player
    {
        element.innerHTML = `<h1 class="animateXO">${playerOIcon}</h1>`; // set grid text as player icon O
        players.classList.remove("active"); //player turn is completed  so set slider to X
        playerSign = "O"; // O is selected by player so store it in id
        element.setAttribute("id", playerSign); // set clicked box id as O  

    }else // X is selected by the Player1 or player
    {
        element.innerHTML = `<h1 class="animateXO">${playerXIcon}</h1>`; // set grid text as player icon X
        players.classList.add("active"); //player turn is completed
        element.setAttribute("id", playerSign); // set clicked box id as X
    }
    element.style.pointerEvents = "none"; // disable box of grid already clicked future clicks. 

    checkWin();

    if(splayer) // Single Player Options
    {
        playingGrid.style.pointerEvents = "none"; // disable player-1 (user) grid clicks when their turn is completed.
    

        let randomDelayTime = (Math.random() * 1000).toFixed(); // calculate a random time in milli secods to show computer thinking delay
         setTimeout(()=>{
             ComputerMove(computerTurn);  // function to make computer's turn moves with some delay
        }, randomDelayTime);

    }else // Multi Player Options
    {
        if(playerSign == 'X'){  // if present player is X then next player  will by O hand so change tunrs

            playerSign = 'O'; //changes next player sign to O
            players.classList.add("player"); // changes next player options to O's options

        }else if(playerSign == "O") // if present player is O then next player  will by X hand so change tunrs
        {
            playerSign = 'X'; // change player sign
            players.classList.remove("player");  // changes next player options to X's options
        }
    }  

}

// function to make computer moves
function ComputerMove(computerTurn)
{
    if(computerTurn)
    {
        playerSign = 'O'; // lets assume player has selected X so computer will select O

        let remainingBoxes = []; // array to store left boxes in grid
        for (let i = 0; i < gridBoxes.length; i++) {
            if(gridBoxes[i].childElementCount == 0)
            {
                remainingBoxes.push(i); // store left box number in array
            }
        }
        
        let randomBlock = remainingBoxes[Math.floor(Math.random()* remainingBoxes.length)]; // select a random remaining block from grid
        
        if(remainingBoxes.length > 0) // if there is a random block remaining then...
        {
            if(players.classList.contains('player')) // O is selected by Player1 or player so cpu will select X
            {
                gridBoxes[randomBlock].innerHTML = `<h1 class="animateXO">${playerXIcon}</h1>`;
                players.classList.add("active"); // CPUs turn is completed so set slider to O
                playerSign = 'X';
                gridBoxes[randomBlock].setAttribute("id", playerSign);
        
            }else // X is selected by the Player1 or player so cpu will select O
            {
                gridBoxes[randomBlock].innerHTML = `<h1 class="animateXO">${playerOIcon}</h1>`;
                players.classList.remove("active"); // CPUs turn is completed
                gridBoxes[randomBlock].setAttribute("id", playerSign);
            }
        }
        checkWin();
        gridBoxes[randomBlock].style.pointerEvents = 'none'; // box already clicked by CPU is set to none
        playingGrid.style.pointerEvents = 'auto'; // now user can click the grid (grid is active)
        playerSign = 'X'; // default player sign for User

    }
}


const checkWin = () => {
    let wins = [
        [0,1,2, 153, -110, 90, 303, -215],
        [3,4,5, 153, -10, 90, 303, -10],
        [6,7,8, 153, 95, 90, 303, 194],
        [0,3,6, 51, 1, 0, 100, 1],
        [1,4,7, 155, 1, 0, 304, 1],
        [2,5,8, 260, 1, 0, 508, 1],
        [0,4,8, 157, -3, 135, 305, -11],
        [2,4,6, 155, -4, 45, 300, -10]
    ]; // array containing all cases when player will won and x,y and rotation for stripe line

    wins.forEach(e => {
        if((gridBoxes[e[0]].id == gridBoxes[e[1]].id) && (gridBoxes[e[1]].id == gridBoxes[e[2]].id) && (gridBoxes[e[0]].id !== ""))
        { //checks winning conditions as per array
            

            if (splayer){ // for single player stop CPU
                computerTurn = false;  
                ComputerMove(computerTurn);
            }else{
                playingGrid.style.pointerEvents = "none"; // disable grid sinch game is over. multiplayer disable.
            } 

            if(width > 1000)
            {
                document.querySelector(".line").classList.add("show"); //show to stripe line
                document.querySelector(".line").style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`; //set the striping line position    
            }else{
                document.querySelector(".line").classList.add("show"); //show to stripe line
                document.querySelector(".line").style.transform = `translate(${e[6]}px, ${e[7]}px) rotate(${e[5]}deg)`; 
            }
           winner = true;

            setTimeout(()=>{ //slightly delay to show result
                playingGrid.classList.remove("show");
                resultBox.classList.add("show");
            }, 2300);

            winningText.innerHTML = `Player <p> ${playerSign} </p> won the game!` ; // sets winning text in result box

        }
    });
    
    if(gridBoxes[0].id !== "" && gridBoxes[1].id !== ""  && gridBoxes[2].id !== "" && gridBoxes[3].id !== "" && gridBoxes[4].id !== "" && 
        gridBoxes[5].id !== "" && gridBoxes[6].id !== "" && gridBoxes[7].id !== "" && gridBoxes[8].id !== "" && !winner ) // Match Draw case
        { 

            if (splayer){ // for single player stop CPU
                computerTurn = false; 
                ComputerMove(computerTurn);
            }else{
                playingGrid.style.pointerEvents = "none"; // disable grid sinch game is over. multiplayer disable.
            } 

            setTimeout(()=>{
                playingGrid.classList.remove("show");
                resultBox.classList.add("show");
            }, 1000);
            winningText.innerHTML = `Its a Draw!!` ;
        }
}

replayBtn.onclick = () => { // reload button refreshes the screen
    window.location.reload();
}