
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
		console.log(mydata);
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
else if(mydata.submit=="save")
{
	console.log(typeof(mydata.total));
//amc no.
//insert in amc table
// change status in proposaltable



 if(typeof(mydata.total)!='object'){
var sql="insert into amc_table values(0,'"+mydata.amcno+"','"+2+"','"+mydata.equipserial+"',"+mydata.total+","+4+",'"+mydata.startdate+"','"+mydata.expdate+"',12000,'"+mydata.period+"',"+mydata.rpe+")";
console.log(sql);
con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ 

var sql="update proposal_table set state='amc' where idproposal_table= "+mydata.pid ;
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        
	}); 
	var sql="insert into amc_payment_table values(0,'"+mydata.amcno+"','overdue','date',"+mydata.totalpayment+","+mydata.advancepayment+","+mydata.corepayment+",'"+mydata.pay_mode+"')";
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        
	});


	var sql="select * from proposal_table where state in ('final','proposed')";
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ res.render('service',{title:'service',data:result});	} 
	}); 

        	} 
	}); 
}
else{
	let n=0;
		for(let i=0;i<mydata.total.length;i++) 
		{
			var serialset="";
			for(let j=n;j<(n-0)+(mydata.total[i]-0);j++)
				{
					if(serialset=="")
						serialset=mydata.equipserial[j];
						else
					serialset=serialset+","+mydata.equipserial[j];
		      }
		      n=(n-0)+(mydata.total[i]-0);
		      var x=mydata.total[i];
console.log((n-0)+(x-0));
			var sql="insert into amc_table values(0,'"+mydata.amcno+"','"+2+"','"+serialset+"',"+mydata.total[i]+","+4+",'"+mydata.startdate[i]+"','"+mydata.expdate[i]+"',12000,'"+mydata.period[i]+"',"+mydata.rpe[i]+")";
console.log(sql);
con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ 

var sql="update proposal_table set state='amc' where idproposal_table= "+mydata.pid ;
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        
	}); 

var sql="insert into amc_payment_table values(0,'"+mydata.amcno+"','overdue','date',"+mydata.totalpayment+","+mydata.advancepayment+","+mydata.corepayment+",'"+mydata.pay_mode+"')";
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        
	});

	var sql="select * from proposal_table where state in ('final','proposed')";
	con.query(sql, function(err,result){
		 if(err){res.end('error');}
        else{ res.render('service',{title:'service',data:result});	} 
	}); 

        	} 
	});


		}
}

console.log(mydata);
	

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
