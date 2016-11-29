var express = require('express');
var app = express();
var fs = require('fs-extra')
var path = require('path');
var bodyParser = require('body-parser');

//Set EJS up to process
var ejs = require('ejs');
app.set('view engine', 'ejs')

app.set('port', (process.env.PORT || 5000));

//allow downloads in the root
app.use(express.static(__dirname));

//Something so we can post data
app.use(bodyParser.urlencoded({
    extended: true
}));



//Send traffic to the form
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

//Once you fill out the form start processing our data and making our files
app.post('/', function(req, res){


 

//store our template file
var compiled = ejs.compile(fs.readFileSync('./template/index.ejs', 'utf8'));

//Fill out our templates
var html = compiled({
	
	     bright:req.body.primaryBrightColor,
	     dark:req.body.primaryDarkColor,
	     logo: req.body.logo,
	     mainMessageImage: req.body.mainMessageImage,
	     mainMessageText: req.body.mmText,
	     mainMessageOffer: req.body.mmOffer,
	     mainMessageDisc: req.body.mmDisc,


	      ch1: req.body.cH1,
	      cp1: req.body.cP1,
	      ch2: req.body.cH2,
	      cp2: req.body.cP2

});

// Compile our EJS into a HTML file
fs.writeFileSync("borders.html", html);


// Send user to a new file where they can grab there goodies
res.sendFile(__dirname + '/done.html');


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
