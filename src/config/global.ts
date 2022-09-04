const config = {
    api: {
        baseUrl: "/api",
    },
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
        allowed: ['/api/', '/api/auth/login']
    },
    session: {
        secret: 'SESSION_SECRET_KEY',
        resave: true,
        saveUninitialized: true
    },
    acl: {
        filename: 'permissions.json',
        path: 'src/config/',
        baseUrl: '/api'
    },
    components: {
        path: './src/api/components'
    },
    swagger: {
        route: '/api/docs'
    },
    default: {
        pagination: {
            limit: 10
        }
    }
};

export default config;
