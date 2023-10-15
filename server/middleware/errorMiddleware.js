// ERROR MIDDLEWARE | NEXT FUNCTION 

const errorMiddleware = (err, req, res, next) => {
    const defultError ={
        statuscode: 404,
        success: "Failed",
        message: err,
    };
    
    if (err?.name === "ValidationError"){
        defultError.statuscode = 404;

        defultError.message = Object.values(err, errors)
        .map((el) => el.message)
        .join(",");
    }

    // dublication error

    if (err.code && err.code === 11000) {
        defultError.statuscode = 404;
        defultError.message = `${Object.values(
            err.keyValue
        )} field has to be unique! `;
    }

    res.status(defultError.statuscode).json({
        success: defultError.success,
        message: defultError.message,
    });
};

export default errorMiddleware;