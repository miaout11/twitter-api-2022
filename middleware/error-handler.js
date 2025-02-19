module.exports = {
  generalErrorHandler (err, req, res, next) {
    if (err instanceof Error) {
      req.flash('error_messages', `${err.message}`)
    } else {
      req.flash('error_messages', `${err}`)
    }
    res.redirect('back')
    next(err)
  },
  apiErrorHandler (err, req, res, next) {
    if (err instanceof Error) {
      res.status(err.status || 500).json({
        success: false,
        message: `${err.message}`
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${err}`
      })
    }
    next(err)
  }
}
