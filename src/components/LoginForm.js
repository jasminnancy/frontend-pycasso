import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            user: false
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLogin = (e, values) => {
        e.preventDefault()
        
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({user: { 
                username: values.username, 
                password: values.password 
            }})
        })
        .then(response => response.json())
        .then(data => {
            if (data.user){
                localStorage.setItem('jwt', data.jwt)
            } else {
                alert('Invalid Username or Password')
            }
        })
    }

    render() {
        return (
            <Container>
                <Form onSubmit={(e) => this.handleLogin(e, this.state)}>
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
                        <Button type='submit'>Sign In</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

export default LoginForm