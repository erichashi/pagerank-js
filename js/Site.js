function Site(x, y, radius, color, id){
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.hover = false;
    this.allowmove = true;
    this.linkTo = [];
    this.arrowsOut = [];
    this.removing = false;

    // this.link = new Link(this.x, this.y, this);

    this.update = function(){

        if(getDistance(this.x, this.y, mouse.x, mouse.y) <= this.radius) {
            this.hover = true;

            this.arrowsOut.forEach(arrow => {
                arrow.color = 'red';
            })

            if(mousedown && !drag){
                this.x = mouse.x;
                this.y = mouse.y;
            }
        } 
        
        else {
            sitedraging = false;
            this.hover = false;
            this.arrowsOut.forEach(arrow => {
                arrow.color = 'black';
            })
        };

        if(!this.hover && getDistance(this.x, this.y, trash.x, trash.y) - trash.width <= this.radius){
            this.removing = true;

            gsap.to(this, {
                radius: 0,
                onComplete: () => {
                    arrows.forEach((arr, arrindex) => {
                        if(arr.siteto.id === this.id || arr.sitefrom.id === this.id){
                            arrows.splice(arrindex, 1);
                        }
                    })
                    sites.forEach((site, sindex) => {
                        if(site.id === this.id){
                            sites.splice(sindex, 1);
                        }
                    });
                }
            });

        };
        
        
        this.draw();
    };

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        if(this.hover){
            ctx.fillStyle = 'red'
            ctx.fill();    
            // this.link.draw();
        } else{
            ctx.fillStyle = this.color
        } 
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fill();    
        ctx.closePath();
    }
}
