// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const {
    validateActionId,
    validateAction,
    validateActionUpdate
} = require('./actions-middlware');

const Actions = require('./actions-model')

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)

});

router.post('/', validateAction, (req, res, next) => {
    Actions.insert({ 
        notes: req.notes, 
        description: req.description, 
        project_id: req.project_id })
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateActionUpdate, (req, res, next) => {
    Actions.update(
        req.params.id,
        {
            notes: req.notes,
            description: req.description,
            project_id: req.project_id,
            completed: req.completed
        }
    )
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
            .then(res => {
                res.json(res)
            })
    } catch (err) {
        next(err)
    }
})


router.use((err, req, res) => {
    res.status(err.status || 500).json({
        customMessage: 'Something Bad Happened',
        message: err.message,
        stack: err.stack
    })
})



module.exports = router