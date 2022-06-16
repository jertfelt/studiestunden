const express = require('express');


// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});


app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Start'});
});

app.get("/registrera", (req, res) => {
  res.render("../views/functions/createUser.ejs",{ title: "Registrera dig"})
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
