var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');

var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);

var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');

router.get('/', function(req, res, next) {
    res.render('addcust', { title: 'Add Customer',status:' ' });

});

router.post('/', function(req, res, next) {

    var cn=req.body.cn; var em=req.body.em; var mob=req.body.mob; var amob=req.body.amob; var cp=req.body.cp; var type=req.body.type;var splcmnt =req.body.splcmnt;
    var submit=req.body.submit;
    if(submit=='Add Customer'){
        var sql2 = "INSERT INTO customer_info VALUES('0','"+formatted +"','"+ cn +"','"+ em+"','"+mob+"','"+ amob  +"','"+ cp  +"','"+ splcmnt +"','"+type+"')";
        con.query(sql2, function (err, result) {
            if (err) {console.log(sql2);
                // res.end('ERROR');
                res.render('addcust', { title:'Add Customer',status:'DATA NOT PROPER' });
                
            }
            else {
                 res.render('addcust', { title:'Add Customer',status:'DATA SAVED' });
                console.log('result');
            }
           
        });


    }

    else
        res.render('err',{err:'ERROR'});

});


module.exports = router;

