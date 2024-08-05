console.clear();
import "reflect-metadata";
import "./config/container";
import express, {Application} from "express";
import sequelize from "./config/db";
import router from "./routes/Router";
import errorHanlder from "./middlewares/errorHandler";
import cors from "cors";

const PORT: number | string = process.env.PORT || 3306;

const app: Application = express();

app.use(cors());

const corsOptions = {
    origin: "http://localhost:3306",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    allowedHeaders: "Content-Type, Authorization",
    Credential: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router)
app.use(errorHanlder)

const startServer = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("There was an error trying to connect the database", error);
    }
}

startServer();