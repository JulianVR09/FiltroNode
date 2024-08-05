import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import { resolve } from "path";
import { Dialect } from "sequelize";
import UserModel from "../models/userModel";
import ProductModel from "../models/productModel";

config({path: resolve(__dirname, "../../.env")});

const dialect: Dialect | undefined = process.env.DB_DIALECT as Dialect;
const dbhost: string | undefined = process.env.DB_HOST;
const dbUser: string | undefined = process.env.DB_USER;
const dbPass: string | undefined = process.env.DB_PASSWORD;
const dbName: string | undefined = process.env.DB_NAME;

if(!dialect || !dbhost || !dbUser || !dbPass || !dbName){
    throw new Error("Environment variables not set up correctly.");
};

const sequelize: Sequelize = new Sequelize({
    dialect: dialect,
    host: dbhost,
    username: dbUser,
    password: dbPass,
    database: dbName,
    models: [UserModel, ProductModel],
});

export default sequelize;