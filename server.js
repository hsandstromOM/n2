var express    = require('express');    // call express
var app        = express();             // define our app using express

var nodemailer = require('nodemailer');
// var mandrillTransport = require('nodemailer-mandrill-transport');
//
// var transport = nodemailer.createTransport(mandrillTransport({
//   auth: {
//     apiKey: 'key'
//   }
// }));

var mandrill        = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('HbJA8sp7lHhLsgDp9qazPg');

// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

var port = process.env.PORT || 3000;        // set our port

app.use(express.static(__dirname + ''));

// ROUTES FOR OUR API
// =============================================================================
var router     = express.Router();

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/api', router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/email')

  .post(function(req, res) {
    console.log("Creating transporter...");
    var transporter = nodemailer.createTransport();

    var mailOptions = {
       from: 'sender@address',
       to: 'mike@launchpeer.com',
       subject: 'hello',
       html: '<b>hello world!</b>',
       text: 'hello world!'
    };

    console.log("Sending mail...");

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

    // console.log("closing transporter...");
    // transporter.close();
  });

// START THE SERVER
// =============================================================================
app.listen(port, function() {
console.log('Our app is running on http://localhost:' + port);
});

//
// var port = process.env.PORT || 3000;
//
// app.use(express.static(__dirname + ''));
//
// app.listen(port, function() {
// console.log('Our app is running on http://localhost:' + port);
// });

// app.get("*", function(req, res) {
//     res.render("./index.html");
// });
