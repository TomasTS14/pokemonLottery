CREATE DATABASE actividad8;

CREATE TABLE "users"(
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    lastName TEXT
);

CREATE TABLE pokemons (
    id SERIAL,
    user_id INT,
    name TEXT,
    species TEXT,
    type TEXT,
    PRIMARY KEY (id, user_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE user_dailyChallenge(
    user_id INT,
    date DATE,
    pass BOOLEAN,
    PRIMARY KEY(user_id, date),
    FOREIGN KEY (user_id) REFERENCES users(id)
);