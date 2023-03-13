import Pokemon from "../../domain/pokemon";
import PokemonRepository from "../../domain/pokemon.repository";
import executeQuery from "../../../context/db/postgres.connector";


export default class PokemonRepositoryPostgresSQL implements PokemonRepository {
    async getPokemons(appuser_id: number): Promise<Pokemon[]> {
        try {
            const query = `SELECT * FROM pokemons WHERE user_id = ${appuser_id}`

            const pokemonsDB: any[] = await executeQuery(query)

            const pokemons: Pokemon[] = pokemonsDB.map((pokemonDB: any) => {
                return {
                    id: pokemonDB.id,
                    appuser_id: pokemonDB.user_id,
                    name: pokemonDB.name,
                    type: pokemonDB.type,
                    species: pokemonDB.species
                }
            })

            return pokemons

        } catch (error) {
            console.error(error)
        }

        return [] as Pokemon[]
    }
    async getPokemonById(id: number): Promise<Pokemon> {
        try {
            const query = `SELECT * FROM pokemons WHERE id = ${id}`

            const pokemonDB: any[] = await executeQuery(query)

            const pokemon: Pokemon = {
                id: pokemonDB[0].id,
                appuser_id: pokemonDB[0].appuser_id,
                name: pokemonDB[0].name,
                type: pokemonDB[0].type,
                species: pokemonDB[0].species
            }

            return pokemon
        } catch (error) {
            console.error(error)
        }

        return {} as Pokemon
    }
    async insertPokemon(pokemon: Pokemon): Promise<Pokemon> {

        try {
            const query = `INSERT INTO pokemons (id, user_id, name, type, species) VALUES (${pokemon.id} ,${pokemon.appuser_id}, '${pokemon.name}', '${pokemon.type}', '${pokemon.species}') RETURNING *;`
            console.log(query);

            const pokemonDB: any[] = await executeQuery(query)
            return pokemon
        } catch (error) {
            console.error(error)
        }
        return {} as Pokemon
    }
    async changePokemon(pokemon: Pokemon): Promise<Pokemon> {
        try {
            const query = `UPDATE pokemons SET name = '${pokemon.name}', type = '${pokemon.type}', species = '${pokemon.species}' WHERE id = ${pokemon.id} RETURNING *;`
            const pokemonDB: any[] = await executeQuery(query)
            pokemon.id = pokemonDB[0].id;
            return pokemon
        } catch (error) {
            console.error(error)
        }
        return {} as Pokemon
    }
    async deletePokemon(id: number): Promise<number> {
        try {
            const query = `DELETE FROM pokemons WHERE id = ${id} RETURNING *;`
            const pokemonDB: any[] = await executeQuery(query)
            id = pokemonDB[0].id;
            return id
        } catch (error) {
            console.error(error)
        }
        return 0;
    }
}
