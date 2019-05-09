// 项目的入口
const express = require('express');
const app = express();

// 设置handlebars 视图引擎
const handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// 放在所有路由之前
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    const fortunes = [
        'Conquer your fears or they will conquer you.',
        'Rivers need springs.',
        'Do not fear what you don\'t know.',
        'You will have a pleasant surprise.',
        'Whenever possible, keep it simple.',
    ];
    res.render('about', { fortune: fortunes[Math.floor(Math.random() * fortunes.length)] });
});

// 定制 404 页面
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// 定制 500 页面
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${app.get('port')};Press Ctrl + C to terminate.`)
});
