const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.listen(port, (req, res) => {
  console.log("The server is listening on port " + port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const myOAuth2Cli

var auth = {
  type: "oauth2",
  user: "ksagar.sk23@gmail.com",
  clientId:
    "902999742748-t70lj44lei2uiu2pmuu1350qon5cfhkb.apps.googleusercontent.com",
  clientSecret: "VbzJAbYz0lSYjIejmFTQQAoC",
  refreshToken:
    "1//04Aa-PBwn_lOCCgYIARAAGAQSNwF-L9IrS2sxvWmw7d0tVGD7ZBjWFXeCxoTxDSl-8iQGQ_PiwyRexR44dpnHT5O7kCH9hjSyHoc",
  accessToken:
    "ya29.a0AfH6SMDw1JZMK04LaQpUMMt_uIpazc8KbXXni5mHZ8wnCv9jvTKyPP5vW4Mc7TzozJk3EZi-0VUFE312sA--mXVNO72RW8UYM_HW0U9hcaksJTy-ODtAnxup82Ri_6YpHqBDBUd0lEm6DSaQamdwnkCwGkmkSIKi2yk"
};

app.post("/send", function(req, res) {
  response = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  };

  var mailOptions = {
    from: req.body.name,
    to: "wish6637@gmail.com",
    subject: "A contact from: " + req.body.name,
    text: req.body.message,
    html:
      "Message from: " +
      req.body.name +
      "<br /><br /> Email: " +
      req.body.email +
      "<br /><br /> Message: " +
      req.body.message
  };

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: auth
  });

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      throw err;
    } else {
      res.send({ data: res });
      console.log(JSON.stringify(res));
    }
  });
});
