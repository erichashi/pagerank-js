const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const main = document.querySelector('main');

// Set width and heights
canvas.width = main.clientWidth;
canvas.height =(main.clientHeight * .9);

// Global letiables
let mouse = {
    x: undefined,
    y: undefined
}
let mousedown = false;

const COLORS = [
    "#2C3E50",
    "#E7C823",
    "#ECF0F1",
    "#3498DB",
    "#2980B9"
]

let pause = false;
let RADIUS = Math.floor(main.clientWidth/10);

const UP = 1;
const DOWN = 2;

// Event Listeners
// canvas.addEventListener('mousemove', e => {
//     mouse.x = e.x;
//     mouse.y = e.y;
// })

// window.addEventListener('resize',function(){
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     init();
// } )


document.addEventListener('keydown', e =>{
    if(e.keyCode === 32){
        pause = !pause
        update()
    };
});


// Initialization

let sites;
let arrows;

let drag = false;
let outsite = undefined;


let id = 0;

let trash = 0;

function init(){
    sites = [];
    arrows = [];

    for(let i = 0;i < 4; i++){
        let arr = placeWithoutColide();
        sites.push(new Site(arr[0], arr[1], RADIUS, randomColor(), id));
        id++;  
    }

    trash = new Trash(0, 0, 50, 50);
}

function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
  
    sites.forEach(site => {
        site.update();
    }); 

    arrows.forEach(arrow => arrow.update());

    if(drag && !outsite.removing){
        canvas_arrow(outsite.x, outsite.y, mouse.x, mouse.y);
    }

    if(!pause){   
        requestAnimationFrame(update);
    };
}

function restart(){
    init()
    update();
}



let corpus = {};
const damping_factor = 0.85;
function calculatePagerank(){
    corpus = {};
    sites.forEach(site => {
        corpus[site.id] = site.linkTo;
    });
    let pr = pagerank(corpus, damping_factor);
    sites.forEach(site => {
        gsap.to(site, {
            radius: pr[site.id]*100,
            duration: 1
        })
    }); 
}

function addSite(){
    let arr = placeWithoutColide();

    while(!arr){
        sites.forEach(site => site.radius--);
        RADIUS--;
        arr = placeWithoutColide();
    }

    sites.push(new Site(arr[0], arr[1], RADIUS, randomColor(),  id));
    id++;
}


function makeSmaller(){
    sites.forEach(site => site.radius-=2);
    RADIUS-=2;
}
function makeBigger(){
    sites.forEach(site => site.radius+=2);
    RADIUS+=2;
}


const tutorialcontainer = document.getElementById("tutorial-container");
const canvascontainer = document.getElementById('canvas-container');


function play(){
    tutorialcontainer.style.display = 'none';
    canvascontainer.style.display = 'flex';
    init();
    update()
}

