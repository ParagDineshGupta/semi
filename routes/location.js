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

    var submit=req.body.submit;
    if(submit=='location'){
         var cid=req.body.cid;
       var sql2 = "select * from  location_table where cid='"+cid+"' ";
        con.query(sql2, function (err, result) {
            if (err) {console.log(sql2);}
            else { 
                 res.render('location', { title:'location',data:result,data2:cid})
            }   
        });     
        


    }
    else if(submit=='SAVE'){
         
      var data=req.body;
      delete data.submit;
      var cid=req.body.cid;
        con.query("INSERT INTO location_table SET ?",data,function (err, result) {
            if (err) {console.log(data);}
            else { 

                  var sql2 = "select * from  location_table where cid='"+cid+"' ";
        con.query(sql2, function (err, result) {
            if (err) {console.log(sql2);}
            else { 
                 res.render('location', { title:'location',data:result,data2:cid })
            }   
        }); 
            }   
        });     
        


    }

    else
        res.render('err',{err:'ERROR'});

});


module.exports = router;

