
var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');
var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);

/* GET home page. */
router.get('/', function(req, res, next) {
var name = req.query.nam;
//var val = req.query.val;
        var COMPANY = req.query.COMPANY;
		var MODEL = req.query.MODEL;
		var EC = req.query.EC;
		var ESC = req.query.ESC;
		var NAME=req.query.NAM;
	if(name=="EC")
	{
			var sql="select distinct EQUIPMENT_CATEGORY as data from  equipment_addition";
         	con.query(sql, function(err,result){
	    	 if(err){res.end('error');}
            else{ res.send(result);	} 
	}); 

	}
	else if(name=="ESC")
	{
			var sql="select distinct EQUIPMENT_SUBCATEGORY as data from equipment_addition where EQUIPMENT_CATEGORY='"+EC+"'";

         	con.query(sql, function(err,result){
	    	 if(err){res.end('error');}
            else{console.log(sql); 
            	res.send(result);	} 
	}); 

	}
	else if(name=="COMPANY")
	{
			var sql="select distinct COMPANY as data from equipment_addition where EQUIPMENT_SUBCATEGORY='"+ESC+"'and EQUIPMENT_CATEGORY='"+EC+"'";

         	con.query(sql, function(err,result){
	    	 if(err){res.end('error');}
            else{console.log(sql); 
            	res.send(result);	} 
	}); 

	}
	else if(name=="MODEL")
	{
			var sql="select distinct MODEL as data from equipment_addition where COMPANY='"+COMPANY+"'and EQUIPMENT_SUBCATEGORY='"+ESC+"'and EQUIPMENT_CATEGORY='"+EC+"'";

         	con.query(sql, function(err,result){
	    	 if(err){res.end('error');}
            else{console.log(sql); 
            	res.send(result);	} 
	}); 

	}
	else if(name=="NAME")
	{
			var sql="select distinct EQUIPMENT_NAME as data from equipment_addition where MODEL='"+MODEL+"' and COMPANY='"+COMPANY+"'and EQUIPMENT_SUBCATEGORY='"+ESC+"'and EQUIPMENT_CATEGORY='"+EC+"'";

         	con.query(sql, function(err,result){
	    	 if(err){res.end('error');}
            else{console.log(sql); 
            	res.send(result);	} 
	}); }
     else if(name=="EID")
	{
	  
			var sql="select distinct EQUIPMENT_NO as data from equipment_addition where EQUIPMENT_CATEGORY='"+EC+"' and EQUIPMENT_SUBCATEGORY='"+ESC+"' and COMPANY='"+COMPANY+"' and MODEL='"+MODEL+"' and EQUIPMENT_NAME='"+NAME+"'";
         	console.log(sql);
         	con.query(sql, function(err,result){
	    	 if(err){console.log(sql);
	    	 	res.end('error');}
            else{
            	res.send(result);	} 
	});    	

	}
	else{
		console.log("parag"+name);
	}

});

module.exports = router;
