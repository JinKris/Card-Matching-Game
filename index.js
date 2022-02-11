/*resource*/
const board = document.querySelector('.board');
const strBtn = document.querySelector('button')
const scoreTxt = document.querySelector('.score')
let selectedCard = []; 
let selectCount = 0;
let score = 0;
let  cardList = [
    { card:0,display:0,isOpen:false},
    { card:1,display:0,isOpen:false},
    { card:2,display:0,isOpen:false},
    { card:3,display:0,isOpen:false},
    { card:4,display:0,isOpen:false},
    { card:5,display:0,isOpen:false},
    { card:6,display:0,isOpen:false},
    { card:7,display:0,isOpen:false}
]

// BOARD init
function init() {
    let cardNum;
    for (let i = 0; i < 16;) {
        cardNum = Math.floor(Math.random()*8); //0~7
        if(cardList[cardNum]['display']<2){
            const cards = document.createElement("div");
            cards.classList.add('cards')
            cards.setAttribute('id',`${cardNum}`)

            const front = document.createElement('div');
            front.classList.add("front");
            const fImg = document.createElement('img');
            fImg.setAttribute('class','frontImg top-0');
            fImg.setAttribute('src',`./img/${cardNum}.png`)
            front.appendChild(fImg);

            const back = document.createElement("div");
            back.classList.add("back");
            const bImg = document.createElement('img');
            bImg.setAttribute('class','backImg top-50');
            bImg.setAttribute('src','./img/back.png');
            back.appendChild(bImg);

            cards.appendChild(back);
            cards.appendChild(front);
            board.append(cards);

            cardList[cardNum]['display']++;
            i++;
        }
    }
};

//card select 
function select(e){
    const card = e.target.parentNode.parentNode;
    const id = e.target.parentNode.parentNode.id;
    if(cardList[card.id]['isOpen']===false && selectCount<2){
        card.setAttribute('class','cards selected')
        selectedCard.push(id);
        selectCount ++;

        slideUp(card)

        if(selectCount===2){
            setTimeout(compare,700);}
    }
}

// Compare
function compare(){
    let card1 = document.getElementsByClassName('cards selected')[0]
    let card2 = document.getElementsByClassName('cards selected')[1]
    if(selectedCard[0]===selectedCard[1]){ 
        score++;
        cardList[card1.id]['isOpen']=true
    }else if (selectedCard[0]!==selectedCard[1]){
        slideDown(card1);
        slideDown(card2);
    }
    card1.setAttribute('class','cards');
    card2.setAttribute('class','cards');
    selectedCard=[]
    selectCount=0;
    scoreTxt.innerText = `score : ${score}`;
}

//slide Down
function slideDown(card){
    card.firstChild.firstChild.setAttribute('class','backImg');
    card.lastChild.firstChild.setAttribute('class','frontImg');
}
//slide Up
function slideUp(card){
    card.firstChild.firstChild.setAttribute('class','backImg top-50');
    card.lastChild.firstChild.setAttribute('class','frontImg top-0');
}

//eventListener
function start(){
    document.querySelector('.board').setAttribute('class','board')
    strBtn.style.display='none';
    scoreTxt.innerText = `score : 0`;
    init();
    let time=3;
    let Timer = setInterval(()=>{
        document.querySelector('h1').innerText = `${time}`
        time--;
    },1000)
    setTimeout(()=>{
        document.querySelectorAll('.cards').forEach((elem)=>{
            slideDown(elem);
        });
        clearInterval(Timer);
        document.querySelector('h1').innerText = `CardMatching Game`
    },4000);
    for(let i=0;i<33;i++){
        let cards = document.querySelectorAll("img");
        cards[i].addEventListener('click',select)
    }
}

strBtn.addEventListener('click',start)

