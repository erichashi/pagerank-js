
addEventListener('mousemove', (e) => {
    if(!pause){
        mouse.x = e.offsetX; 
        mouse.y = e.offsetY;
    };
    
});
addEventListener('mousedown', () => {
    mousedown = true;
});

addEventListener('mouseup', () => {
    mousedown = false;
}) ;


addEventListener('touchstart', () => {
    mousedown = true;
});

addEventListener('touchend', () => {
    mousedown = false;
}) ;
addEventListener('touchmove', (e) => {
    if(!pause){
        mouse.x = e.touches[0].clientX; 
        mouse.y = e.touches[0].clientY;
    };
    
});


addEventListener('click', (e)=>{
    console.log('helloe');
    let fl = false;

    if(!pause)
    sites.forEach(site=>{

        //se clicou em algum site
        if(getDistance(site.x, site.y, mouse.x, mouse.y) <= site.radius){
            console.log('click');

            //se estava segurando seta e o site raiz (outsite) nao tem links ao novo site  e o site raiz nao eh o site clicado
            if(drag && outsite.linkTo.indexOf(site.id)<0 && outsite.id !== site.id){

                //puxe uma seta do outsite ao site
                let arrow = new Arrow(outsite, site);

                //conferir se ja existe uma seta ligando os dois, um vai e volta
                site.linkTo.forEach(link => {
                    if(link === outsite.id){
                        arrow.double = UP;
                        site.arrowsOut[0].double = DOWN;
                        
                        arrow.update(true);
                        site.arrowsOut[0].update(true);

                    }
                });

                //adicionar a seta a array
                arrows.push(arrow);
                
                //arrows out para pintar a seta de vermelho 
                outsite.arrowsOut.push(arrow);

                //linkTo para transformar em corpus
                outsite.linkTo.push(site.id);


            } else {

                console.log('here');

                fl=true;
                outsite = site;
            }
        }
    })

    fl ? drag = true : drag = false;
})
