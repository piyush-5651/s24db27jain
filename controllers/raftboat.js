var raftboat = require("../models/raftboat");
// List of all raftboat
exports.raftboat_list = async function (req, res) {
  try {
    theraftboats = await raftboat.find();
    res.send(theraftboats);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.raftboat_view_all_Page = async function (req, res) {
  try {
    theraftboats = await raftboat.find();
    res.render("raftboat", {
      title: "raftboat Search Results",
      results: theraftboats,
    });
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

exports.raftboat_detail = async function (req, res) {
  console.log("detail" + req.params.id);
  try {
    result = await raftboat.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};

// Handle raftboat create on POST.
exports.raftboat_create_post = async function (req, res) {
  console.log(req.body);
  let document = new raftboat    ();

  document.substance = req.body.substance;
  document.size = req.body.size;
  document.price = req.body.price;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle raftboat delete from on DELETE.
exports.raftboat_delete = function (req, res) {
  res.send("NOT IMPLEMENTED: raftboat delete DELETE " + req.params.id);
};
// Handle raftboat update form on PUT.
exports.raftboat_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await raftboat.findById(req.params.id);
    // Do updates of properties
    if (req.body.substance) toUpdate.substance = req.body.substance;
    if (req.body.size) toUpdate.size = req.body.size;
    if (req.body.price) toUpdate.price = req.body.price;
    let result = await toUpdate.save();
    console.log("Sucess " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}: Update for id ${req.params.id}failed`);
  }
};