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
  var lid = req.query.l;
    var sql="select * from location_table where lid='"+lid+"'";
    con.query(sql, function(err,result){
         if(err){res.end('error');}
        else{  var len = Object.keys(result).length;
        if(len==1) 
        {
            var sql2="select * from equipment_table where lid="+lid+" order by ebid";
            con.query(sql2, function(err,result2){
         if(err){res.end('error');}
        else{  res.render('locdetail', { title:'Equipments',data:result,data2:result2}); }
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
      console.log(data);
       var lid = req.body.lid;
        con.query("INSERT INTO equipment_table SET ?",data,function (err, result) {
            if (err) {console.log("p");
        res.render('err',{err:'ERROR'});}
            else { 

               
    var sql="select * from location_table where lid='"+lid+"'";
    con.query(sql, function(err,result){
         if(err){res.end('error');}
        else{  var len = Object.keys(result).length;
        if(len==1) 
        {
            var sql2="select * from equipment_table where lid="+lid+" order by ebid";
            con.query(sql2, function(err,result2){
         if(err){res.end('error');}
        else{  res.render('locdetail', { title:'Equipments',data:result,data2:result2}); }
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

