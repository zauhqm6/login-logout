const zod = require("zod")

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        console.error('Validation error:', err); // Log the entire error for debugging

        // Default to a generic error message if the error structure is unknown
        const status = 400; // Bad Request
        const message = err.errors && err.errors.length > 0
            ? err.errors[0].message
            : 'Validation error occurred';

        const error = {
            status,
            message
        };
        console.log(error)
        next(error);
    }
};

module.exports = validate
