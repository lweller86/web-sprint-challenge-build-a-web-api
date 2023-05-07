// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId (req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({
                message: 'not found'
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'Problem finding User'
        })
    }
}

function validateNewProject(req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({
            message: 'Missing required name field'
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({
            message: 'Missing required text field'
        })
    } else {
        req.description = description.trim()
        req.name = name.trim()
        next()
    }
}

module.exports = {
    validateProjectId,
    validateNewProject,
    validateProject
}