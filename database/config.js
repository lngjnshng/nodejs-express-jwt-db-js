const DBConfig = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'nftdb',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    dialect: process.env.DB_TYPE || 'sqlite'
};

module.exports = DBConfig;