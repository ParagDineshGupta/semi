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
  var cid = req.query.c;
    var sql="select * from customer_info where cid='"+cid+"'";
    con.query(sql, function(err,result){
         if(err){res.end('error');}
        else{  var len = Object.keys(result).length;
        if(len==1) 
        {
            var sql2="select * from location_table where cid="+cid+" order by lid";
            con.query(sql2, function(err,result2){
         if(err){res.end('error');}
        else{  res.render('custdetail', { title:'Locations',data:result,data2:result2}); }
            });

            
        }
        else
            res.end('error');     } 
    }); 

});

router.post('/', function(req, res, next) {

    var operation=req.body.operation;
    var submit=req.body.submit;
    var cid=req.body.cid;
    if(operation=='location'){
         
       var sql2 = "select * from  location_table where cid='"+cid+"' ";
        con.query(sql2, function (err, result) {
            if (err) {console.log(sql2);
            res.end('ERROR');}
            else { //var len = Object.keys(result).length;
                 res.render('location', { title:'Locations',data:result,data2:cid})
            }   
        });     
        


    }
    else if(operation=='update'){
        
        var sql2 = "select * from customer_info where cid='"+cid+"' " ;
        con.query(sql2, function (err, result) {
            if (err) {
                console.log(sql2);
                res.end('ERROR');
            }
            else {
                res.render('update', { title:'Update',ed:'',result:result })
            }
            
            
        });
    }
    
    else if(submit=='SAVE'){
         
      var data=req.body;
      delete data.submit;
      var cid=req.body.cid;
        con.query("INSERT INTO location_table SET ?",data,function (err, result) {
            if (err) {console.log(data);}
            else 
            { 
         var sql="select * from customer_info where cid='"+cid+"'";
  con.query(sql, function(err,result){
         if(err){res.end('error');}
        else{  var len = Object.keys(result).length;
        if(len==1) 
        {
            var sql2="select * from location_table where cid="+cid+" order by lid";
            con.query(sql2, function(err,result2){
         if(err){res.end('error');}
        else{  res.render('custdetail', { title:'Locations',data:result,data2:result2}); }
            });

            
        }
        else
            res.end('error');     } 
    }); 
       }   
        });     
        
    }
    else
        res.render('err',{err:'ERROR'});

});


module.exports = router;

