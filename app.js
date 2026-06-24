const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs.engine({defaultLayout:false}));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));

const sequelize = require('./config/db')
const Usuario = require('./models/usuario.models')
const Produto = require('./models/produto.models')

app.get('/', (req, res) => {
  res.send('Testando o express!');
});

app.get(
    '/listar', 
    async (req, res) => {
        const produtos = await Produto.findAll({raw: true});
        console.log(produtos);  
        res.send('ok')  
    }
)

app.get(
    '/criar',
    async (req, res) => {
        await Produto.create({
            nome: 'Copo',
            preco: 29.99
        });
        await Produto.create({
            nome: 'Prato',
            preco: 31.50
        });
        await Produto.create({
            nome: 'Xicara',
            preco: 25.00
        });
        res.send('Produto criado com sucesso!')
    }
)

app.get(
    '/exercicio5',
    async (req, res) => {
        const produto = await Produto.findByPk(2);

        console.log(`nome: ${produto.nome}, preco: ${produto.preco}`);
        res.send(`Produto encontrado: ${produto.nome} - R$ ${produto.preco}`);
    }
)

app.get(
    '/exercicio6',
    async (req, res) => {
        const produto = await Produto.findByPk(3);

        produto.nome = "Garfo";
        produto.preco = 11.99;

        produto.save();

        res.send('Ok');
    }
)

app.get(
    '/exercicio6/delete',
    async (req, res) => {
        const prod = await Produto.findByPk(3);
        await prod.destroy();

        const produtosRestantes = await Produto.findAll({ raw: true });
        console.log('Produtos restantes:', produtosRestantes);

        res.send('ok');
    }
)

app.get(
    '/produtos',
    async (req, res) => {
        const produtos = await Produto.findAll({ raw: true });
        res.json(produtos);
    }
)

app.post(
    '/prod',
    async(req, res) => {
        const {nome, preco} = req.body;
        const prod = await Produto.create({nome,preco});
        res.json(prod);
    }
)

app.get(
    '/produtos/:id',
    async (req, res) => {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        await produto.destroy();
        res.send('Produto excluído com sucesso!');
    }
)

app.get(
    '/usuarios',
    async (req, res) => {
        await Usuario.create({
            nome: 'Caio',
            email: 'caio@example.com',
            idade: 25
        });
        await Usuario.create({
            nome: 'Maria',
            email: 'maria@example.com',
            idade: 30
        });
        await Usuario.create({
            nome: 'Elias',
            email: 'elias@example.com',
            idade: 28
        });
        res.send('Usuário criado com sucesso!')
    }
)

app.get(
    '/usuariolistar',
    async (req, res) => {
        const usuarios = await Usuario.findAll({raw: true});

        res.render('usuarios', {usuarios});
    }
)

app.get(
    '/cadastrar-usu',
    async (req, res) => {
        res.render('cadastrarUsuario');
    }
);

app.post(
    '/cadastrar-usuario',
    async (req, res) => {
       const { nome, email, idade } = req.body;
       await Usuario.create({ nome, email, idade });
       res.redirect('/usuariolistar');
    }
);

app.post('/usuarios/deletar/:id', async (req, res) => {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        await usuario.destroy();
    }

    res.redirect('/usuariolistar');
});

async function conectarBD() {
    try{
        await sequelize.sync();
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
    } catch (erro) {
        console.error('Erro ao conectar:', erro);
    }
}

conectarBD()

app.listen(
    3000,
    () => console.log('Servidor em execução')
)