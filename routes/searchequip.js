var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var qs = require('querystring');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);

router.get('/', function(req, res, next) {

     var of=0;
      var sql2 = "select * from customer_info order by EQUIPMENT_NO desc limit 1";
    con.query(sql2, function (err, result) {
        if (err) {console.log(sql2);
        res.render('err',{err:'ERROR'});}
        else {   
        res.render('serchequip', { title: 'All Equipment',data:result,p:'0',n:'1' });    
        }
       
    });


});

router.post('/', function(req, res, next) {

    
    var submit=req.body.submit;
       if(submit=='Previous'){
        
        var of=req.body.row;
        --of;
            var sql2 = "select * from customer_info order by cid desc limit 1 OFFSET "+of;
    con.query(sql2, function (err, result) {
        if (err) {console.log(sql2);
        res.render('err',{err:'ERROR'});}
        else {
             var len = Object.keys(result).length;
              
        res.render('serchcust', { title: 'All Customer',data:result,p:of,n:++of });    
        }
       
    });

    }
      if(submit=='Next'){

        var of=req.body.row;
            var sql2 = "select * from customer_info order by cid desc limit 1 OFFSET "+of;
    con.query(sql2, function (err, result) {
        if (err) {console.log(sql2);
        res.render('err',{err:'ERROR'});}
        else {
             var len = Object.keys(result).length;
             if(len==0)
             {
               res.render('serchcust', { title: 'All Customer',data:result,p:of,n:0 }); 
             }
              else
        res.render('serchcust', { title: 'All Customer',data:result,p:of,n:++of });    
        }
       
    });

    }
    if(submit=='SEARCH'){

        var cn=req.body.cn;
        var sql2 = "select * from customer_info where CUST_NAME LIKE '%"+cn+"%'";
        con.query(sql2, function (err, result) {
            if (err) {console.log(sql2);
                res.send('ERROR');
            }
            else {
                var len = Object.keys(result).length;
                if(len>0)
                 res.render('serchcust', { title: 'Search Result',data:result,p:0,n:0 }); 
             else
                 res.render('serchcust', { title: 'Search Result:DATA NOT FOUND',data:result,p:0,n:0 }); 
            }
            
           // res.render('resultcust', { title:cn,ed:'readonly',sub:'EDIT INFO',result:result,sq:sql2 })
        //else
          //  res.render('serchcust', { title: 'Search Customer',sub:'SEARCH',data:'Not Found' });
        });

    }

    if(submit=='EDIT INFO'){
        var cn=req.body.cn;
        var sql2 = "select * from customer_info where CUST_NAME='"+cn+"' ";
        con.query(sql2, function (err, result) {
            if (err) {console.log(sql2);
                throw err;
                console.log(sql2);
            }
            else {
                console.log('result');
            }
            var len = Object.keys(result).length;
            res.render('resultcust', { title:cn,ed:'',sub:'SAVE',result:result,sq:sql2 })
        });
    }

    if(submit=='SAVE'){
        //update
        var cn=req.body.cn; var em=req.body.em; var mob=req.body.mob; var amob=req.body.amob; var cp=req.body.cp; var type=req.body.type;var splcmnt =req.body.splcmnt;

        var sql2 = "UPDATE customer_info SET EMAIL='"+em+"',TEL_OFF='"+mob+"',TEL_RESD='"+amob+"',CONT_PERSON='"+cp+"',SPL_COMNT='"+splcmnt+"',CLASSIFICATION='"+type+"' WHERE CUST_NAME= '"+cn+"'";
        con.query(sql2, function (err, result) {
            if (err) {console.log(sql2);
                throw err;
                console.log(sql2);
            }
            else {
                console.log('result');
                var sql2 = "select * from customer_info where CUST_NAME='bogus' ";
                con.query(sql2, function (err, result) {
                    if (err) {console.log(sql2);
                        
                    }
                    else {
                        console.log('result');
                    }
                    var len = Object.keys(result).length;
                    res.render('serchcust', { title: 'Search Customer',sub:'SEARCH',result:result });
                });
            }

        });
        }

        

});


module.exports = router;