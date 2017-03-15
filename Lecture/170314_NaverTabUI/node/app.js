const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.set('views', './views');
app.use(express.static('public'));
app.engine('handlebars', handlebars({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');
app.locals.pretty = true;

app.get('/', (req, res) => {
  res.render('main');
});

app.listen(3000, () => {
  console.log('Conneted 3000 port!');
});
