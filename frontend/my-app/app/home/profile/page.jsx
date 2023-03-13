"use client"

import { Spinner, Container, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
export default function Porfile() {
    const [credentials, setCredentials] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const credentialsLocal = JSON.parse(sessionStorage.getItem("credentials"));
        if (credentialsLocal) {
            console.log(credentialsLocal);
            setCredentials(credentialsLocal);
            (async () => {
                try {
                    const response = await fetch("/api/users/" + credentialsLocal.appuser.id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${credentialsLocal.token}`
                        },
                    });
                    const userInfo = await response.json();
                    setUserInfo(userInfo);
                }
                catch (error) {
                    console.log(error);
                }
            })()
        } else {
            router.push('/')
        }
    }, [])

    return (

        userInfo ?
            (
                <div className='d-flex justify-content-start  '>
                    <Container fluid>
                        <h1>Profile</h1>
                        <ListGroup variant="flush">
                            <ListGroup.Item><h3 >Username: </h3><h3 className='text-muted'> {userInfo.username}</h3></ListGroup.Item>
                            <ListGroup.Item> <h3 >Email: </h3><h3 className='text-muted'> {userInfo.email}</h3></ListGroup.Item>
                            <ListGroup.Item> <h3 >Name: </h3><h3 className='text-muted'> {userInfo.name}</h3></ListGroup.Item>
                            <ListGroup.Item> <h3 >Last name: </h3><h3 className='text-muted'> {userInfo.lastName}</h3></ListGroup.Item>
                        </ListGroup>
                    </Container>
                </div>
            )
            :
            (<Spinner animation="border" role="status" />)

    )
}