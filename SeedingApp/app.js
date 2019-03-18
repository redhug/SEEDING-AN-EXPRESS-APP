var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('sampleapp', ['users']);
var app = express();
var expressValidator = require('express-validator');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static path
app.use(express.static(path.join(__dirname, 'public')))

var newUser = {
    firstname: 'Hello',
    lastname: 'Brother',
    email: 'a@a.com'
}

app.get('/', function (req, res) {
    db.users.find(function (err, docs) {
        console.log(docs);
        res.render('index', {
            title: 'Customers',
            users: docs
        });
    })
    
})
app.post('/users/add',function(req,res){
    db.users.insert(newUser, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
})
app.listen(3000, function () {
    console.log('server started on port 3000');
})