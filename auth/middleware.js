const jwt = require("jsonwebtoken");
const JwtUtils = require("./jwtutils");

/**
 * Middle ware validating the token
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * @returns 
 */
const AuthMiddleWare = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(!authHeader){
        return response.status(401).send({message: 'Authorization header is required'});
    }
    // Authorization header must be Bearer ...
    const items = authHeader.split(" ");
    if(items.length !== 2){
        return response.status(401).send({message: 'Invalid authorization header'});
    }
    if(items[0].toUpperCase() !== 'BEARER'){
        return response.status(401).send({message: 'Invalid authorization header'});
    }
    // Verify the token
    const token = items[1];
    try{
        const decoded = jwt.verify(token, JwtUtils.getJwtSecret());
        request.user = decoded;
    }catch(error){
        return response.status(401).send({message: 'Invalid Token'});
    }
    return next();
};

module.exports = AuthMiddleWare;