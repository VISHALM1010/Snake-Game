let inputdirection = {x:0,y:0};

const foodmusic=new Audio("MUSICMP3/food.mp3");
const gameover=new Audio("MUSICMP3/gameover.mp3");
const move=new Audio("MUSICMP3/move.mp3");
const music =new Audio("MUSICMP3/music  .mp3");



let lasttime=0;

let speed=5 ;

let score =0;
 

let snakeArr=[
    {x:14,y:13}
]

let food = {x:8,y:8};








function main ( currenttime ){

window.requestAnimationFrame(main);



if((currenttime-lasttime )/1000<1/speed){

    return ;
}

lasttime=currenttime;

gameengine();





}

function iscollide(snake){


    for(let i =1;i<snakeArr.length;i++){

        if(snake[i].x===snake[0].x && snake[i].y === snake[0].y){

            return true;
        }


    }

    if(snake[0].x<=0 || snake[0].x>=30 ||  snake[0].y<=0 || snake[0].y>=30){

        return true;
    }

    return false;

   
}



function gameengine() {

if(iscollide(snakeArr)){

    gameover.play();

    music.pause();

    inputdirection = {x:0,y:0};

    alert("Game Over : Press Any Key To Play Again ");

     snakeArr=[
        {x:14,y:13}
    ]

    music.play();

    score=0;

    scoreBox.innerHTML="Score : "+score;




}


if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){

    foodmusic.play();

    score += 1;

    if(score>hiscoreval){

        hiscoreval=score;

    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));

    highscoreBox.innerHTML="high Score :"+hiscoreval;





    }

    scoreBox.innerHTML="Score : "+score;


    snakeArr.unshift({x:snakeArr[0].x+inputdirection.x,y:snakeArr[0].y+inputdirection.y});

    let b=23; 
    let a =2;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}

}


for(let i = snakeArr.length-2;i>=0;i--){

    snakeArr[i+1]={...snakeArr[i]};
}

snakeArr[0].x+=inputdirection.x;
snakeArr[0].y+=inputdirection.y;
   

    board.innerHTML="";

    snakeArr.forEach((e,index)=>{

        snakeElement=document.createElement("div");

snakeElement.style.gridRowStart=e.y;
snakeElement.style.gridColumnStart=e.x;


if(index==0){
    snakeElement.classList.add("head");


}

else{

    snakeElement.classList.add("snaketell");

}



board.appendChild(snakeElement);

    });


    foodElement=document.createElement("div");

    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    
    foodElement.classList.add("food");
     
    board.appendChild(foodElement);


    
}





music.play();
let hiscore=localStorage.getItem("highscoreBox");

if(hiscore===null){

    hiscoreval=0;


    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}

else {
hiscoreval=JSON.parse(hiscore)
    highscoreBox.innerHTML="high Score :"+hiscore;
}


window.requestAnimationFrame(main);


window.addEventListener("keydown",(e)=>{

 inputdirection={x:0,y:0};

 move.play();


    let changedDirection = false;

    switch(e.key){
        case "ArrowUp":
            if(inputdirection.y!==1){
                inputdirection.x=0;
                inputdirection.y=-1;
                changedDirection = true;
            }
            break;

        case "ArrowDown":
            if(inputdirection.y!==-1){
                inputdirection.x=0;
                inputdirection.y=1;
                changedDirection = true;
            }
            break;

        case "ArrowLeft":
            if(inputdirection.x!==1){
                inputdirection.x=-1;
                inputdirection.y=0;
                changedDirection = true;
            }
            break;

        case "ArrowRight":
            if(inputdirection.x!==-1){
                inputdirection.x=1;
                inputdirection.y=0;
                changedDirection = true;
            }
            break;
    }

    if(changedDirection){
        move.play();
    }
});

