//criar fora do evento um vetor - variavel composta - ela recebe mais de um valor 
//let db = [];

document.querySelector('#cadastro').addEventListener('click', (w) => {
    w.preventDefault();
    let email = document.querySelector('#login').value;
    let senha = document.querySelector('#senha').value;
    if (email === '' || senha === ''){
        alert("preencha os campos")
    }else if (email != '' || senha != ''){
        salvar(email, senha);
    }
});
function salvar(e, s) {
    //verifica se tem dados no localstorage, se não, cria um vetor vazio
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    //crio um objeto
    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s
    }
    //jogo o objeto usuario dentro do vetor
    db.push(usuario);
    //salvo no localstorage agora um vetor que pode receber vários objetos
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'index.html';
}