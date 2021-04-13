const Player = (name) => {
    let score = 0;
    let type = 'player';
    const win = () =>{
        score++;
        console.log(this);
    };
    const resetScore = () =>{
        score = 0;
    };
    const getScore = () =>{
        return score;
    };
    const getType = () =>{
        return type;
    }
    const setType = (a) =>{
        type = a;
    }
    return {win,resetScore, getScore, getType, setType};
}

const Player1 = Player("Player1");
const Player2 = Player("Player2");
Player2.setType("comp");

var gameBoard = (function() {
    'use strict';
    var _privateGameBoard = [0,0,0,0,0,0,0,0,0];
    var _privateTurn = "P1";
    var _privateSetFinish = 0;
    var _privateTie = 0;

    function publicReset(){
        _privateGameBoard=[0,0,0,0,0,0,0,0,0];
        _privateSetFinish=0;
        publicShowBoard();
        Player1.resetScore();
        Player2.resetScore();
        _privateTie=0;
        document.getElementById("P1Score").textContent = Player1.getScore();
        document.getElementById("P2Score").textContent = Player2.getScore();
        document.getElementById("tieScore").textContent = _privateTie;
        publicShowBoard();
    };

    function privateAddImage(i){
        const image = document.createElement('img');
        image.classList.add("image");
        image.id = "image"+i;
        if(_privateGameBoard[i]==1){image.src = "images/tetotputih.png";}
        else if(_privateGameBoard[i]==6){image.src = "images/buletputihss.png";}
        document.getElementById(i).appendChild(image);    
    }

    function privateCheckWin1(){
        if((_privateGameBoard[0]+_privateGameBoard[1]+_privateGameBoard[2]==3)||
        (_privateGameBoard[3]+_privateGameBoard[4]+_privateGameBoard[5]==3)||
        (_privateGameBoard[6]+_privateGameBoard[7]+_privateGameBoard[8]==3)||
        (_privateGameBoard[0]+_privateGameBoard[3]+_privateGameBoard[6]==3)||
        (_privateGameBoard[1]+_privateGameBoard[4]+_privateGameBoard[7]==3)||
        (_privateGameBoard[2]+_privateGameBoard[5]+_privateGameBoard[8]==3)||
        (_privateGameBoard[0]+_privateGameBoard[4]+_privateGameBoard[8]==3)||
        (_privateGameBoard[2]+_privateGameBoard[4]+_privateGameBoard[6]==3))
        {
            Player1.win();
            document.getElementById("P1Score").textContent = Player1.getScore();
            _privateSetFinish = 1;
        }
        else if((_privateGameBoard[0]+_privateGameBoard[1]+_privateGameBoard[2]==18)||
        (_privateGameBoard[3]+_privateGameBoard[4]+_privateGameBoard[5]==18)||
        (_privateGameBoard[6]+_privateGameBoard[7]+_privateGameBoard[8]==18)||
        (_privateGameBoard[0]+_privateGameBoard[3]+_privateGameBoard[6]==18)||
        (_privateGameBoard[1]+_privateGameBoard[4]+_privateGameBoard[7]==18)||
        (_privateGameBoard[2]+_privateGameBoard[5]+_privateGameBoard[8]==18)||
        (_privateGameBoard[0]+_privateGameBoard[4]+_privateGameBoard[8]==18)||
        (_privateGameBoard[2]+_privateGameBoard[4]+_privateGameBoard[6]==18))
        {
            Player2.win();
            document.getElementById("P2Score").textContent = Player2.getScore();
            _privateSetFinish = 1;
        }
        else if((_privateGameBoard.reduce((a, b) => a + b, 0)==34)||
        (_privateGameBoard.reduce((a, b) => a + b, 0)==29)){
            document.getElementById("tieScore").textContent = ++_privateTie;
            _privateSetFinish = 1;
        }
            
    }

    function privateP1Win(){
        Player1.win(); 
        _privateSetFinish = 1;
        document.getElementById("P1Score").textContent = Player1.getScore();
    }
    function privateP2Win(){
        Player2.win(); 
        _privateSetFinish = 1;
        document.getElementById("P2Score").textContent = Player2.getScore();
    }

    function blinkWinner(index){
        for(let i = 0; i<index.length; i++){
            document.getElementById("image"+index[i]).style.opacity = 0.2;
        }
        setTimeout(function(){
            for(let i = 0; i<index.length; i++){
                document.getElementById("image"+index[i]).style.opacity = 1;
            }
        },400);
    }

    function privateCheckWin(){
        var index = [0,0,0];
        var winner = "";
        if((_privateGameBoard[0]+_privateGameBoard[1]+_privateGameBoard[2]==3)){
            index=[0,1,2]; winner="P1"; privateP1Win();
        }
        else if((_privateGameBoard[0]+_privateGameBoard[1]+_privateGameBoard[2]==18)){
            index=[0,1,2]; winner="P2"; privateP2Win();
        }
        else if((_privateGameBoard[3]+_privateGameBoard[4]+_privateGameBoard[5]==3)){
            index=[3,4,5]; winner="P1"; privateP1Win();
        }
        else if((_privateGameBoard[3]+_privateGameBoard[4]+_privateGameBoard[5]==18)){
            index=[3,4,5]; winner="P2"; privateP2Win();
        }
        else if((_privateGameBoard[6]+_privateGameBoard[7]+_privateGameBoard[8]==3)){
            index=[6,7,8]; winner="P1"; privateP1Win();
        }
        else if((_privateGameBoard[6]+_privateGameBoard[7]+_privateGameBoard[8]==18)){
            index=[6,7,8]; winner="P2"; privateP2Win();
        }
        else if((_privateGameBoard[0]+_privateGameBoard[3]+_privateGameBoard[6]==3)){
            index=[0,3,6]; winner="P1"; privateP1Win();
        }
        else if((_privateGameBoard[0]+_privateGameBoard[3]+_privateGameBoard[6]==18)){
            index=[0,3,6]; winner="P2"; privateP2Win();
        }
        else if((_privateGameBoard[1]+_privateGameBoard[4]+_privateGameBoard[7]==3)){
            index=[1,4,7]; winner="P1"; privateP1Win();
        }
        else if((_privateGameBoard[1]+_privateGameBoard[4]+_privateGameBoard[7]==18)){
            index=[1,4,7]; winner="P2"; privateP2Win();
        }
        else if((_privateGameBoard[2]+_privateGameBoard[5]+_privateGameBoard[8]==3)){
            index=[2,5,8]; winner="P1"; privateP1Win();
        }
        else if((_privateGameBoard[2]+_privateGameBoard[5]+_privateGameBoard[8]==18)){
            index=[2,5,8]; winner="P2"; privateP2Win();
        }
        else if((_privateGameBoard[0]+_privateGameBoard[4]+_privateGameBoard[8]==3)){
            index=[0,4,8]; winner="P1"; privateP1Win();
        }
        else if((_privateGameBoard[0]+_privateGameBoard[4]+_privateGameBoard[8]==18)){
            index=[0,4,8]; winner="P2"; privateP2Win();
        }
        else if((_privateGameBoard[2]+_privateGameBoard[4]+_privateGameBoard[6]==3)){
            index=[2,4,6]; winner="P1"; privateP1Win();
        }
        else if((_privateGameBoard[2]+_privateGameBoard[4]+_privateGameBoard[6]==18)){
            index=[2,4,6]; winner="P2"; privateP2Win();
        }
        else if((_privateGameBoard.reduce((a, b) => a + b, 0)==34)||
        (_privateGameBoard.reduce((a, b) => a + b, 0)==29)){
            document.getElementById("tieScore").textContent = ++_privateTie;
            _privateSetFinish = 1;
            winner="tie";
        }
        if(winner=="P1"||winner=="P2"){
            blinkWinner(index);
        }
    }

    function privateRandomP2(){
        var rnd = 0;
        while(_privateGameBoard[rnd]!=0){
            rnd = Math.floor(Math.random() * 10);
            if(rnd>8){rnd=8;}
        }
        _privateGameBoard[rnd]=6;
        _privateTurn="P1";
        document.getElementById("P1Ind").style.background = "#333333";
        document.getElementById("P2Ind").style.background = "#000000";
        setTimeout(function(){
            privateAddImage(rnd);
        },150);
        
    }

    function publicShowBoard() {
        if(Player2.getType()=="player"){
            document.getElementById("2P").style.backgroundColor = "#333333";
            document.getElementById("1P").style.backgroundColor = "#000000";
        }
        else if(Player2.getType()=="comp"){
            document.getElementById("1P").style.backgroundColor = "#333333";
            document.getElementById("2P").style.backgroundColor = "#000000";
        }
        while(container.hasChildNodes()){
            container.removeChild(container.firstChild);
        }
        for(let i = 0; i<9; i++){
            const square = document.createElement('div');
            container.appendChild(square);
            square.id = i;
            square.classList.add("box");
            switch (i){
                case 0:
                    square.classList.add("borderRight", "borderBottom");break;
                case 1:
                    square.classList.add("borderLeft", "borderRight", "borderBottom");break;
                case 2:
                    square.classList.add("borderLeft", "borderBottom");break;
                case 3:
                    square.classList.add("borderRight", "borderTop", "borderBottom");break;
                case 4:
                    square.classList.add("borderLeft", "borderRight", "borderTop", "borderBottom");break;
                case 5:
                    square.classList.add("borderLeft", "borderTop", "borderBottom");break;
                case 6:
                    square.classList.add("borderRight", "borderTop");break;
                case 7:
                    square.classList.add("borderLeft", "borderRight", "borderTop");break;
                case 8:
                    square.classList.add("borderLeft", "borderTop");break;
            }
            if(_privateTurn=="P2"){
                privateRandomP2();
            }
            square.addEventListener('click',function(e){
                if((_privateGameBoard[i]==0)&&(_privateSetFinish==0)){
                    if(_privateTurn=="P1"){
                        _privateGameBoard[i] = 1;
                        _privateTurn="P2";
                        document.getElementById("P1Ind").style.background = "#000000";
                        document.getElementById("P2Ind").style.background = "#333333";
                        privateAddImage(i);
                        privateCheckWin();
                        if(Player2.getType()=="comp"&&_privateSetFinish!=1){
                            var temp = privateRandomP2();
                        }
                    }
                    else if(_privateTurn=="P2"){
                        _privateGameBoard[i] = 6;
                        _privateTurn="P1";
                        document.getElementById("P1Ind").style.background = "#333333";
                        document.getElementById("P2Ind").style.background = "#000000";
                        privateAddImage(i);
                        var temp = privateCheckWin();
                    }
                }
                else if(_privateSetFinish==1){
                    _privateGameBoard=[0,0,0,0,0,0,0,0,0];
                    _privateSetFinish=0;
                    publicShowBoard();
                }
            });
        }
    }

    function minimax(currentBoard,possibleMove,turn){
        var tempBoard = currentBoard;
        for(let i = 0; i<possibleMove.length; i++){
            if(turn=="P1"){
                tempBoard[possibleMove[i]] = 3;
            }
            else if(turn=="P2"){
                tempBoard[possibleMove[i]] = 6;
            }
            var winner = privateCheckWin(tempBoard);
        }
    }

    return {
        publicShowBoard,
        publicReset
    };
})();


document.querySelectorAll('#scores').forEach(item =>{
    item.addEventListener('click', function(e){
        gameBoard.publicReset();
    });    
});

document.getElementById("opponentType").addEventListener('click', function(e){
    if(Player2.getType()=="player"){
        Player2.setType("comp");
    }
    else if(Player2.getType()=="comp"){
        Player2.setType("player");
    }
    gameBoard.publicReset();
})

gameBoard.publicShowBoard();