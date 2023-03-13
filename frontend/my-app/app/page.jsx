"use client"
import Image from 'next/image'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css'
import { Button, Container, Form, Alert, SSRProvider } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { sendLoginData } from './fetchs/sendLoginData';

export default function Login() {
  const [user, setUser] = useState(null);
  const [credentialsWrong, setCredentialsWrong] = useState(false);
  const [serverError, setServerError] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setCredentialsWrong(false);

    const form = e.currentTarget;

    if (form.checkValidity() === false) {

      e.stropPropagation();
    } else {
      const username = form.elements.username.value;
      const password = form.elements.password.value;

      const data = {
        username: username,
        password: password,
      }

      const response = await sendLoginData(data);
      if (response.ok) {
        const resultFetchJSON = await response.json();
        console.log(resultFetchJSON);
        sessionStorage.setItem("credentials", JSON.stringify(resultFetchJSON))
        setUser(response.appuser)
        // redirect(<Home />)
        router.push('/home')
      } else if (response.status === 404) {
        setCredentialsWrong(true);
      } else if (response.status === 400) {
        setServerError(true);
      }

    }
  }

  return (
    <main>
      <SSRProvider>


        <Container className='col-sm-11 col-xl-4 bg-light p-4 rounded text-dark'>
          <Form onSubmit={(e) => { handleSubmit(e) }} >
            <Form.Group className='mb-3' >
              <Form.Label>Username</Form.Label>
              <Form.Control required name='username' />
              <Form.Control.Feedback type="invalid">Enter your username</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control required type='password' name='password' />
              <Form.Control.Feedback type="invalid">Enter your username</Form.Control.Feedback>
            </Form.Group >
            <Form.Group className='d-flex gap-2 pt-2 '>
              <Button type='submit'>Log in</Button>
              <Button className="buttonItem blue" onClick={(e) => {
                e.preventDefault();
                router.push('/signup');
              }}>Sign up</Button>
            </Form.Group>

            {
              credentialsWrong && (
                <Form.Group className='mt-3'>
                  <Alert variant="danger">Wrong username or password</Alert>
                </Form.Group>

              )
            }{serverError && (
              <Form.Group className='mt-3'>
                <Alert variant="danger">Server error. Try later.</Alert>
              </Form.Group>
            )

            }
          </Form>
        </Container>


      </SSRProvider>
    </main>
  )

}
