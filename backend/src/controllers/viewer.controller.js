const viewCtrl = {};

const Pass = require("../models/pass");

viewCtrl.getPasses = async (req, res) => {
    const passes = await Pass.find();
    res.json(passes);
};

viewCtrl.getPass = async (req, res) => {
    const pass = await Pass.findById(req.params.id);
    res.json(pass);   
};

module.exports = viewCtrl;