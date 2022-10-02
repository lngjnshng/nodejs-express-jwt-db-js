const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const db = require("../database/connection");
const Op = db.Sequelize.Op;
const User = db.models.User;

/**
 * Create a new user(account)
 * @param {*} request 
 * @param {*} response 
 */
exports.create = (request, response) => {
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

exports.update = (request, response) => {

};

exports.get = (request, response) => {
    if(!request.params || !request.params.id){
        response.status(400).send({message: "Parameters insufficient"});
        return;
    }
    const id = request.params.id;
    User.findByPk(id).then(data => {
        if(data){
            response.status(200).send(data);
        }else{
            response.status(404).send({message: 'Record not found'});
        }
    }).catch(error => {
        response.status(500).send({message: error.message || 'System error'});
    });
};

exports.delete = (request, response) => {

};

/**
 * Query the records and return with pagination format
 * @param {*} request 
 * @param {*} response 
 */
exports.paginate = (request, response) => {
    const { page, size, email }  = request.query;
    const conditions = email ? {email: {[Op.like]:`%${email}%`}} : null;
    const limit = size ? parseInt(size, 10) : 10;
    const offset = page ? (page - 1) * limit : 0;
    User.findAndCountAll({limit, offset, where: conditions}).then(data => {
        response.status(200).send(data);
    }).catch(error => {
        response.status(500).send({message: error.message || 'System error'});
    });
};