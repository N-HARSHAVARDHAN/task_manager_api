import dotenv from "dotenv";

dotenv.config();

const env ={
    exp_port:process.env.PORT || 5000,

    database:{
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        name:process.env.DB_NAME,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD
    },
    jwt:{
        secret:process.env.JWT_SECRET
    },
    swagger:{
        serverUrl:process.env.SWAGGER_SERVER_URL
    }
};

export default env;