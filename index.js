const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const OAuth2Client = google.auth.OAuth2;

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

// const myOAuth2Client = new OAuth2(
//   "902999742748-t70lj44lei2uiu2pmuu1350qon5cfhkb.apps.googleusercontent.com",
//   "VbzJAbYz0lSYjIejmFTQQAoC",
//   "https://developers.google.com/oauthplayground"
// );

// myOAuth2Client.setCredentials({
//   refresh_token:
//     "1//043UTQ8PKsQrhCgYIARAAGAQSNwF-L9IrNs-5o3lvxuGlULE47yTzUY557dAkUqzwiNhptBMDqaZB0Oqd4jL9cxZOm9YGqYhhTNo",
//   // access_token: "ya29.a0AfH6SMBQliKZNs11ezfsPtKrKVGQqOzcQK_5YsuOZXUXeKyiESEOiLswI_pTA8I7QNE1mrPDBBTd7XVkv87Dw89hPccYkbrgYjenvkD_lb-G3A6bSUUd9zMsYpS7lcIhLR691QVuQq2BedN6RY6vFWbqJFrhtIHeDjo"
// });

// let myAccessToken = myOAuth2Client.getAccessToken();

var googleOauth2Client = new OAuth2Client(
  "902999742748-t70lj44lei2uiu2pmuu1350qon5cfhkb.apps.googleusercontent.com",
  "VbzJAbYz0lSYjIejmFTQQAoC",
  "https://developers.google.com/oauthplayground"
);

googleOauth2Client.setCredentials({
  refresh_token:
    "1//043UTQ8PKsQrhCgYIARAAGAQSNwF-L9IrNs-5o3lvxuGlULE47yTzUY557dAkUqzwiNhptBMDqaZB0Oqd4jL9cxZOm9YGqYhhTNo"
});

let access_token =
  "ya29.a0AfH6SMBQliKZNs11ezfsPtKrKVGQqOzcQK_5YsuOZXUXeKyiESEOiLswI_pTA8I7QNE1mrPDBBTd7XVkv87Dw89hPccYkbrgYjenvkD_lb-G3A6bSUUd9zMsYpS7lcIhLR691QVuQq2BedN6RY6vFWbqJFrhtIHeDjo";

googleOauth2Client.refreshAccessToken(function(err, tokens) {
  response.send({
    access_token: tokens.access_token
  });
});

var auth = {
  type: "oauth2",
  user: "ksagar.sk23@gmail.com",
  clientId:
    "902999742748-t70lj44lei2uiu2pmuu1350qon5cfhkb.apps.googleusercontent.com",
  clientSecret: "VbzJAbYz0lSYjIejmFTQQAoC",
  refreshToken:
    "1//043UTQ8PKsQrhCgYIARAAGAQSNwF-L9IrNs-5o3lvxuGlULE47yTzUY557dAkUqzwiNhptBMDqaZB0Oqd4jL9cxZOm9YGqYhhTNo",
  accessToken: access_token
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
      //console.log(JSON.stringify(res));
    }
  });
});
