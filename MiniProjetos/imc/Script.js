const calcular = document.getElementById('calcular');


function imc() {
    const nome = document.getElementById('nome').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const resultado = document.getElementById('resultado');

    resultado.textContent = '';
    if (nome !== '' && altura !== '' && peso !== '') {
        const resIMC = (peso / (altura * altura)).toFixed(2);
        resultado.textContent = `${nome} seu IMC é ${resIMC}, e você está `;
        let classificacao = '';

        if (resIMC < 18.5) {
            classificacao = 'abaixo do peso'
        }
        else if (resIMC < 24.99) {
            classificacao = 'no peso ideal'
        }
        else if (resIMC < 29.99) {
            classificacao = 'um pouco acima do peso'
        } else {
            classificacao = 'muito acima do peso'
        }
        resultado.textContent += `${classificacao}`;
    } else {
        resultado.textContent = 'Preencha todos os campos!!'
    }
    

}

/*Adiciona um ouvinte de eventos ao elemento "calcular" 
que aciona a função "imc" quando o usuário clica nele.*/
calcular.addEventListener('click', imc);