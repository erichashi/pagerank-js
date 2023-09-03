function canvas_arrow(fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}


function Arrow(sitefrom, siteto, double=false){

    //por que nao so x e y? para atualizar a localizacao ao mover
    this.sitefrom = sitefrom;
    this.siteto = siteto;
    this.color = 'black';
    
    this.headlen = 10; // length of head in pixels  

    this.double = double;

    if(this.double === UP){
        this.yto = this.siteto.y - 10;
        this.yfrom = this.sitefrom.y - 10;
    } else if(this.double === DOWN){
        this.yto = this.siteto.y + 10;
        this.yfrom = this.sitefrom.y + 10;
    } else {
        this.yto = this.siteto.y ;
        this.yfrom = this.sitefrom.y ;
    }

    this.dx = this.siteto.x - this.sitefrom.x;
    this.dy = this.yto - this.yfrom;
    
    this.angle = Math.atan2(this.dy, this.dx);


    this.update = (ok) => {
        
        if(mousedown || ok){
            if(this.double === UP){
                this.yto = this.siteto.y - 10;
                this.yfrom = this.sitefrom.y - 10;
            } else if(this.double === DOWN){
                this.yto = this.siteto.y + 10;
                this.yfrom = this.sitefrom.y + 10;
            } else {
                this.yto = this.siteto.y ;
                this.yfrom = this.sitefrom.y ;
            }

            this.dx = this.siteto.x - this.sitefrom.x;
            this.dy = this.yto - this.yfrom;
            
            this.angle = Math.atan2(this.dy, this.dx);
        }    

        this.draw();
    }

    this.draw = () => {
        ctx.beginPath();
        ctx.moveTo(this.sitefrom.x, this.yfrom);
        ctx.lineTo(this.siteto.x, this.yto);
        ctx.lineTo(this.siteto.x - this.headlen * Math.cos(this.angle - Math.PI / 6), this.yto - this.headlen * Math.sin(this.angle - Math.PI / 6));
        ctx.moveTo(this.siteto.x, this.yto);
        ctx.lineTo(this.siteto.x - this.headlen * Math.cos(this.angle + Math.PI / 6),this.yto - this.headlen * Math.sin(this.angle + Math.PI / 6));

        ctx.lineWidth = 4;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }

}