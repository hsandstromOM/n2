var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + ''));

app.listen(port, function() {
console.log('Our app is running on http://localhost:' + port);
});

// app.get("*", function(req, res) {
//     res.render("./index.html");
// });
