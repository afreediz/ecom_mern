module.exports = (err, req, res, next)=> {
    console.log(err);
    if(err.code == 11000){
        err.message = "Duplicate Field Value Enter"
    }
    switch(err.name){
        case "SyntaxError":
            err.message = "Unexpected syntax"
        case "CastError":
            err.message = "Please provide a valid id"
        case "TokenExpiredError":
            err.message = "jwt expired"
        case "JsonWebTokenError":
            err.message = "Signin required"
        default:
            // do nothing
    }

    return res.status(err.statusCode || 500).json({
        success:false,
        message:err.message || 'Internal server error'
    })
}