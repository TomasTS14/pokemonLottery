
import PokemonRepository from './../domain/pokemon.repository';
import Pokemon from './../domain/pokemon';
export default class PokemonUsecases {
    pokemonRepository: PokemonRepository;
    constructor(pokemonRepository: PokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async getPokemons(appuser_id: number) {
        return await this.pokemonRepository.getPokemons(appuser_id);
    }
    async getPokemonById(id: number) {
        return await this.pokemonRepository.getPokemonById(id);
    }
    async insertPokemon(pokemon: Pokemon) {
        return await this.pokemonRepository.insertPokemon(pokemon);
    }
    async changePokemon(pokemon: Pokemon) {
        return await this.pokemonRepository.changePokemon(pokemon);
    }
    async deletePokemon(id: number) {
        return await this.pokemonRepository.deletePokemon(id);
    }

}