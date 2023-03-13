"use client"
import { Spinner, Form, Button, Alert, Card, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPokemon } from './../fetchs/getPokemon';
export default function Home() {
    const [credentials, setCredentials] = useState(null);
    const [trivia, setTrivia] = useState(null);
    const [answerRight, setAnswerRight] = useState(null);
    const [pokemon, setPokemon] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const credentialsLocal = sessionStorage.getItem("credentials");
        if (credentialsLocal) {
            setCredentials(JSON.parse(credentialsLocal));
            (async () => {
                try {
                    const response = await fetch("/api/trivia", {
                        method: 'GET',
                        cache: 'no-store',
                    });
                    console.log("trivia in /home");
                    const trivia = await response.json()
                    console.log(trivia);
                    setTrivia(trivia)
                } catch (error) {
                    console.log(error);
                }

            })()

        } else {
            router.push('/')
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const input = form.elements.answer;



        if (trivia.answer.toLowerCase().includes(input.value.toLowerCase())) {
            (async () => {
                input.disabled = true;
                const pokemon = await getPokemon();

                const myPokemon = {
                    appuser_id: credentials.appuser.id,
                    name: pokemon.name,
                    id: pokemon.id,
                    type: pokemon['types'][0]['type']['name'],
                    species: pokemon['species']['name'],
                }
                console.log(myPokemon);

                setPokemon(myPokemon)
                setAnswerRight(true)
                console.log("correct");
            })()

        } else {
            setAnswerRight(false)
            console.log("incorrect");
        }
    }

    const collect = (e) => {
        e.preventDefault();
        (async () => {
            try {

                const response = await fetch("/api/pokemons/add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${credentials.token}`
                    },
                    body: JSON.stringify(pokemon)
                });
                const result = await response.json();
                console.log(result);
                router.push('/home/added')
            } catch (error) {
                console.error(error);
            }
        })()
    }

    return (
        <div className="p-5">
            {credentials ?
                (
                    <>
                        <h1>Hello {credentials.appuser.username}</h1>
                        <h2>Here's some trivia, answer correctly and get your pokemon</h2>
                        {trivia &&
                            <>
                                <p>
                                    <i>{trivia.question}</i>
                                </p>
                                <Form onSubmit={(e) => { handleSubmit(e) }}>
                                    <Form.Group className='mb-2' controlId="answer">
                                        <Form.Label>Answer</Form.Label>
                                        <Form.Control name="answer" type="text" placeholder="Enter answer" />
                                    </Form.Group>
                                    <Button className='mb-2' variant="success" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                                {(answerRight === null) ?
                                    null
                                    :
                                    answerRight ?
                                        (
                                            <>
                                                <Alert variant="success"> Correct! </Alert>
                                                <Card style={{
                                                    maxWidth: '18rem', aspectRatio: '16/9'
                                                }}>
                                                    < Card.Img
                                                        style={{
                                                            maxWidth: '18rem', aspectRatio: '16/9'
                                                        }}
                                                        variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
                                                        } />
                                                    <Card.Body>
                                                        <Card.Title>{pokemon.name}</Card.Title>
                                                        <ListGroup variant="flush">
                                                            <ListGroup.Item><span >Species: {pokemon.species}</span></ListGroup.Item>
                                                            <ListGroup.Item> <span >Type: {pokemon.type}</span></ListGroup.Item>
                                                        </ListGroup>
                                                        <Button variant="success" onClick={(e) => { collect(e) }}>Collect!</Button>
                                                    </Card.Body>
                                                </Card>
                                            </>
                                        )
                                        :
                                        <Alert variant="danger"> Incorrect! </Alert>}
                            </>
                        }
                    </>
                )
                :
                (<Spinner />)
            }

        </div >
    )
}