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
    },
    session: {
        secret: 'SESSION_SECRET_KEY',
        resave: true,
        saveUninitialized: true
    },
    acl: {
        filename: 'permissions.json',
        path: 'src/config/',
        baseUrl: '/'
    }
};

export default config;
