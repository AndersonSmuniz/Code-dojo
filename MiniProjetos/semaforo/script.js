const imagem = document.getElementById( 'img' );
const buttons = document.getElementById( 'buttons' );
let mincor = 0;
let intervalId = null;

const luz = (event) =>{
    stop();
    ligado[event.target.id]();
}
const proxcor = () =>{
    mincor = mincor < 2 ? ++mincor: 0;
}

const auto = () => {
    const cores = ['red', 'yellow', 'green'];
    const cor = cores[mincor];
    ligado [ cor ] ();
    proxcor();
}
const stop = () => {
    clearInterval ( intervalId );
}
const ligado = {
    'red': () => imagem.src = ('semaforo/semaforored.png'),
    'yellow': () => imagem.src = ('semaforo/semaforoyellow.png'),
    'green': () => imagem.src = ('semaforo/semaforogreen.png'),
    'automatic': () => intervalId = setInterval(auto, 1000)
}

buttons.addEventListener('click', luz);