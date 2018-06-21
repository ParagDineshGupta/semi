
var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');
var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);

/* GET home page. */
router.get('/', function(req, res, next) {
	var loc = req.query.loc;
	var sql="select * from zone_table where zone='"+loc+"'";
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ res.send(result);	} 
	}); 
});

module.exports = router;
