
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.multiavatar.com'],
  },
  async rewrites() {
    return [

      {
        source: "/api/users/signup",
        destination: "https://pokemonlottery-production.up.railway.app/users/signup"
      },
      {
        source: "/api/users/login",
        destination: "https://pokemonlottery-production.up.railway.app/users/login",
      },
      {
        source: "/api/users/:slug",
        destination: "https://pokemonlottery-production.up.railway.app/users/:slug",
      },
      {
        source: "/api/users/check/params",
        destination: "http://localhost:8080/users/check/params"
      },
      {
        source: "/api/pokemons/add",
        destination: "https://pokemonlottery-production.up.railway.app/pokemons"
      },
      {
        source: "/api/pokemons",
        destination: "https://pokemonlottery-production.up.railway.app/pokemons"
      },
    ];
  },
}
module.exports = nextConfig
