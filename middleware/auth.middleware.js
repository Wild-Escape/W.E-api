const jwt = require ("jsonwebtoken");
const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) =>{
    const authorization = req.header("Authorization");

    if(!authorization) {
        return next(createError(401, "Authorization headder is required"));
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer"){
        return next(createError(401, "Authorization schema is not supported"))
    }
    if (!token) {
        return next(createError(401, "Token is required"));
      }
    
      const secret = process.env.JWT_SECRET || "change";

    jwt.verify(token, secret, (error, decoded) => {
        if(error) {
            return next(createError(401, error));
        }

        req.currentUserId = decoded.id;
        next()
    });
};