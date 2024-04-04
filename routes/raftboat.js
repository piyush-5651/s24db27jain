var express = require('express');
const raftboat_controlers= require('../controllers/raftboat');
var router = express.Router();

router.get('/', raftboat_controlers.raftboat_view_all_Page );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('raftboat', { title: 'Search Results - raft boat' });
});

module.exports = router;