const requestLogger = (req, res, next) => {
    console.log(`[Incoming] ${req.method}: ${req.url}`)
    next()
}

export default requestLogger