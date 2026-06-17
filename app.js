const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

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