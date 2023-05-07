// Write your "projects" router here!
const express = require('express');
const {
    validateProjectId,
    validateNewProject,
    validateProject
} = require('./projects-middleware');

const Project = require('./projects-model')

const router = express.Router();

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

router.post('/:id', validateNewProject, (req, res, next) => {
    Project.insert
        ({
            name: req.name,
            description: req.description,
            completed: req.completed
        })
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {

    Project.update(
        req.params.id,
        {
            name: req.name,
            description: req.description,
            completed: req.completed
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


module.exports = router

