
var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var url=require('url');
var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);

const fileUpload = require('express-fileupload');
router.use(fileUpload());

/* GET home page. */
//all proposal
router.get('/', function(req, res, next) {
	var ebid=req.query.e;
	var sql="select * from proposal_table where state in ('final','proposed')";
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ res.render('service',{title:'service',data:result});	} 
	}); 
});
router.post('/', function(req, res, next) {
	var mydata=req.body;

	var data2=req.files;
	console.log(mydata,data2);
	console.log();
	var file = req.files.mypdf;
	file.mv('uploads/'+file.name, function(err){
		if(err) throw err;
		else {console.log("lo ho gaya..............");
		               var dateTime = require('node-datetime');
var dt = dateTime.create();
//var formatted = dt.format('Y-m-d H:M:S');
var formatted = dt.format('Y-m-d');
		mydata.dop=formatted;
	mydata.comment=req.files.mypdf.name;
	con.query("insert into proposal_table set ?",mydata,function(err,result){
 		 if(err){console.log(err);
 		 	res.end('error');}
         else{ res.write('amc');
         res.end();	} 
 	}); }

	});

        
      });



module.exports = router;
