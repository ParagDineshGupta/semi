var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var qs = require('querystring');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);
/* GET users listing. */
router.get('/', function(req, res, next) {

    

    res.render('makecomp', { title: 'MAKE COMPLAINT' });

   

});

router.post('/', function(req, res, next) {

        var data=req.body;
        var dateTime = require('node-datetime');
var dt = dateTime.create();
//var formatted = dt.format('Y-m-d H:M:S');
var formatted = dt.format('Y-m-d');
data.COMPLAIN_DATE_TIME=formatted;
data.STATUS="pending";

       
    con.query("insert into  complaint_master set ?",data,function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('results');
        }
        
        res.render('makecomp', { title: 'MAKE COMPLAINT'});});});




module.exports = router;
