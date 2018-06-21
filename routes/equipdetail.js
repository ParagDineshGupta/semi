var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');
const fileUpload = require('express-fileupload');
router.use(fileUpload());
var fs = require("fs");
var csv = require('fast-csv');
//var formidable = require('formidable');
var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);

var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');

router.get('/', function(req, res, next) {
var ebid = req.query.e;
var sql="select * from equipment_table where ebid='"+ebid+"'";
con.query(sql, function(err,result){
         if(err){res.end('error');}
        else{  var len = Object.keys(result).length;
        if(len==1) 
        {    //complaint_table
            res.render('equipdetail', { title:'equip',data:result});

        }
        else
            res.end('error');     } 
    }); 

});

router.post('/', function(req, res, next) {

var submit=req.body.submit;

 console.log(req.body);
    console.log(req.files);

    if(submit=='Enter'){
         
      var data=req.body;
      delete data.submit;
      console.log(data);
       var ebid = req.body.ebid;
               var dateTime = require('node-datetime');
var dt = dateTime.create();
//var formatted = dt.format('Y-m-d H:M:S');
var formatted = dt.format('Y-m-d');
data.doc=formatted;
        con.query("INSERT INTO complaint_table SET ?",data,function (err, result) {
            if (err) {console.log(err);
        res.render('err',{err:'ERROR'});}
            else { console.log(result);

                var sql="INSERT INTO complaint_extension SET idcomplaint="+result.insertId;           
  con.query(sql, function(err,result){
         if(err){res.end('error');}
        else{ 

           var sql="select * from equipment_table where ebid='"+ebid+"'";           
  con.query(sql, function(err,result){
         if(err){res.end('error');}
        else{  var len = Object.keys(result).length;
        if(len==1) 
        {    //complaint_table
            res.render('equipdetail', { title:'equip',data:result});

        }
        else
            res.end('error');     } 
    }); 


          } 
    }); 

   

            }   
        });     
        


    }
   else if(submit=='Upload'){

         
      var data=req.body;
      delete data.submit;
       var ebid = req.body.bid;
        var total = req.body.total;

       var func = function(data,rb){
  console.log(data);
  console.log("cg"+rb.total);console.log(data.length);
  if(rb.total==data.length){
   for (var index = 0; index < data.length; index++) {
    var sql="INSERT INTO serial_number_table (ebid,serial_number) VALUES ("+ebid+",'"+data[index]+"')";
  con.query(sql,function(err){
   if(err) {
    console.log(err);
    throw err;}
   });}}
}


file = req.files.myfile;
file.mv(file.name, function(err){
      if(err) throw err;
      else {
        var stream = fs.createReadStream(file.name);
         
        var csvStream = csv()
            .on("data", function(data){
            func(data,req.body); 
            })
            .on("end", function(){
                 console.log("done.......................");
            });
         
        stream.pipe(csvStream);
        res.send("Back.....................");
      }
  



});
      
  
    
        


    }
    else
        res.render('err',{err:'ERROR'});
  

});


module.exports = router;

