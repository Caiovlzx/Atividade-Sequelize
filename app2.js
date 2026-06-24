const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/db');
const Video = require('./models/Video.models');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './views');

sequelize.sync()
    .then(() => console.log('Banco conectado'))
    .catch(err => console.log(err));



app.get('/', async (req, res) => {
    const videos = await Video.findAll({ raw: true });
    res.render('videos', { videos });
});


app.get('/criar', (req, res) => {
    res.render('criar');
});


app.post('/criar', async (req, res) => {
    const { titulo, descricao, url } = req.body;
    await Video.create({ titulo, descricao, url });
    res.redirect('/');
});



app.get('/editar/:id', async (req, res) => {
    const video = await Video.findByPk(req.params.id);
    res.render('editar', { video });
});



app.post('/editar/:id', async (req, res) => {
    const { titulo, descricao, url } = req.body;

    await Video.update(
        { titulo, descricao, url },
        { where: { id: req.params.id } }
    );

    res.redirect('/');
});



app.post('/deletar/:id', async (req, res) => {
    await Video.destroy({ where: { id: req.params.id } });
    res.redirect('/');
});


app.listen(3050, () => {
    console.log('Servidor rodando na porta 3050');
});