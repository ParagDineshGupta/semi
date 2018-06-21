var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('serchcust', { title: 'Search Customer',sub:'SEARCH' });

});

router.post('/', function(req, res, next) {

    var cn=req.body.cn; var em=req.body.em; var mob=req.body.mob; var amob=req.body.amob; var cp=req.body.cp; var type=req.body.type;
    var submit=req.body.submit;
    if(submit=='Add Customer')
        res.render('addcust', { title:'Add Customer',status:'DATA SAVED' })
});


module.exports = router;