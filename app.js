//invoke these commands in git bash:

//npm install express --save
//npm install body-parser --save
//npm install cors --save
//npm install multer --save
//npm install path --save 

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var path = require('path');
var fs = require("fs");

var http = require('http');
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:89");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ------------------------------------------- EndPoints ---------------------------------------------------------------


app.get('/', function (req, res) {
    if (req.query) {
        var parmObject = req.query;
        parmObject.Message = "NodeJS WebAPI Get Test OK";
        res.send(parmObject);
    }
});

app.post('/', function (req, res) {
    if (req.body) {
        var dataObject = req.body;
        dataObject.Message = "NodeJS WebAPI Post Test OK";
        res.set('Content-Type', 'application/json');
        res.send(dataObject);
    }
});

app.put('/', function (req, res) {
    if (req.body) {
        var dataObject = req.body;
        dataObject.Message = "NodeJS WebAPI Put Test OK";
        res.set('Content-Type', 'application/json');
        res.send(dataObject);
    }
});

app.delete('/', function (req, res) {
    if (req.query) {
        var dataObject = req.query;
        dataObject.Message = "NodeJS WebAPI Delete Test OK";
        res.set('Content-Type', 'application/json');
        res.send(dataObject);
    }
});

app.post('/UploadImage', upload.single('file'), function (req, res, next) {
    console.log("Getting image file: " + req.file.originalname);
    fs.rename('uploads/' + req.file.filename, 'uploads/' + req.file.filename + "_" + req.file.originalname);
    res.json({ filename: req.file.filename + "_" + req.file.originalname, mimetype: req.file.mimetype, originalname: req.file.originalname });
});
// ---------------------------------------------------------------------------------------------------------------------

http.createServer(app).listen(88);
console.log("Node Back End is listening to port 88");

var appHttp = express();
appHttp.use(express.static(__dirname));
appHttp.listen(89, function () {
    console.log("Http Front End is listening in port 89")
});
