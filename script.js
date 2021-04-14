const Player = (name) => {
    let score = 0;
    let type = 'player';
    const win = () =>{
        score++;
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
    var _privateFirstTurn = "P1";

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

    function privateP1Win(){
        Player1.win(); 
        document.getElementById("P1Score").textContent = Player1.getScore();
    }
    function privateP2Win(){
        Player2.win(); 
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

    function privateCheckWin(_privateGameBoard){
        var index = [0,0,0];
        var winner = "XX";
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
            winner="tie";
        }
        return([winner,index]);
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
            square.addEventListener('click',function(e){
                if((_privateGameBoard[i]==0)&&(_privateSetFinish==0)){
                    if(_privateTurn=="P1"){
                        _privateGameBoard[i] = 1;
                        _privateTurn="P2";
                        document.getElementById("P1Ind").style.background = "#000000";
                        document.getElementById("P2Ind").style.background = "#333333";
                        privateAddImage(i);
                        var checkWin = privateCheckWin(_privateGameBoard);
                        if(checkWin[0]=="P1"||checkWin[0]=="P2"){
                            _privateSetFinish = 1;
                            blinkWinner(checkWin[1]);
                        }
                        else if(checkWin[0]=="tie"){
                            _privateSetFinish = 1;
                        }
                        if(Player2.getType()=="comp"&&_privateSetFinish!=1){
                            var moves = privatePossibleMoves();
                            var move = privateMinimax(_privateGameBoard,moves,"P2","P2");
                            console.log(_privateSetFinish);
                            _privateGameBoard[move[0]]=6;
                            _privateTurn="P1";
                            document.getElementById("P1Ind").style.background = "#333333";
                            document.getElementById("P2Ind").style.background = "#000000";
                            setTimeout(function(){
                                privateAddImage(move[0]);
                            },150);
                            //privateRandomP2();
                            setTimeout(function(){
                                var checkWin = privateCheckWin(_privateGameBoard);
                                if(checkWin[0]=="P1"||checkWin[0]=="P2"){
                                    _privateSetFinish = 1;
                                    blinkWinner(checkWin[1]);
                                }
                                else if(checkWin[0]=="tie"){
                                    _privateSetFinish = 1;
                                }
                            },200);
                        }
                        console.log(_privateSetFinish);
                    }
                    else if(_privateTurn=="P2"){
                        _privateGameBoard[i] = 6;
                        _privateTurn="P1";
                        document.getElementById("P1Ind").style.background = "#333333";
                        document.getElementById("P2Ind").style.background = "#000000";
                        privateAddImage(i);
                        var checkWin = privateCheckWin(_privateGameBoard);
                        if(checkWin[0]=="P1"||checkWin[0]=="P2"){
                            _privateSetFinish = 1;
                            blinkWinner(checkWin[1]);
                        }
                        else if(checkWin[0]=="tie"){
                            _privateSetFinish = 1;
                        }
                    }
                }
                else if(_privateSetFinish==1){
                    _privateGameBoard=[0,0,0,0,0,0,0,0,0];
                    _privateSetFinish=0;
                    publicShowBoard();
                    _privateFirstTurn = "P1";
                }
            });
        }
        if((_privateTurn=="P2")&&(Player2.getType()=="comp")){
            _privateFirstTurn = "P2";
            var moves = privatePossibleMoves();
            var move = privateMinimax(_privateGameBoard,moves,"P2","P2");
            _privateGameBoard[move[0]]=6;
            _privateTurn="P1";
            document.getElementById("P1Ind").style.background = "#333333";
            document.getElementById("P2Ind").style.background = "#000000";
            setTimeout(function(){
                privateAddImage(move[0]);
            },150);
            //privateRandomP2();
        }
    }

    function privatePossibleMoves(){
        var moves=[]
        for(let i=0; i<_privateGameBoard.length; i++){
            if(_privateGameBoard[i]==0){
                moves.push(i);
            }
        }
        return moves;
    }

    function privateMinimax(currentBoard,possibleMove,turn,step,firstTurn){
        var tempBoard = currentBoard.slice();
        var nextTurn;
        var tempStep;
        if((possibleMove.length>7)&&(currentBoard[4]==0)){
            return [4,0,10];
        }
        else if(possibleMove.length<2){
            return [possibleMove[0], 0, 0];
        }
        else if((possibleMove.length>1)&&(possibleMove.length<9)){
            var moves = [];
            tempStep = ++step;
            for(let i = 0; i<possibleMove.length; i++){
                if(turn=="P1"){
                    tempBoard[possibleMove[i]] = 1;
                    nextTurn="P2";
                }
                else if(turn=="P2"){
                    tempBoard[possibleMove[i]] = 6;
                    nextTurn="P1";
                }
                console.log("inside"+_privateSetFinish);
                var winner = privateCheckWin(tempBoard);
                console.log("afterinside"+_privateSetFinish);
                if(winner[0]=="P1"){
                    moves.push([possibleMove[i],step,-10]);
                }
                else if(winner[0]=="P2"){
                    moves.push([possibleMove[i],step,10]);
                    return [possibleMove[i],step,10];
                }
                else if(winner[0]=="tie"){
                    moves.push([possibleMove[i],step,0]);
                }
                else if(winner[0]="XX"){
                    var nextPossible = possibleMove.slice();
                    nextPossible.splice(i,1);
                    moves.push(privateMinimax(tempBoard,nextPossible,nextTurn,tempStep,firstTurn));
                }
            }
            var fastestWin = [10, 0];
            var fastestDraw = [10, 0];
            for(let k = 0; k<moves.length; k++){
                if((moves[k][2]==0)&&(moves[k][1]<fastestDraw)){
                    fastestDraw = [moves[k][1], moves[k][0]];
                }
                else if((moves[k][2]==10)&&(moves[k][1]<fastestWin)){
                    fastestWin = [moves[k][1], moves[k][0]];
                }
            }                
            if(firstTurn=="P2"){
                if(fastestWin[0]<=fastestDraw[0]){
                    return [fastestWin[1], fastestWin[0], 10];
                }
                else{
                    return [fastestDraw[1], fastestDraw[0], 10];
                }
            }
            else if(firstTurn="P1"){
                return [fastestDraw[1], fastestDraw[0], 10];
            }
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