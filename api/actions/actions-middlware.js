const Actions = require('../actions/actions-model')

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id)
    if (!action) {
      res.status(404).json({
        message: 'id not found'
      })
    } else {
      req.action = action
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'missing required name'
    })
  }
}

function validateAction(req, res, next) {
  const { description, project_id, notes } = req.body
  if (
    !description ||
    !project_id ||
    !notes
  ) {
    res.status(400).json({
      message: 'Missing required text field'
    })
  } else {
    req.notes = notes.trim()
    req.description = description.trim()
    req.project_id = project_id.trim
    next()
  }
}

function validateActionUpdate(req, res, next) {
  const { notes, description, project_id, completed } = req.body

  if (
    !notes ||
    !description ||
    !project_id ||
    completed === undefined) {
    res.status(400).json({
      message: 'missing required text field'
    })
  } else {
    req.notes = notes.trim()
    req.description = description.trim()
    req.project_id = project_id
    req.completed = completed
    next()
  }
}

module.exports = {
  validateAction,
  validateActionId,
  validateActionUpdate
}
