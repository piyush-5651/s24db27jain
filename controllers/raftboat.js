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

exports.raftboat_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id);
  try {
    result = await raftboat.findById(req.query.id);
    res.render("raftboatdetail", {
      title: "raftboat Detail",
      toShow: result,
    });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
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

exports.raftboat_delete = async function (req, res) {
  console.log("delete " + req.params.id);
  try {
    result = await raftboat.findByIdAndDelete(req.params.id);
    console.log("Removed " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": Error deleting ${err}}`);
  }
}
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

exports.raftboat_create_Page = function (req, res) {
  console.log("create view");
  try {
    res.render("raftboatcreate", { title: "raftboat Create" });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a raftboat.
// query provides the id
exports.raftboat_update_Page = async function (req, res) {
  console.log("update view for item " + req.query.id);
  try {
    let result = await raftboat.findById(req.query.id);
    res.render("raftboatupdate", {
      title: "raftboat Update",
      toShow: result,
    });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle a delete one view with id from query
exports.raftboat_delete_Page = async function (req, res) {
  console.log("Delete view for id " + req.query.id);
  try {
    result = await raftboat.findById(req.query.id);
    res.render("raftboatdelete", {
      title: "raftboat Delete",
      toShow: result,
    });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};