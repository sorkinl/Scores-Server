const express = require('express');
const mongoose = require('mongoose');

const Match = mongoose.model('Match');

const router = express.Router();

router.get('/matches',  async (req, res) => {
    const matches = await Match.find({});
    res.send(matches);
});

router.post('/matches', async (req,res) => {
    const { match } = req.body;

    if(!match) {
        return res.status(422).send({error: 'You must provide a match'});
    }
    try {
    const matchModel = new Match({match});
    await matchModel.save();
    res.send(matchModel);
    } catch (err) {
        res.status(422).send({error: err.message});
    }
})

module.exports = router; 