var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var raftboat_controller = require('../controllers/raftboat');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// raftboats ROUTES ///
// POST request for creating a raftboats.
router.post('/raftboats', raftboat_controller.raftboat_create_post);
// DELETE request to delete raftboats.
router.delete('/raftboats/:id', raftboat_controller.raftboat_delete);
// PUT request to update raftboats.
router.put('/raftboats/:id', raftboat_controller.raftboat_update_put);
// GET request for one raftboats.
router.get('/raftboats/:id', raftboat_controller.raftboat_detail);
// GET request for list of all raftboats items.
router.get('/raftboats', raftboat_controller.raftboat_list);
module.exports = router;