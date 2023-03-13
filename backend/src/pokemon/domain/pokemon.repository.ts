import Pokemon from "./pokemon";

export default interface PokemonRepository {
    getPokemons(appuser_id: number): Promise<Pokemon[]>;
    getPokemonById(id: number): Promise<Pokemon>;
    insertPokemon(pokemon: Pokemon): Promise<Pokemon>;
    changePokemon(pokemon: Pokemon): Promise<Pokemon>;
    deletePokemon(id: number): Promise<number>;

}