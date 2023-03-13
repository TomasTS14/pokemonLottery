"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Card, ListGroup, Spinner } from 'react-bootstrap';
export default function Collection() {
    const [credentials, setCredentials] = useState(null);
    const [pokemons, setPokemons] = useState(null);
    const router = useRouter();

    useEffect(() => {

        const credentialsLocal = JSON.parse(sessionStorage.getItem("credentials"));
        if (credentialsLocal) {
            setCredentials(credentialsLocal);
            (async () => {
                try {
                    const response = await fetch("/api/pokemons", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${credentialsLocal.token}`
                        },
                    });
                    const pokemons = await response.json();
                    setPokemons(pokemons);
                } catch (error) {
                    console.log(error);
                }
            })()
        } else {
            router.push('/');

        }
    }, [])


    return (
        <Container>
            <h1>Your collection:</h1>

            <div className="collection d-flex gap-2">
                {pokemons && pokemons.map((pokemon, index) => {
                    return (
                        <Card key={index} style={{
                            maxWidth: '18rem', aspectRatio: '16/9'
                        }}>
                            < Card.Img style={{
                                maxWidth: '18rem', aspectRatio: '16/9'
                            }} variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
                            } />
                            <Card.Body>
                                <Card.Title>{pokemon.name}</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><span >Species: {pokemon.species}</span></ListGroup.Item>
                                    <ListGroup.Item> <span >Type: {pokemon.type}</span></ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    )
                })}
                {pokemons && pokemons.length === 0 && <h2>You have no pokemons yet</h2>}
                {!pokemons && <Spinner animation="border" variant="success" />}
            </div>
        </Container>
    )
}