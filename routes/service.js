
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
if(mydata.state=="amc")
{
		var sql="select * from serial_number_table where ebid = "+mydata.ebid;
	con.query(sql, function(err,result1){
		 if(err){res.end('error');}
        else{
var sql="select * from proposal_table where idproposal_table = "+mydata.pid;
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ res.render('create',{title:'AMC',data:result,data1:result1});	} 
	}); 

        } 
	}); 



	

}
else
{
	var sql="update proposal_table set state = '"+mydata.state+"' where idproposal_table = "+mydata.pid;
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ 
        		var sql="select * from proposal_table where state in ('final','proposed')";
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ res.render('service',{title:'service',data:result});	} 
	}); 

        		} 
	}); 

}



        
      });



module.exports = router;
