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

// for a specific raftboat.
exports.raftboat_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: raftboat detail: " + req.params.id);
};

// Handle raftboat create on POST.
exports.raftboat_create_post = async function (req, res) {
  console.log(req.body);
  let document = new raftboat    ();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"substance":"Pastels", "size":"Expressionism", "price":120}

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
exports.raftboat_update_put = function (req, res) {
  res.send("NOT IMPLEMENTED: raftboat update PUT" + req.params.id);
};