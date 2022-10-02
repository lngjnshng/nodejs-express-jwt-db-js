const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const db = require("../database/connection");
const JwtUtils = require("../auth/jwtutils");
const Op = db.Sequelize.Op;
const User = db.models.User;

/**
 * Login with email and password
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
exports.login = (request, response) => {
    let {username, password} = request.body;
    // Check the parameters at first
    if(!username || !password){
        response.status(400).send({message: 'Parameters are not insufficient'});
        return;
    }
    // Find the user information by user name
    User.findOne({where: {email: username}}).then(data => {
        if(data){
            if(!bcrypt.compareSync(password, data.password)){
                // Password not correct
                response.status(401).send({message: 'Username or password is not correct'});
            }else if(!data.activated){
                response.status(401).send({message: 'Account is not activated'});
            }else{
                // Generate the token
                const secret = JwtUtils.getJwtSecret();
                const token = jwt.sign({id: data.id, email: data.email}, secret, {expiresIn: '8h'});
                response.status(200).send({user:data, token: token});
            }
        }else{
            // User not found by email
            response.status(401).send({message: 'Username or password is not correct'});
        }
    }).catch(error => {
        response.status(500).send({message: error.message || 'System error'});
    })
};

exports.register = (request, response) => {
    const salt = bcrypt.genSaltSync(10);
    const createdAt = new Date();
    const entity = {
        id: uuidv4(),
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, salt),
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        activated: true,
        createdAt: createdAt,
        updatedAt: createdAt
    };
    User.create(entity).then(data => {
        response.status(200).send(data);
    }).catch(error => {
        response.status(500).send({
            message: error.message || 'System error'
        });
    });
};