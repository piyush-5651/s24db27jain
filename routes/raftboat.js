var express = require('express');
const raftboat_controlers= require('../controllers/raftboat');
var router = express.Router();

router.get('/', raftboat_controlers.raftboat_view_all_Page );

router.get('/detail', raftboat_controlers.raftboat_view_one_Page);

/* GET home page. */
router.get('/raftboat/:id', raftboat_controlers.raftboat_detail);

module.exports = router;

router.get('/create', raftboat_controlers.raftboat_create_Page);