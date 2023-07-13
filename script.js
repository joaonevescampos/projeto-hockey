const canvasE1 = document.querySelector('canvas'), canvasCtx = canvasE1.getContext('2d');

function setup(){
    canvasE1.width =  canvasCtx.width = window.innerWidth;
    canvasE1.height =  canvasCtx.height = window.innerHeight;
}

function draw(){
    // cor do campo
    canvasCtx.fillStyle = '#d6e2e6'
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    //desenho a linha do meio campo
    const lineWidth = 10
    canvasCtx.fillStyle = '#00000052'

    canvasCtx.fillRect(window.innerWidth / 2 - lineWidth / 2, 0, lineWidth, window.innerHeight)

    //desenho da raquete esquerda

    canvasCtx.fillRect(10, 100, lineWidth, 150)

    //desenho da raquete direita

    canvasCtx.fillRect(window.innerWidth - lineWidth - 10, 100, lineWidth, 150)

    //desenho da bolinha

    canvasCtx.fillStyle = '#000'

    canvasCtx.beginPath()
    canvasCtx.arc(200, 300, 20, 0, 2 * Math.PI, false)
    canvasCtx.fill()

    //desenho do placar 
    canvasCtx.font = 'bold 40px Arial'
    canvasCtx.textAlign = 'center'
    canvasCtx.textBaseline = 'top'
    canvasCtx.fillStyle = '#fff'
    canvasCtx.fillText('3', window.innerWidth/4, 30)
    canvasCtx.fillText('5', 3 * window.innerWidth/4, 30)

}

setup()
draw()