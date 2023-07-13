const canvasEl = document.querySelector('canvas'), canvasCtx = canvasEl.getContext('2d');

function setup(){
    canvasEl.width =  canvasCtx.width = window.innerWidth;
    canvasEl.height =  canvasCtx.height = window.innerHeight;
}

const mouse = {x: 0, y: 0}
const campo = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw: function(){
        canvasCtx.fillStyle = '#d6e2e6'
        canvasCtx.fillRect(0, 0, this.w, this.h)
    }
}

const linha = {
    w: 10,

    draw: function(){
        canvasCtx.fillStyle = '#00000052'
        canvasCtx.fillRect(campo.w / 2 - this.w / 2, 0, this.w, campo.h)
    }
}

const raqueteEsquerda = {
    x: 10,
    y: 100,
    w: 10,
    h: 150,

    _mover: function() {
        this.y = mouse.y - this.h / 2
    },

    draw: function(){
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        this._mover()
    }
}

const raqueteDireita = {
    x: campo.w - linha.w - 10,
    y: 100,
    w: 10,
    h: 150,

    _mover: function(){
        this.y = bolinha.y
    },

    draw: function(){
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        this._mover()
    }
}

const placar = {
    draw: function(){
    canvasCtx.font = 'bold 40px Arial'
    canvasCtx.textAlign = 'center'
    canvasCtx.textBaseline = 'top'
    canvasCtx.fillStyle = '#fff'
    canvasCtx.fillText('3', campo.w / 4, 30)
    canvasCtx.fillText('5', 3 * campo.w / 4, 30)

    }
}

const bolinha = {
    x: 200,
    y: 300,
    r: 20,
    velocidade: 2,
    _mover: function(){
        this.x += 1 * this.velocidade
        this.y += 1 * this.velocidade

    },

    draw: function(){
        canvasCtx.fillStyle = '#000'

        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()

        this._mover()
    },

}

function draw(){
    campo.draw()
    linha.draw()
    raqueteEsquerda.draw()
    raqueteDireita.draw()
    placar.draw()
    bolinha.draw()
   
    
}

window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback){
            return window.setTimeout(callback, 1000 / 60)
        }
    )
})()

function main(){
    animateFrame(main)
    draw()
}

setup()
main()

canvasEl.addEventListener('mousemove', function(e){
    mouse.x = e.pageX
    mouse.y = e.pageY

    console.log(mouse)
})


