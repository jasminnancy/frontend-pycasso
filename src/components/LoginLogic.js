import React, { Component } from 'react'
import { Container, Button, Divider } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

class LoginLogic extends Component {
    constructor() {
        super()
        this.state = {
            show: ''
        }
    }

    render() {
        switch(this.state.show) {
            case 'login':
                return <LoginForm />
            case 'signup':
                return <SignupForm />
            default:
                return (
                    <Container fluid className='landing-page-buttons'>
                        <Button 
                            basic 
                            size='huge' 
                            content='Log In' 
                            onClick={() => this.setState({show: 'login'})}
                        />
                        <Divider hidden/>
                        <Button 
                            basic 
                            size='huge' 
                            content='Sign Up' 
                            onClick={() => this.setState({show: 'signup'})}
                        />
                    </Container>
                )
        }
    }
}

export default LoginLogic