const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
  }
});

transporter.verify(function(error, success) {
  if (error) {
      console.log(error);
  } else {
      console.log('Server is ready to take our messages');
  }
});

app.use(express.static('dist'));
app.use(bodyParser());

app.post('/email', (req, res) => {
  transporter.sendMail({
    from: 'portfolio.email.login@gmail.com',
    to: 'willwyatttang@gmail.com',
    subject: `New Message From Portfolio - ${req.body.name}`,
    text: `Email: ${req.body.email} \n ${req.body.message}`
  }, err => {
    if (err) {
      res.status(500);
      return console.log(err);
    }
    console.log('Email sent!')
    res.status(200).redirect('/');
  });
});

app.listen(80);
