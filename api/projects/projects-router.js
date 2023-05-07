const express = require('express');

const {
    validateProjectId,
    validateNewProject,
    validateProject
} = require('./projects-middleware');

const router = express.Router();
const Project = require('./projects-model')

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert({
        name: req.name,
        description: req.description,
        completed: req.completed
    })
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProjectId, validateNewProject, (req, res, next) => {

    Project.update(
        req.params.id,
        {
            name: req.name,
            description: req.description,
            completed: req.completed
        })
        .then(() => {
            return (Project.get(req.params.id))
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(res => {
            res.json(res)
        })
        .catch(next)
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.getProjectActions(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
});

router.use((err, req, res) => {
    res.status(err.status || 500).json({
        customMessage: 'Something Bad Happened',
        message: err.message,
        stack: err.stack
    })
})


module.exports = router

