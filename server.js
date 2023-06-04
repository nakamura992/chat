const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(multer().none());

app.use(express.static('static'));

app.post('/chat', function(req, res) {

});

const port = 4000;
app.listen(port, function () {
  console.log('Node.js Server started: http://localhost:' + port);
});

app.post('/chat', function(req, res) {
  const message = req.body.message;
  console.log('受信メッセージ:' + message);
  let answer = '(回答できずに困っている)';

  const text = fs.readFileSync('response.txt', 'utf8');
  const lines = text.toString().split('\n');
  for (let idx in lines) {
    const value = lines[idx].split(',');
    if (value[1] !== undefined && message.indexOf(value[0]) != -1) {
      answer = value[1];
      break;
    }
  }

  console.log('返却メッセージ:' + answer);
  res.send({
    answer: answer
  });
});