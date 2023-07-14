const canvasEl = document.querySelector('canvas'), canvasCtx = canvasEl.getContext('2d');


function setup(){
    canvasEl.width =  canvasCtx.width = window.innerWidth;
    canvasEl.height =  canvasCtx.height = window.innerHeight;
}

const mouse = {x: 0, y: 0}

// Configurando campo do jogo
const campo = {
    w: window.innerWidth,
    h: window.innerHeight,
    espaco: 10,
    draw: function(){
        canvasCtx.fillStyle = '#d6e2e6'
        canvasCtx.fillRect(0, 0, this.w, this.h)
    }
}
 // Configurando linha central do campo
const linha = {
    w: 10,

    draw: function(){
        canvasCtx.fillStyle = '#00000030'
        canvasCtx.fillRect(campo.w / 2 - this.w / 2, 0, this.w, campo.h)
    }
}

 // Configurando centro circulo do campo
 const centro = {
    x: campo.w / 2,
    y: campo.h / 2,
    r: 100,

    draw: function(){
        canvasCtx.fillStyle = '#00000030'
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()
    }
 }


  // Configurando semi-circulo esquerdo
  const semiCirculoEsquerdo = {
    x: 0,
    y: campo.h / 2,
    r: campo.h / 4,

    draw: function(){
        canvasCtx.fillStyle = '#00000020'
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 3 * Math.PI / 2, Math.PI / 2, false)
        canvasCtx.fill()
    }
 }

  // Configurando semi-circulo direito
  const semiCirculoDireito = {
    x: campo.w,
    y: campo.h / 2,
    r: campo.h / 4,

    draw: function(){
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, Math.PI / 2, 3 * Math.PI / 2, false)
        canvasCtx.fill()
    }
 }

//configurando raquete esquerda (jogador)

const raqueteEsquerda = {
    
    x: campo.espaco,
    y: 100,
    w: 10,
    h: 120,

    _mover: function() {
        this.y = mouse.y - this.h / 2
    },

    draw: function(){
        canvasCtx.fillStyle = '#00000060'
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        this._mover()
    }
}

//configurando raquete direita (pc)

const raqueteDireita = {
    x: campo.w - linha.w - campo.espaco,
    y: 100,
    w: 10,
    h: 120,
    velocidade: 1,
    

    _mover: function(){
        if(this.y + this.h / 2 < bolinha.y + bolinha.r){
            this.y += this.velocidade
        }else{
            this.y -= this.velocidade
        }
        
    },

    draw: function(){
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        this._mover()
    }
}

// Configurando placar do jogo
const placar = {
    jogador: 0,
    pc: 0,

    pontosJogador: function(){
        this.jogador ++
    },

    pontosPc: function(){
        this.pc ++
    },

    voceGanhou: function () {
        canvasCtx.fillStyle = '#1fc01f'
        canvasCtx.fillRect(0, 0, campo.w, campo.h)
        canvasCtx.fillStyle = '#fff'
        canvasCtx.font = 'bold 40px Arial'
        canvasCtx.textAlign = 'center'
        canvasCtx.textBaseline = 'top'
        canvasCtx.fillText('Você Ganhou!', campo.w / 2, 200)
        canvasCtx.font = 'bold 20px Arial'
        canvasCtx.fillText('Recarregue a página com F5 para jogar novamente!', campo.w / 2, 300)
    },

    vocePerdeu: function () {
        canvasCtx.fillStyle = '#000'
        canvasCtx.fillRect(0, 0, campo.w, campo.h)
        canvasCtx.fillStyle = '#ac0707'
        canvasCtx.font = 'bold 40px Arial'
        canvasCtx.textAlign = 'center'
        canvasCtx.textBaseline = 'top'
        canvasCtx.fillText('Você Perdeu!', campo.w / 2, 200)
        canvasCtx.font = 'bold 20px Arial'
        canvasCtx.fillText('Recarregue a página com F5 para jogar novamente!', campo.w / 2, 300)
    },


    draw: function(){
    canvasCtx.font = 'bold 40px Arial'
    canvasCtx.textAlign = 'center'
    canvasCtx.textBaseline = 'top'
    canvasCtx.fillStyle = '#00000070'
    canvasCtx.fillText(this.jogador, campo.w / 4, 30)
    canvasCtx.fillText(this.pc, 3 * campo.w / 4, 30)

    }
}

//Configurando bolinha do jogo

const bolinha = {
    x: 200,
    y: 300,
    r: 20,
    velocidade: 8,
    direcaoY : 1,
    direcaoX: 1,
    espaco: 10,


    _calcPosicao: function(){

        if(this.x > campo.w - this.r - raqueteEsquerda.w - this.espaco) {

            //se pc rebateu na bolinha, ela muda de direcao
            if(this.y + this.r > raqueteDireita.y && this.y - this.r < raqueteDireita.y + raqueteDireita.h){
                this._reverterX()

            // se pc não rebateu, jogador fez um ponto
            }else{
                placar.pontosJogador()
                this._pontuou()

            }
        }

        
        if(this.x < this.r + raqueteEsquerda.w + campo.espaco){
            //se o jogador rebateu, a bolinha muda de direção
            if(this.y + this.r> raqueteEsquerda.y && this.y - this.r < raqueteEsquerda.y + raqueteEsquerda.h){
                this._reverterX()

            } else{
                placar.pontosPc()
                this._pontuou()
            }

        }

        //se a bolinha bater nas parede superior ou inferior, ela muda de direção
        if((this.y - this.r < 0 && this.direcaoY < 0) || (this.y > campo.h - this.r && this.direcaoY > 0)){
            this._reverterY()
        }
    },

    _reverterX: function(){
        this.direcaoX *= -1
    },

    _reverterY: function(){
        this.direcaoY *= -1
    },

    _pontuou: function(){
        if(this.velocidade < 16){
            raqueteDireita.velocidade += 3
            this.velocidade += 2

        }else{
            this.velocidade += 0.5
        }
        this.x = campo.w / 2
        this.y = campo.h / 2
    },

    _mover: function(){
        this.x += this.direcaoX * this.velocidade
        this.y += this.direcaoY * this.velocidade

    },

    draw: function(){
        canvasCtx.fillStyle = '#000'

        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()

        this._calcPosicao()
        this._mover()
        
    },

}

function draw(){
    campo.draw()
    linha.draw()
    centro.draw()
    semiCirculoEsquerdo.draw()
    semiCirculoDireito.draw()
    raqueteEsquerda.draw()
    raqueteDireita.draw()
    placar.draw()
    bolinha.draw()


    if(placar.jogador >= 5 ){
        placar.voceGanhou()

    }else if(placar.pc >= 5){
        placar.vocePerdeu()
    }
        
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

})


