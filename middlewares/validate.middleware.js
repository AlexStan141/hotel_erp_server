const validate = (schema) => (req, res, next) => {

    if(req.body == undefined){
        return res.json({
            status: "error",
            code: 400,
            message: "No data provided"
        });
    }

    const {error, value} = schema.validate(req.body, {abortEarly: false});
    if(error){
        const errorMessages = error.details.map(detail => detail.message);
        return res.json({
            status: "error",
            code: 400,
            message: errorMessages
        });
    }

    req.body = value;
    next();

}

module.exports = validate