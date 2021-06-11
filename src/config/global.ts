const config = {
    server: {
        port: 3000,
        host: 'localhost'
    },
    db: {
        host: 'localhost',
        name: 'user',
    },
    bcrypt: {
        saltRounds: 10,
    },
    jwt: {
        secret: 'JWT_SECRET_KEY'
    }
};

export default config;
