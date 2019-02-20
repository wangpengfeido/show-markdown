const axios = require('axios');
const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('/show-markdown/title-page/title-page.html');
});

app.use('/getByUrl', function (req, res, next) {
  const url = req.query.url;
  if (!url) {
    res.status(400).send('url param is error');
  }
  axios.get(decodeURIComponent(url)).then(({data}) => {
    res.send(data);
  }).catch(error => {
    res.status(500).send(error);
  });
});

app.listen(20000, function () {
  console.log('listening 20000')
});



