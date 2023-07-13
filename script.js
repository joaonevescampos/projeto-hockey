const canvasE1 = document.querySelector('canvas'), canvasCtx = canvasE1.getContext('2d');

function setup(){
    canvasE1.width =  canvasCtx.width = window.innerWidth;
    canvasE1.height =  canvasCtx.height = window.innerHeight;
}

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

    draw: function(){
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
    }
}

const raqueteDireita = {
    x: campo.w - linha.w - 10,
    y: 100,
    w: 10,
    h: 150,

    draw: function(){
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
    }
}

const bolinha = {
    x: 200,
    y: 300,
    r: 20,

    draw: function(){
        canvasCtx.fillStyle = '#000'

        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()
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

function draw(){
    campo.draw()
    linha.draw()
    raqueteEsquerda.draw()
    raqueteDireita.draw()
    bolinha.draw()
    placar.draw()
}

setup()
draw()