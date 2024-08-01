const validate = (Schema) => async (req, res, next) => {
    try {
        const parseBody = await Schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (error) {
        error = error.issues.map((issue) => issue.message)[0]
        res.json(error)
    }
}

export default validate;