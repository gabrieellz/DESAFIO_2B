const form = document.querySelector('#informacoes');
const divErro = document.querySelector('#msg-erro');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;

let usuarioId = Number(sessionStorage.getItem('logado'));
const session = localStorage.getItem("session");

logadoOuNao();
function logadoOuNao() {
    if (session) {
        sessionStorage.setItem("log", session);
        usuarioId = session;
    }
}
console.log(usuarioId);
const atualizarLocalStorage = (produtos) => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
};

const recuperarLocalStorage = () => {
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    return produtos;
};
const salvarProduto = (event) => {
    event.preventDefault()
    console.log("passou pelo evento");
    divErro.innerHTML = "";
    const nome = form.nome.value;
    const preco = Number(form.preco.value);
    const prime = form.prime.checked;
    const erros = [];
    if (!nome || nome.length < 2) {
        erros.push("<p>Nome inválido</p>");
    }
    if (!preco || preco <= 0) {
        erros.push("<p>Preço inválido</p>");
    }
    if (erros.lenght > 0) {
        divErro.innerHTML = erros.join("");
        return;
    }
        console.log(idx)
    if (idx == 'novo') {
        const produtos = recuperarLocalStorage();
        //produtos.push({ id: produtos.length + 1, nome, preco, prime });
        let idp = 0;
        for (const pro of produtos) {
            if (pro.usuarioId === usuarioId) {
                idp = Number(pro.id);
            }
        }
        produtos.push({ id: idp += 1, nome, preco, prime, usuarioId });
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();
        console.log(idx, "teste")

    } else {
        let produto = { id: idx, nome, preco, prime, usuarioId }
        atualizarProduto(idx, produto);
        preencherTabela();
        form.reset();
        idx = 'novo';
        console.log('editar', idx);
    }
}

const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for (const produto of produtos) {
        if (produto.usuarioId === usuarioId){
        tabela.innerHTML += `
<tr>
<th scope="row">${produto.id}</th>
<td>${produto.nome}</td>
<td>${produto.preco}</td>
<td>${produto.prime ? "sim" : "não"}</td>
<td>
<i class="fa-solid fa-trash" onclick="removerProduto(${produto.id})"></i>
<i class="fa-solid fa-pen-to-square" onclick="editarProduto(${produto.id})"/></i>
</td>
</tr>
`;
    }}
}
const removerProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    console.log(produtos[indexProduto]);
    if (indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert('Produto removido')
    preencherTabela();
}
const editarProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id && produto.usuarioId === usuarioId)
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.checked = produtos[indexProduto].prime;
    idx = id;
}
atualizarProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id && produto.usuarioId === usuarioId);
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos);
}

form === null || form === void 0 ? void 0: form.addEventListener('submit', salvarProduto);
document.addEventListener('DOM ContentLoaded', preencherTabela);

form.addEventListener('submit', salvarProduto)
document.addEventListener('DOMContentLoaded', preencherTabela);
let sair = document.querySelector('#sair');

sair.addEventListener('click', function(){
    saindo()
});

function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}
