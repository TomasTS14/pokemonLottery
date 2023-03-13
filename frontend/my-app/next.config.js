
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
        destination: "http://localhost:8080/users/signup"
      },
      {
        source: "/api/users/login",
        destination: "http://localhost:8080/users/login",
      },
      {
        source: "/api/users/:slug",
        destination: "http://localhost:8080/users/:slug",
      },
      {
        source: "/api/users/check/params",
        destination: "http://localhost:8080/users/check/params"
      },
      {
        source: "/api/pokemons/add",
        destination: "http://localhost:8080/pokemons"
      },
      {
        source: "/api/pokemons",
        destination: "http://localhost:8080/pokemons"
      },
    ];
  },
}
module.exports = nextConfig