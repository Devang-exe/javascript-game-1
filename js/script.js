//challenge-1 Age in days

function AgeinDays() {

    var presentyear = prompt("Enter the present year: ")
    var birthyear = prompt("Enter your birth year: ");
    
    var ageInDayss = (presentyear-birthyear)*365;
    var ageinyears = (presentyear-birthyear);

    var count=0;

    for(let i=birthyear;i<presentyear;i++)
    {
        if(i%4==0)
        {
            count++;
        }
    }

    ageInDayss=ageInDayss+count;

    //console.log(ageInDayss)

    var h1 = document.createElement('h1');
    var h2 = document.createElement('h1');
    var textAnswer1 = document.createTextNode('You are '+ ageInDayss  + ' Days old'+' & '+ageinyears +' Years old');
    var textAnswer2 = document.createTextNode('There are ' + count + ' leap years'); 
    h1.setAttribute('id','ageinDays');
    h2.setAttribute('id','ageinDays1');
    h1.appendChild(textAnswer1);
    h2.appendChild(textAnswer2);
    document.getElementById('flex-box-result1').appendChild(h1);
    document.getElementById('flex-box-result2').appendChild(h2);
}

function reset1() {
    document.getElementById('ageinDays').remove();
    document.getElementById('ageinDays1').remove();

}

//challenge 2: Cat generator

function generateCat(){

    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);

}

//challenge 3: Rock paper Scissor

function rpsGame(yourchoice) {
    //console.log(yourchoice);
    var humanchoice, botchoice;
    humanchoice=yourchoice.id;
    botchoice=numberTochoice(randTorps());
    //console.log('computer choice',botchoice);
    results=decideWinner(humanchoice, botchoice);
    //console.log(results);
    message = finalMessage(results)
    rpsfrontend(yourchoice.id,botchoice,message);
      
}

function randTorps(){
    return Math.floor(Math.random()*3);
}

function numberTochoice(number) {
    return ['rock' , 'paper' , 'scissors'] [number];
}

function decideWinner(yourchoice, computerchoice) {
    var rpsdatabase = {
        'rock': {'scissors': 1,'rock': 0.5, 'paper':0},
        'paper': {'rock': 1,'paper': 0.5, 'scissors':0},
        'scissors': {'paper': 1,'scissors': 0.5, 'rock':0},
    };

var yourscore = rpsdatabase[yourchoice][computerchoice];
var computerscore = rpsdatabase[computerchoice][yourchoice];

return [yourscore,computerscore];
}

function finalMessage([yourscore,computerscore]){
    if(yourscore === 0){
        return{'message': 'You Lost' , 'color' : 'red'};
    }

    else if(yourscore == 0.5) {
        return{'message' : 'Tied' , 'color':'yellow'};
    }

    else 
    {
        return{'message': 'You Won ', 'color':'green'};
    }
}

function rpsfrontend(humanimagechoice,botimagechoice,finalMessage) {
    var imagedatabase ={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humandiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var messagediv = document.createElement('div');

    humandiv.innerHTML="<img src ='" + imagedatabase[humanimagechoice] + "' height=150 width=150 style='box-shadow: 0px 10px 100px blue;'>"
    messagediv.innerHTML="<h1 style='color : " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage ['message'] + "</h1>"
    botdiv.innerHTML="<img src ='" + imagedatabase[botimagechoice] + "' height=150 width=150 style='box-shadow: 0px 10px 100px red;'>" 

    document.getElementById('flex-box-rps-div').appendChild(humandiv);
    document.getElementById('flex-box-rps-div').appendChild(messagediv);
    document.getElementById('flex-box-rps-div').appendChild(botdiv);
}


// Challenge 4: Change the colors of the buttons

var all_buttons=document.getElementsByTagName('button');

var copyallbuttons = [];
for(let i=0;i<all_buttons.length;i++)
{
    copyallbuttons.push(all_buttons[i].classList[1]);
}

function buttoncolorchange(buttonthingy)
{
    if(buttonthingy.value==='red'){
        buttonred();
    }
    else if(buttonthingy.value==='green'){
        buttongreen();
    }
    else if(buttonthingy.value==='reset'){
        buttoncolorreset();
    }
    else if(buttonthingy.value==='random'){
        randomcolors();
    }
}

function buttonred(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttongreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttoncolorreset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyallbuttons[i]);
    }
}

function randomcolors(){

    var choices=['btn-primary','btn-danger','btn-warning','btn-success']
    
    for(let i=0;i<all_buttons.length;i++){
      //  var randomnumbers = 

        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }
}


//Challenge-5: BlackJack


let blackjackgame={
    'you': {'scorespan':'#your-blackjack-result','div':'#your-box','score': 0},
    'dealer': {'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score': 0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsmap':{'2': 2,'3': 3,'4': 4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isstand': false,
    'turnsover': false,
};

const YOU = blackjackgame['you']
const DEALER =blackjackgame['dealer']   
const hitsound=new Audio('sounds/swish.m4a');
const winsound=new Audio('sounds/cash.mp3');
const losssound=new Audio('sounds/aww.mp3');
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackdeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerlogic);

function blackjackhit(){
    if(blackjackgame['isstand'] === false){
        let card = randomcard();
        showcard(card,YOU);
        updatescore(card,YOU);
        showscore(YOU);
        console.log(YOU['score']);
    }
}

function randomcard(){
    let randomindex = Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomindex];
}

function showcard(card,activeplayer){
    if(activeplayer['score']<=21){
        let cardimage = document.createElement('img');
    cardimage.src = `images/${card}.png` ; // backtick and stringtemplating
    document.querySelector(activeplayer['div']).appendChild(cardimage);
    hitsound.play();
    }
    
    
}

function blackjackdeal()
{   
    if (blackjackgame['turnsover'] === true){

        blackjackgame['isstand'] = false;

        //showresult(computewinner()); if you wanna 2 player 
        let yourimages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for(i=0;i<yourimages.length;i++){
            yourimages[i].remove();
        }
        for(i=0;i<dealerimages.length;i++){
            dealerimages[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;

        document.querySelector('#your-blackjack-result').style.color='#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

        document.querySelector('#blackjack-result').textContent="Let's Play";
        document.querySelector('#blackjack-result').style.color='black';
        blackjackgame['turnsover'] = true ;
    }
}



function updatescore(card, activeplayer){
    //if adding 11 keeps me below 21,add 11. otherwise, add 1;
    if (card === 'A') {

        if (activeplayer['score'] + blackjackgame['cardsmap'][card][1] <= 21) {
             activeplayer['score'] +=blackjackgame['cardsmap'][card][1];
        }else{
            activeplayer['score'] += blackjackgame['cardsmap'][card][0];
        }
    }
    else{
        activeplayer['score'] += blackjackgame['cardsmap'][card];
    }
}

function showscore(activeplayer){
    if (activeplayer['score'] > 21){
        document.querySelector(activeplayer['scorespan']).textContent = 'BUST!';
    
        document.querySelector(activeplayer['scorespan']).style.color = 'red';
    }
    else{

        document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];//very important

    }
}
//time mappiing for bot to play his turns
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}
//async function to use the sleep function
async function dealerlogic(){
    blackjackgame['isstand'] = true;

    while(DEALER['score']<16 && blackjackgame['isstand'] === true){

        let card = randomcard();
        showcard(card,DEALER);   
        updatescore(card,DEALER);
        showscore(DEALER); 
        await sleep(1000); // sleep time

    }
    
    
    blackjackgame['turnsover'] = true;
    let winner = computewinner();
    showresult(winner);
    

}

//computes the winner and returns who just won
//update the wins, draws and losses
function computewinner() {
    let winner;

    if(YOU['score'] <=21 ) {
        //condition : higher score than dealer or when dealer busts you but you're 21 or under
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21) ){
            blackjackgame['wins']++;
            winner = YOU;

        }else if(YOU['score'] < DEALER['score']) {
            blackjackgame['losses']++;
            winner = DEALER;

        }else if(YOU['score'] === DEALER['score']) {
            blackjackgame['draws']++;

        }
    }
    //condition: when you are burst but dealer doesn't
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackgame['losses']++;
        winner=DEALER;
    }
    //condition: When you and the dealer bursts
    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackgame['draws']++;
    }

    console.log('Winner is:', winner);

    return winner;
}


function showresult(winner) {

    let message ,messagecolor;

    if(blackjackgame['turnsover'] === true){

        if(winner === YOU){
            document.querySelector('#wins').textContent=blackjackgame['wins'];
            message='YOU WON!';
            messagecolor='green';
            winsound.play();
        }
        else if(winner === DEALER)
        {
            document.querySelector('#losses').textContent=blackjackgame['losses'];
            message='YOU LOST!';
            messagecolor='red';
            losssound.play();
        }
        else
        {
            document.querySelector('#draws').textContent=blackjackgame['draws'];
            message = 'YOU DREW!';
            messagecolor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messagecolor;

    }

    

}

