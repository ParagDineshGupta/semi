var express = require('express');
var router = express.Router();
var url = require('url');
var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);
var qs = require('querystring');

var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');

router.get('/', function(req, res, next) {
    

     

    var sql2="select * from  equipment_addition group by EQUIPMENT_CATEGORY";
    con.query(sql2, function (err, result) {
        if (err) {console.log(sql2);
            throw err;
            console.log(sql2);
        }
        else {
            console.log('result');
        }
        var bsql="select * from  equipment_addition where 0 ";
    con.query(bsql, function (err, bogus){

         if (err) {
            throw err;
            console.log('err');
        }
        else {
            console.log(bsql);
            res.render('addequip', { title:'Add Equipment',value1:'',value2:'',value3:'',value4:'',value5:'',status:' ' ,result:result,result1:bogus,result2:bogus,result3:bogus,result4:bogus,result5:bogus });
        }
    });
        
    });



});

router.post('/', function(req, res, next) {
     var ec=req.body.ec;
    var esc=req.body.esc;
    var company=req.body.company;
    var emodel=req.body.emodel;
    var ename=req.body.ename;
    var sp=req.body.sp;

 var submit=req.body.sub;
    if(submit=='Add Equipment'){
     var csql="select * from equipment_addition where MODEL='"+emodel+"'";
     con.query(csql, function (err, result) {
        if (err) {console.log(sql);
            throw err;
            console.log('err');
        }
        else {
            console.log('result');
            if(result.length>0)
            {     
                  var sql2="select * from  equipment_addition group by EQUIPMENT_CATEGORY";
    con.query(sql2, function (err, result) {
        if (err) {console.log(sql2);
            throw err;
            console.log(sql2);
        }
        else {
            console.log('result');
        }
        var bsql="select * from  equipment_addition where 0 ";
    con.query(bsql, function (err, bogus){

         if (err) {
            throw err;
            console.log('err');
        }
        else {
            console.log(bsql);
            res.render('addequip', { title:'Add Equipment',value1:'',value2:'',value3:'',value4:'',value5:'',status:' THIS DATA IS ALREADY IN OUR SYSTEM ' ,result:result,result1:bogus,result2:bogus,result3:bogus,result4:bogus,result5:bogus });
        }
    }); 
    });
            }
            else
            {
                var sql2 = "INSERT INTO equipment_addition VALUES('','"+ ec +"','"+esc +"','"+company+"','"+ emodel  +"','"+ ename  +"','"+ sp +"')";
                   con.query(sql2, function (err,iresult){

         if (err) {
            throw err;
            console.log('err');
        }
        else {
            var sql2="select * from  equipment_addition group by EQUIPMENT_CATEGORY";
    con.query(sql2, function (err, result) {
        if (err) {console.log(sql2);
            throw err;
            console.log(sql2);
        }
        else {
            console.log('result');
        }
        var bsql="select * from  equipment_addition where 0 ";
    con.query(bsql, function (err, bogus){

         if (err) {
            throw err;
            console.log('err');
        }
        else {
            console.log(bsql);
            res.render('addequip', { title:'Add Equipment',value1:'',value2:'',value3:'',value4:'',value5:'',status:'EQUIPMENT ADDED ' ,result:result,result1:bogus,result2:bogus,result3:bogus,result4:bogus,result5:bogus });
        }
    });
        
    });
            
        }
    });
               



            }
        }
        }); 
        '"+ +"','"+  +"','"+ +"','"++"','"+   +"','"+   +"','"+  +"','"+   +"'
        // con.query(sql2, function (err, result) {
        //     if (err) {console.log(sql2);
        //         throw err;
        //         console.log(sql2);
        //     }
        //     else {
        //         console.log('result');
        //     }
        //     res.render('addcust', { title:'Add Customer',status:'DATA SAVED' });
        // });
    }

else{
      var sql = "SELECT EQUIPMENT_CATEGORY  FROM  equipment_addition where EQUIPMENT_CATEGORY='"+ec+" ' group by EQUIPMENT_CATEGORY ;SELECT EQUIPMENT_SUBCATEGORY FROM equipment_addition  where EQUIPMENT_CATEGORY ='"+ec+"' group by EQUIPMENT_SUBCATEGORY;SELECT  COMPANY FROM  equipment_addition where EQUIPMENT_SUBCATEGORY='"+esc+"'group by COMPANY ;SELECT  MODEL FROM  equipment_addition where COMPANY='"+company+"' and  EQUIPMENT_SUBCATEGORY='"+esc+"' group by MODEL;SELECT EQUIPMENT_NAME FROM  equipment_addition where MODEL='"+emodel+"'group by EQUIPMENT_NAME ;SELECT  EQUIPMENT_SPECIFICATION FROM  equipment_addition where EQUIPMENT_NAME='"+ename+"'and MODEL='"+emodel+"'  ";

    con.query(sql, function (err, result) {
        if (err) {console.log(sql);
            throw err;
            console.log('err');
        }
        else {
            console.log('result');
        }
    
            res.render('addequip', { title:'Add Equipment',value1:ec,value2:esc,value3:company,value4:emodel,value5:ename,status:' ' ,result:result[0],result1:result[1],result2:result[2],result3:result[3],result4:result[4],result5:result[5] });
        }); 
}
    
    });





     

   

    // con.query(sql, function (err, results) {
    //     if (err) {
    //         throw err;
    //      console.log(err);
    //     }
    //     else {
            
    //     }
    //     var len = Object.keys(results[0]).length;
    //     res.render('addequip', { title: 'Add Equipment',result:results[0],result1:results[1],result2:results[2],result3:results[3]  });});});

module.exports = router;
