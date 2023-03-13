
export const getPokemons = async (token) => {
    try {

        const response = await fetch("/api/pokemons", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const pokemons = await response.json();
        return pokemons;
    } catch (error) {
        console.log(error);
    }
}