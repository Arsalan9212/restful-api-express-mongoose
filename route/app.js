const express = require('express');
const { Data } = require('../model/model');
const router = express.Router();
const checkAuth = require('../middleware/checkauth');

// GET ALL DATA
// localhost:3000/api/get   header authantication password
router.get('/get', checkAuth, async (req, res, next) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ON SPECIFIC ID
//localhost:3000/api/get/ (id)
router.get('/get/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Data.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST request
//localhost:3000/api/post
router.post('/post', async (req, res) => {
  try {
    const data = new Data({
      name: req.body.name,
      age: req.body.age,
    });
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATA DATA BY PUT
//localhost:3000/api/put/:id (id which one is in db that want be updated)
router.put('/put/:id', async (req, res) => {
  try {
    const result = await Data.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    const updateData = await Data.findById(req.params.id); // No need to use this line for the response
    res.status(200).json({ message: updateData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH REQUEST
router.patch('/patch/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedData = req.body;
    const result = await Data.findByIdAndUpdate(_id, updatedData);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE DATA
//localhost:3000/api/delete/(id which we want to delete)
router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Data.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'data is deleted on the base of id' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
