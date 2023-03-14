import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { NextFunction } from "express";
import cors from 'cors'
import { appuserRouter } from "./appuser/infrastructure/rest/appuser.router";
import { pokemonRouter } from "./pokemon/infrastructure/rest/pokemon.router";

dotenv.config();

const corsOptions = {
    origin: ["https://pokemon-lottery-ul8n.vercel.app"]
}

const app = express();

app.use(express.json());

app.use(cors(corsOptions))


app.use(express.json());



app.use("/users", appuserRouter)
app.use("/pokemons", pokemonRouter)

app.use("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World!");
});

export { app }
