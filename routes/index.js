var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kampalacreative@gmail.com',
    pass: 'kampalac123'
  }
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { mail_res: false });
});

router.post('/', function(req, res) {
  const mailOptions = {
    from: 'any@any.com', // sender address
    to: req.body.toAddress || 'kampalacreative@gmail.com', // list of receivers
    subject: req.body.subject || 'CREATIVE MAILER', // Subject line,
    attachments: [],
    body: req.body.content // plain text body
  };

  if(req.body.attachmentLink) {
    mailOptions.attachments.push({
      filename: 'attachment.pdf',
      path: req.body.attachmentLink
    })
  }

  transporter.sendMail(mailOptions, function (err, info) {
    if(err) { 
      console.log(err)
      res.render('index', { mail_res: true, message: "failed to send mail" });
    } else {
      res.render('index', { mail_res: true, message: "Email Sent Successfully" });
    }
  })
});

module.exports = router;
