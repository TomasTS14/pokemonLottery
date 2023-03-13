"use client"
import { Button, Form, ButtonGroup, Alert, CloseButton, SSRProvider, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../globals.css'
export default function Signup() {
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const checkUsernameExists = async (username) => {

        if (username.length > 0) {
            const exists = await (await fetch(`/api/users/check/params?username=${username}`)).text();
            setUsernameExists((exists == "true") ? true : false);
        } else {
            setUsernameExists(false);
        }
    }

    const checkEmailExists = async (email) => {

        if (email.length > 0) {
            const exists = await (await fetch(`/api/users/check/params?email=${email}`)).text();
            setEmailExists((exists == "true") ? true : false)
        } else {
            setEmailExists(false)
        }
    }

    const handleSubmit = (e) => {
        setLoading(true);
        console.log("checking passwords");
        e.preventDefault();

        const form = e.currentTarget;
        const pass1 = form.elements.formPassword;
        const pass2 = form.elements.formPassword2;
        console.log(pass1.value + " " + pass2.value)
        if (pass1.value !== pass2.value) {
            pass1.setCustomValidity("Passwords dont match");
            pass1.value = "";
            pass2.value = "";
            form.reportValidity();
        } else {
            pass1.setCustomValidity("");
            const user = {
                name: form.elements.formName.value,
                lastName: form.elements.formSurname.value,
                username: form.elements.formUsername.value,
                email: form.elements.formEmail.value,
                password: form.elements.formPassword.value,
            };
            (async () => {
                try {
                    const fetchResult = await fetch("/api/users/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                    if (fetchResult.ok) {

                        const fetchResultJSON = await fetchResult.json();
                        const token = fetchResultJSON;
                        console.log(token);
                        setLoading(false);
                        router.push('/');
                    }
                } catch (err) {
                    console.error(err);
                }
            })()
        }
    }


    return (
        <SSRProvider>
            <fieldset className='rounded text-dark' style={{
                boxShadow: "2px 4px 6px 0px rgba(0,0,0,0.75)",
                padding: "1em",
                backgroundColor: 'whitesmoke',
                width: '40%',
            }}>
                {loading ?
                    (
                        <Spinner />
                    )
                    :
                    (
                        <>
                            <div className='d-flex flex-row-reverse'>
                                <CloseButton onClick={() => router.back()} />
                            </div>
                            <legend align="left">Signup</legend>
                            <Form onSubmit={(e) => { handleSubmit(e) }} style={{ textAlign: "left" }} id="signup-form">
                                <Form.Group className="mb-2 " controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Type your name" name='formName' minLength={3} required />
                                </Form.Group>
                                <Form.Group className="mb-2 " controlId="formSurname">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Type your last name" name='formSurname' minLength={3} required />
                                </Form.Group>
                                <Form.Group className="mb-2 " controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="create a username" name='formUsername' minLength={3} required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2 " controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="your email" name='formEmail' minLength={10} required
                                    />
                                    <Form.Text className='text-muted'>We won`t share it with anyone.</Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 " controlId="formcPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="formPassword" minLength={3} required onChange={(e) => e.target.setCustomValidity("")} />
                                </Form.Group>
                                <Form.Group className="mb-2 " controlId="formPassword2">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='formPassword2' minLength={3} required />
                                </Form.Group>
                                <ButtonGroup className="mb-2 " aria-label="Basic example">
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        </>

                    )
                }

            </fieldset>
        </SSRProvider>
    );
}
