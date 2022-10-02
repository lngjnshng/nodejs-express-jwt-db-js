module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        firstName:{
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        activated: {
            type: Sequelize.BOOLEAN
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });

    return {User: User};
};