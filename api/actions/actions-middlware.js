// add middlewares here related to actions
const Actions = ('../actions/actions-model')

function logger( req, res, next ) {
    console.log(
        `[${new Date().toISOString()}]
        ${req.method}
        to ${req.url}
        from ${req.get('Origin')}`
    );
    next();
}

async function validateActionId(req, res, next) {
    try {
      const action = await Actions.get(req.params.id)
      if (!action) {
        res.status(400).json({
          message: 'user not found'
        })
      } else {
        req.action = action
        next()
      }
    } catch (err) {
      res.status(404).json({
        message: 'missing required name'
      })
    }
  }

  function validateAction(req, res, next) {
    const { action } = req.body
    if (!action || !action.trim()) {
      res.status(400).json({
        message: 'Missing required name field'
      })
    } else {
      req.name = name.trim()
      next()
    }
  }

  module.exports = {
    logger,
    validateActionId
  }
