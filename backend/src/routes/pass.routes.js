const express = require("express");
const router = express.Router();

const Pass = require("../models/pass");
const { json } = require("express");

router.get('/', async (req, res) => {
  const passes = await Pass.find();
  console.log(passes);
  res.json(passes);
});

router.get('/:id', async (req, res) => {
    const pass = await Pass.findById(req.params.id);
    res.json(pass);
  });

router.post('/', async (req, res) => {
  const { web, user, password, email, clave, observations } = req.body;
  const pass = new Pass({
    web,
    user,
    password,
    email,
    clave,
    observations,
  });
  await pass.save();
  res.json({status: 'Pass saved'});
});

router.put('/:id', async (req, res) => {
  const { web, user, password, email, clave, observations } = req.body;
  const newPass = {
    web,
    user,
    password,
    email,
    clave,
    observations,
  };
  await Pass.findByIdAndUpdate(req.params.id, newPass);
  res.json({status: 'Pass updated'});
});

router.delete('/:id', async (req, res) => {
    await Pass.findByIdAndRemove(req.params.id);
    res.json({status: 'Pass deleted'});
});

module.exports = router;
