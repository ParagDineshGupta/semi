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
router.post('/', function(req, res, next) {});