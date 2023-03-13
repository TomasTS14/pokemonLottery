import express, { Request, Response } from "express";
import PokemonUsecases from "../../application/pokemon.Usecases";
import PokemonRepository from "../../domain/pokemon.repository";
import PokemonRepositoryPostgresSQL from "../db/pokemon.repository.postgres";
import Pokemon from "../../domain/pokemon";
import { isAuth } from "../../../context/security/auth";

const pokemonRouter = express.Router();

const pokemonRepository: PokemonRepository = new PokemonRepositoryPostgresSQL();
const pokemonUsecases: PokemonUsecases = new PokemonUsecases(pokemonRepository);

pokemonRouter.get("/", isAuth, async (req: Request, res: Response) => {
    try {
        const appuser_id = req.body.auth.id;
        const pokemons = await pokemonUsecases.getPokemons(appuser_id);
        res.json(pokemons);
    } catch (err) {
        res.status(500).send(err);
    }
});

pokemonRouter.get("/:id", isAuth, async (req: Request, res: Response) => {
    try {
        const id: number = Number(req.params.id);

        const pokemon = await pokemonUsecases.getPokemonById(id);
        res.json(pokemon);
    } catch (err) {
        res.status(500).send(err);
    }
});

pokemonRouter.post("/", isAuth, async (req: Request, res: Response) => {

    try {
        console.log(req.body);

        const pokemon: Pokemon = {
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,
            appuser_id: req.body.appuser_id,
            species: req.body.species,
        }
        const newPokemon = await pokemonUsecases.insertPokemon(pokemon);
        res.json(newPokemon);
    } catch (err) {
        res.status(500).send(err);
    }
});

pokemonRouter.put("/:id", isAuth, async (req: Request, res: Response) => {
    try {
        const appuser_id = req.body.auth.appuser_id;
        const id: number = Number(req.params.id);
        const pokemon: Pokemon = {
            id: id,
            name: req.body.name,
            type: req.body.type,
            appuser_id: appuser_id,
            species: req.body.species,
        }
        const updatedPokemon = await pokemonUsecases.changePokemon(pokemon);
        res.json(updatedPokemon);
    } catch (err) {
        res.status(500).send(err);

    }
});

pokemonRouter.delete("/:id", isAuth, async (req: Request, res: Response) => {
    try {
        const id: number = Number(req.params.id);
        const deletedPokemon = await pokemonUsecases.deletePokemon(id);
        res.json(deletedPokemon);

    } catch (err) {
        res.status(500).send(err);
    }
});

export { pokemonRouter }
