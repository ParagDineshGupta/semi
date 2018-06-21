var express = require('express');
var router = express.Router();

var url = require('url');
var mysql = require('mysql');
var qs = require('querystring');

var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);
/* GET users listing. */
router.get('/', function(req, res, next) {

	var sql="select * from  complaint_table inner join complaint_extension on complaint_table.idcomplaint=complaint_extension.idcomplaint ORDER BY complaint_extension.idcomplaint DESC";
	con.query(sql, function (err,result) {
		 if(err){
            res.end(err);}
        else{
			 console.log('result');
			 var len = Object.keys(result).length;
		     if(len>0)
			 res.render('searchcomp', { title:'SEARCH COMPLAINT',data:result,status:"" });
			else
			res.render('searchcomp', { title:'SEARCH COMPLAINT',data:result,status:"NOT FOUND NEW COMPLAINT" });
		}
     
	});
   

});
router.post('/', function(req, res, next) {
	var x=req.body.submit;
	console.log(x);
    if(x=='search'){
    	 var fd=req.body.fdate; 
    var td=req.body.tdate;
     var status=req.body.state;

        var sql="SELECT * From complaint_table inner join complaint_extension on complaint_table.idcomplaint=complaint_extension.idcomplaint  WHERE status='"+status+"' AND doc BETWEEN '"+fd+"' AND '"+td+"' ORDER BY complaint_extension.idcomplaint DESC";
       con.query(sql, function (err, result) {
            if (err) {console.log(sql);
                
            }
            else {var len = Object.keys(result).length;
		     if(len>0)
			 res.render('searchcomp', { title:'SEARCH COMPLAINT',data:result,status:"" });
			else
			res.render('searchcomp', { title:'SEARCH COMPLAINT',data:result,status:"NOT FOUND" });
                
            }
          
        });


    }
    else if(x=='view'){
    
        var cid=req.body.idcomplaint; 
        var sql="SELECT * From complaint_table inner join complaint_extension on complaint_table.idcomplaint=complaint_extension.idcomplaint WHERE complaint_extension.idcomplaint= "+cid+" ORDER BY complaint_extension.idcomplaint DESC";
       con.query(sql, function (err, result) {

            if (err) {console.log(sql);}
            else {
            	var len = Object.keys(result).length;
		     if(len==1)
			 { 
                 var sql2="SELECT * From equipment_table where ebid="+result[0].ebid;
                 con.query(sql2, function (err, result2) {
            if (err) {console.log(sql2);}
            else { 

            	var sql3="SELECT * From equipment_addition where EQUIPMENT_NO="+result2[0].eid;
                 con.query(sql3, function (err, eresult) {
                 if (err) {console.log(sql3);}
                 else{

                 	 var lsql="SELECT * From location_table where lid="+result2[0].lid;
                 con.query(lsql, function (err, lresult) {
                 if (err) {console.log(lsql);}     
                 else
                 {
                  var csql="SELECT * From customer_info where cid="+lresult[0].cid;
                 con.query(csql, function (err, cresult) {
                 if (err) {console.log(csql);}
                  else
                 {
                 	 var ssql="SELECT * From supervisor_table where zone='"+lresult[0].zone+"'";
                 con.query(ssql, function (err, sresult) {
                 if (err) {console.log(ssql);}
                  else
                 {

                 	res.render('compext', { title:'COMPLAINT',data:result,status:"",sdata:sresult,edata:eresult,cdata:cresult,ldata:lresult,eadata:result2 });
                 	
                 }
                       });
                 }
                       });
                
                 }
 });

                 }

                  });
                


              }});
			 	}  
     
			else
			res.render('searchcomp', { title:'SEARCH COMPLAINT',data:result,status:"NOT FOUND" });
                
            }
          
        });


    }
       else if(x=='save'){
        
        var data=req.body;
        var cexid=req.body.cexid;
        console.log(data);

         delete data.submit;
         delete data.cexid;
        con.query("UPDATE complaint_extension SET ? where idcomplaint='"+cexid+"' ",data, function (err, result) {
            if (err) {console.log(err); }
            else {
                res.send("data saved");
            }
          
         });


    }
    else
        res.render('err',{err:'ERROR'});

});


module.exports = router;
