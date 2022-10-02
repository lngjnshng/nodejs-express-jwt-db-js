
exports.getJwtSecret = () => {
    return process.env.JWT_SECRET || 'xlongitnftjwtsecret';
};