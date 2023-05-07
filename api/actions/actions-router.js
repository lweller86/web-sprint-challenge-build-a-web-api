// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const {
    validateActionId
} = require('./actions-middlware');

const Actions = require('./actions-model')

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.user)

});

router.post('/', (req, res, next) => {
    Actions.insert({ action: req.action })
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})



module.exports = router