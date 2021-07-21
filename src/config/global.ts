const config = {
    server: {
        port: 3000,
        host: 'localhost'
    },
    db: {
        type: 'mongodb',
        host: 'localhost',
        name: 'demo',
    },
    bcrypt: {
        saltRounds: 10,
    },
    jwt: {
        secret: 'JWT_SECRET_KEY'
    }
};

export default config;
