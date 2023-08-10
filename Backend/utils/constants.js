module.exports = {
    database: {
        options: {
            connectTimeoutMS: 30000,
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: 1,
            poolSize: 10,
        }
    },
    user:{
        roles: ["Admin", "User"]
    },
    roles:{
        admin: 'Admin',
        user: 'User',
    }
}