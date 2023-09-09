const express = require('express');
const bodyParser = require('body-parser');
const fs = require ('fs');

const app = express();

app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  fs.readFile('username.txt', (err, data)=> {
    if(err){
      console.log(err)
      data = 'No chat Exist'
    }
    res.send(
      `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value= localStorage.getItem('username')">
        <input type="text" name="message" id="message">
          <input type="hidden" name="username" id="username">
            <br />
            <button type="submit">Send</button>
      </form>` 
    );
  })
  });

app.post('/', (req, res,) => {
  console.log(req.body.username)
  console.log(req.body.message)
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}`, {flag: 'a'}, (err) => 
    err ? console.log(err) : res.redirect("/")
    )
});

app.get('/login', (req, res) => {

  res.send(
    `<form action="/"login method="POST" onSubmit="document.setElementById('username').value= localStorage.setItem('username')">
        <input type="text" name="username" placeholder="username" id="username">
        <input type="text" name="message" id="message">
          <br/>
          <button type="submit">Add</button>
    </form>` 
    );
});

app.listen(3000);