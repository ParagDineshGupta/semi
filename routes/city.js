//https://cp1.awardspace.net/beta/login/

//get sari company laye
//post city ke basis pr location laye
//date

var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "experimental"

});
con.connect(function(err) {
    if (err) throw err;
});

/* GET home page. */
router.get('/', function(req, res, next) {
	
	
	var city = req.query.city;
	var sql="select * from   where company_id="+company;
	con.query(sql, function (err,result) {
		 if(err){throw err;
            res.end('error');}
        else{
			console.log(result);
			//console.log(result[0].equip);
			//console.log(result[0]['equip']);
			Object.keys(result).forEach(function(prop) {
  // `prop` is the property name
  console.log(prop);
  // `data[prop]` is the property value
  console.log(result[prop]);
});
		}
        //var len = Object.keys(result).length;
		//if(len>0)
			 res.send(result);
        //else 
          //   res.send('paragGupta');	
	});
	
	
	
   
});

module.exports = router;
