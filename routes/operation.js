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
     else if(operation=='delete'){
        
      
        con.query("DELETE FROM customer_info WHERE cid= "+cid,function (err, result) {
            if (err) {console.log(err);
            res.end('ERROR');}
            else { 
                //  var sql2 = "delete from  location_table where cid='"+cid+"' ";
                  //con.query(sql2, function (err, result) {
                  //if (err) {console.log(sql2);
                 // res.end('ERROR');}
                  //else { 
                 res.render('index', { title:'home',len:"null" })
            }   
       // }); 
      //      }   
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
    else if(submit=='Delete Location'){
         
     
      var lid=req.body.d;
      var cid=req.body.c;
        con.query("DELETE FROM location_table WHERE lid= "+lid,function (err, result) {
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
     else if(submit=='Update Location'){
         
     
      var lid=req.body.u;
      var cid=req.body.c;
        con.query("DELETE FROM location_table WHERE lid= "+lid,function (err, result) {
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

