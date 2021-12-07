const config = {
    server: {
        port: 3000,
        host: 'localhost'
    },
    db: {
        type: 'mongodb',
        host: 'localhost',
        port: undefined,
        name: 'demo',
        user: undefined,
        pass: undefined
    },
    bcrypt: {
        saltRounds: 10,
    },
    jwt: {
        secret: 'JWT_SECRET_KEY',
        expiration: '1800s',
        allowed: ['/api/auth/login']
    }
};

export default config;
