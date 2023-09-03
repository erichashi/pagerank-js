
// // Helpers
function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1) + min);
}

function randomColor(){
    return COLORS[Math.floor(Math.random()*COLORS.length)];
}

function getDistance(x1, y1, x2, y2){
    let xdist = x2-x1;
    let ydist = y2-y1;

    return Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
};

function placeWithoutColide(){

    let loops = 0;

    let x = randomIntFromRange(RADIUS, canvas.width-RADIUS);
    let y = randomIntFromRange(RADIUS, canvas.height-RADIUS);
    
    for (let j = 0, len = sites.length; j < len; j++) {

        if (getDistance(x, y, sites[j].x, sites[j].y) - RADIUS * 2 < 0){
            x = randomIntFromRange(RADIUS, canvas.width-RADIUS);
            y = randomIntFromRange(RADIUS, canvas.height-RADIUS);

            loops++;

            if(loops > 500) return false

            j = -1;
        }        
    }

    return [x, y];
}

