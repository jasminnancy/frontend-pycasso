import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Form, Button } from 'semantic-ui-react'

class SignupForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmpass: '',
            email: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e, values) => {
        e.preventDefault()

        if ( values.password === values.confirmpass ) {
            let userObject = {
                username: values.username, 
                password: values.password, 
                email: values.email
            }

            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({user: userObject})
            }, this.setState({
                username: '',
                password: '',
                confirmpass: '',
                email: ''
            }))
            .then(r => r.json())
            .then(data => {
                localStorage.setItem('jwt', data.jwt)
            })
        } else {
            alert("passwords don't match")
        }
    }

    render() {
        return (
            <Container>
                <Form onSubmit={(e) => this.handleSubmit(e, this.state)}>
                    <Form.Group>
                        <Form.Input 
                            id='username'
                            type='text' 
                            placeholder='Username'
                            value={this.state.username}
                            onChange={(e) => this.changeHandler(e)}
                        />
                        <Form.Input 
                            id='password'
                            type='password' 
                            placeholder='Password'
                            value={this.state.password}
                            onChange={(e) => this.changeHandler(e)}
                        />
                        <Form.Input 
                            id='confirmpass'
                            type='password' 
                            placeholder='Confirm Password'
                            value={this.state.confirmpass}
                            onChange={(e) => this.changeHandler(e)}
                        />
                        <Form.Input 
                            id='email'
                            type='text' 
                            placeholder='Email'
                            value={this.state.email}
                            onChange={(e) => this.changeHandler(e)}
                        />
                        <Button type='submit'>Sign Up</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

export default SignupForm