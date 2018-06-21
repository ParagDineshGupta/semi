var express = require('express');
var router = express.Router();
var fs=require('fs');
var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);
/* GET users listing. */
router.get('/', function(req, res, next) {
  var sql2 = "select * from customer_info order by cid desc";
    con.query(sql2, function (err, result) {
        if (err) {console.log(sql2);
        res.render('err',{err:'ERROR'});}
        else {
             var len = Object.keys(result).length;
        res.render('serchcust', { title: 'All Customer',data:result,p:0,n:0  });    
        }
       
    });

});

module.exports = router;

