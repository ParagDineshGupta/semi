var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var url=require('url');
var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);


/* GET home page. */
//all proposal
router.get('/', function(req, res, next) {
	
	var sql="select * from amc_payment_table where overdue_payment>0 ";
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ res.render('payment',{title:'payment',data:result});	} 
	}); 
});
router.post('/', function(req, res, next) {
var mydata=req.body;
if(mydata.submit=="Save"){


var sql="update amc_payment_table set deposit_payment= deposit_payment +"+mydata.new_pay+", overdue_payment= overdue_payment -"+mydata.new_pay+" , last_installment="+mydata.installment_number+" where amcid="+mydata.amcid;
	console.log(sql);
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{
              	var sql="insert into amc_installment values(0,"+mydata.amcid+","+mydata.installment_number+","+mydata.new_pay+",'"+mydata.date_of_pay+"','"+mydata.pay_mode+"',0,'') ";
	console.log(sql);
	con.query(sql, function(err,result){
		 if(err){throw err;
		 }
        else{ 
     var sql="select * from amc_payment_table where overdue_payment>0 ";
	con.query(sql, function(err,result){
		 if(err){console.log(sql);
		throw err;}
        else{ res.render('payment',{title:'payment',data:result});	} 
	}); 	
        } 
	});  


     	} 
	}); 


}
else{

	console.log(mydata.amcid);
	var sql="select * from amc_payment_table where amcid="+mydata.amcid;
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ res.render('pay',{title:'payment',data:result});	} 
	}); 


}




});
module.exports = router;