var express    = require('express');    // call express
var app        = express();             // define our app using express
var redirect = require('express-redirect');
redirect(app);

var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: 'Mandrill',
   auth: {
     user: 'hosea@obviouslee.com',
     pass: 'NdjLjw6OJAqKnX3ke_93QQ'
   }
});

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
// app.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });
// });

router.route('/email')

  .post(function(req, res) {

    var mailOptions = {
       from: 'inquiries@nautilusco.com',
       replyTo: req.body.fromName + ' <' + req.body.fromEmail + '>',
       to: req.body.toName + ' <' + req.body.toEmail + '>',
       subject: 'Website Contact Form: ' + req.body.subject,
       html: '<p>' + req.body.comments + '</p>' +
			 '<p>' + ' ' + '</p>' +
		     '<p><strong>' + 'Person Requesting Information' + '</strong></p>' +
			 '<p>NAME:  ' + request.body.toName + '</p>' +
             '<p>EMAIL:  ' + request.body.toEmail + '</p>',
       text: 'hello world!'
    };

    console.log("Sending mail...");

    smtpTransport.sendMail(mailOptions, function(error, response){  //callback
      if(error) {
        console.log(error);
      } else {
        console.log("Message sent: " + response.message);
      }

      smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });
  });


// 301 Redirects
app.redirect('/company-profile', '/careers', 301);
app.redirect('/work', '/custom-home-construction', 301);
app.redirect('/daniel-island-park', '/custom-home-construction/daniel-island-park', 301);
app.redirect('/ralston-green', '/custom-home-construction/ralston-green', 301);
app.redirect('/sunroom-addition', '/custom-home-construction/sunroom-addition', 301);
app.redirect('/master-closet-remodel', '/custom-home-construction/master-closet-remodel', 301);
app.redirect('/home-management', '/custom-home-construction/home-management', 301);
app.redirect('/daniel-island-residence', '/custom-home-construction/daniel-island-residence', 301);
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
//

app.get("/*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
