var express = require('express');
var router = express.Router();

var url = require('url');
var mysql = require('mysql');
var qs = require('querystring');
var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);

/* GET home page. */
router.get('/', function(req, res, next) {
    var sql2 = "SELECT * FROM customer_info ";
    con.query(sql2, function (err, result) {
        if (err) {
           
            res.end('error');
        }
        else {
            console.log('result');
        }
        var len = Object.keys(result).length;
        res.render('index', {title: 'Equipshare',result:result,len:len});
    });
});
module.exports = router;
