const sons = {
    'A' : 'boom.wav',
    'S' : 'clap.wav',
    'D' : 'hihat.wav',
    'F' : 'kick.wav',
    'G' : 'openhat.wav',
    'H' : 'ride.wav',
    'J' : 'snare.wav',
    'K' : 'tink.wav',
    'L' : 'tom.wav'

}

const divCreat = (text) =>{
    const div = document.createElement('div');
    div.classList.add('display');
    div.id = text;
    div.textContent = text;
    document.getElementById('conteiner').appendChild(div);
}

const exibir = (sons) => Object.keys(sons).forEach(divCreat);

exibir(sons);

const tocarSons = (letra) =>{
    const audio = new Audio(`./sons/${sons[letra]}`);
    audio.play();
}

const efeitoOn = (letra) => document.getElementById(letra).classList.add('active');

const efeitoOff = (letra) =>{
    const div = document.getElementById(letra);
    const removeActive = () => document.getElementById(letra)
                                       .classList.remove('active');
    div.addEventListener('transitionend', removeActive);
    
    }

const ativarDiv = (evento) =>{
    let letra;
    if (evento.type == 'click') {
        letra = evento.target.id;
    }else{
        letra = evento.key.toUpperCase();
    }
    const letraPermitida = sons.hasOwnProperty(letra)
    if (letraPermitida){
        efeitoOn(letra);
        efeitoOff(letra);
        tocarSons(letra);
    }

}

document.getElementById('conteiner').addEventListener('click', ativarDiv);

window.addEventListener('keydown', ativarDiv);