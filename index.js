const express = require('express');
const minhaApi = express();

minhaApi.use(express.json());

const listaUsuarios = [
    {
        id: 1,
        nome: 'João',
        idade: 27,
        cpf: '12345678911',
        codigoCargo: 1
    }
];

const listaCargos = [
    {
        codigo: 1,
        nome: 'Desenvolvedor',
        descricao: 'Responsável pelo desenvolvimento de software.'
    }
];

// Rota para consulta de todos os usuários
minhaApi.get('/usuarios', (req, res) => {
    let usuarioInfo = '';
    
    //console.log(req.body);
    //res.send('<h1> Hello World!</h1><p>Paragrafo foda</p>');
    //res.send(pessoa);
    for(const user of listaUsuarios){
        usuarioInfo += '<p>';
        usuarioInfo += "Codigo: "+user.id+"<br>";
        usuarioInfo += "Nome: "+user.nome+"<br>";
        usuarioInfo += "Idade: "+user.idade+"<br>";
        usuarioInfo += "CPF: "+user.cpf+"<br>";
        usuarioInfo += "Cargo ID: "+user.codigoCargo+"<br>";
        usuarioInfo += '</p><br>';
    }
    res.send(usuarioInfo);
   // res.json(listaUsuarios);
});

// Rota para consulta de um usuário pelo código
minhaApi.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = listaUsuarios.find(user => user.id === id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuário não encontrado.');
    }
});

// Rota para cadastro de um usuário
minhaApi.post('/usuarios', (req, res) => {
    const novoUsuario = req.body;
    listaUsuarios.push(novoUsuario);
    res.status(201).send();
});

// Rota para atualização de um usuário pelo código
minhaApi.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = listaUsuarios.findIndex(user => user.id === id);
    if (index !== -1) {
        listaUsuarios[index] = req.body;
        res.send();
    } else {
        res.status(404).send('Usuário não encontrado.');
    }
});

// Rota para remoção de um usuário pelo código
minhaApi.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = listaUsuarios.findIndex(user => user.id === id);
    if (index !== -1) {
        listaUsuarios.splice(index, 1);
        res.send();
    } else {
        res.status(404).send('Usuário não encontrado.');
    }
});

// Rota para consulta de todos os cargos
minhaApi.get('/cargos', (req, res) => {
    res.json(listaCargos);
});

// Rota para cadastro de um cargo
minhaApi.post('/cargos', (req, res) => {
    const novoCargo = req.body;
    listaCargos.push(novoCargo);
    res.status(201).send();
});

// Rota para atualização de um cargo pelo código
minhaApi.put('/cargos/:codigo', (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const index = listaCargos.findIndex(cargo => cargo.codigo === codigo);
    if (index !== -1) {
        listaCargos[index] = req.body;
        res.send();
    } else {
        res.status(404).send('Cargo não encontrado.');
    }
});

// Rota para remoção de um cargo pelo código
minhaApi.delete('/cargos/:codigo', (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const index = listaCargos.findIndex(cargo => cargo.codigo === codigo);
    if (index !== -1) {
        listaCargos.splice(index, 1);
        res.send();
    } else {
        res.status(404).send('Cargo não encontrado.');
    }
});

// Rota para consulta de um cargo pelo código
minhaApi.get('/cargos/:codigo', (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const cargo = listaCargos.find(cargo => cargo.codigo === codigo);
    if (cargo) {
        res.json(cargo);
    } else {
        res.status(404).send('Cargo não encontrado.');
    }
});

minhaApi.listen(4300, () => {
    console.log("API rodando na porta 4300");
});