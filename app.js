var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Signuper = require('./models/signuper');
var validator = require('validator');
var nodemailer = require('nodemailer');





var app = express();

app.set('view engine', 'ejs');


app.set('port', 8000);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true}));


app.route('/')
  .get((req, res) => {
        res.render('index.ejs');
    })
  .post((req, res) => {
      Signuper.create({
          username: req.body.name,
          email: req.body.email
      })

  .then(user => {
      res.redirect('/thanks');
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'negitdown@gmail.com',
          pass: 'negnegnegitdown231'
        }
      });
      let mailOptions = {
        from: '"Negitdown" <negitdown@gmail.com>',
        to: req.body.email,
        subject: 'Welcome to Negitdown',
        html: '<h1> Negitdown, MAN! </h1>'
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent', info.messageId, info.response);
      });
    });

});

app.get('/thanks', (req, res) => {
  res.render('thanks.ejs');
})


app.listen(8000, () => console.log('App started on port 8000'));
