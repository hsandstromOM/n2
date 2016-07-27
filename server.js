var express    = require('express');    // call express
var app        = express();             // define our app using express

// var nodemailer = require('nodemailer');
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

var port = process.env.PORT || 3001;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router     = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/email')

  .post(function(req, res) {
    console.log(req);
    var fromEmail = req.body.fromEmail;
    var fromName = req.body.fromName;
    var subject = req.body.subject;
    var comments = req.body.comments;

    var toEmail = req.body.toEmail;
    var toName = req.body.toName;

    console.log(req.body);

    var message = {
      // "html": "<p>Unknown Error Message</p><p>" + req.body.message + "</p><p>Error Code:" + req.body.data.code + "</p>",
      "html": "<p>Unknown Error Message</p><p>" + "ERR" + "</p><p>Error Code:" + "CODE" + "</p>",
      // "text": req.body.data,
      "text": comments,
      "subject": "Unknown Error Message",
      "from_email": fromEmail,
      "from_name": fromName,
      "to": [{
        "email": toEmail,
        "name": toName,
        "type": "to"
      }],
    };
    var async = false;
    mandrill_client.messages.send({"message": message, "async": async}, function(result) {
      console.log(result);
      res.json(result);
    }, function(e) {
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port, function() {
console.log('Our app is running on http://localhost:' + port);
});


console.log('eat shit and die');
// var port = process.env.PORT || 3000;

// app.use(express.static(__dirname + ''));
//
// app.listen(port, function() {
// console.log('Our app is running on http://localhost:' + port);
// });

// app.get("*", function(req, res) {
//     res.render("./index.html");
// });
