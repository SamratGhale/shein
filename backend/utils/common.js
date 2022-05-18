var nodemailer = require("nodemailer");
require("dotenv").config();

const email = process.env.GOOGLE_EMAIL;
const pass = process.env.GOOGLE_PASSWORD;
const server = process.env.SERVER_URL;
const port = process.env.CLIENT_PORT;

const username = process.env.GOOGLE_USERNAME;

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass,
  }
})

exports.sentMailVerificationLink = function (user, token) {
  var from = username + " Team<" + username + ">";
  var mailbody = "<p>Thanks for Registering on " + username +
    " </p><p>Please verify your email by clicking on the verification link below.<br/><a href='http://" + server + ":" + port + "/auth/verify" + "/" + token + "'>Verification Link</a></p>"
  mail(from, user.email, "Account Verification", mailbody);
};

function mail(from, email, subject, mailbody) {
  var mailOptions = {
    from: from, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    //text: result.price, // plaintext body
    html: mailbody  // html body
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.error(error);
    }
    smtpTransport.close(); // shut down the connection pool, no more messages
  });
}