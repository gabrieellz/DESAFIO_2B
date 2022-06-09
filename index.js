document.querySelector('#logar').addEventListener('click', (e)=>{
    e.preventDefault();
    entrar()
})
function entrar(){
    let usuario = document.querySelector('#login');
    let senha = document.querySelector('#senha');

    let listaUser = [];

    let usuarioValido = {
        login: '',
        senha: ''
    }
    listaUser = JSON.parse(localStorage.getItem('usuarios'));
    //vai varrer todos os itens
    listaUser.forEach(documento=>{
        if(usuario.value === documento.login && senha.value === documento.senha){
            usuarioValido = {
                id: documento.id,
                login: documento.login,
                senha: documento.senha
            }
        }
    })
    if(usuario.value === usuarioValido.login && senha.value === usuarioValido.senha){
        alert('deu certo')
        saveSession(usuarioValido.id);
        window.location.href ='home.html';
    }else{
        alert('deu errado')
    }
    console.log(usuarioValido);
}
function saveSession(data){
    if(saveSession){
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logado", JSON.stringify(data));
}
