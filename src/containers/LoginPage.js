import React from 'react'
import { Container, Image, Popup, Icon } from 'semantic-ui-react'
import loginBackground from '../photos/loginBackground.gif'
import logo from '../photos/logo.png'
import LoginLogic from '../components/LoginLogic'

const LoginPage = () => {
    return (
        <Container fluid>
            <Image 
                fluid 
                src={loginBackground} 
                alt='nature'
            />
            <Container fluid className='landing-logo'>
                <Image 
                    centered 
                    size='medium' 
                    src={logo} 
                    alt='logo' 
                    href='/'
                />
            </Container>
            <Container fluid className='landing-question'>
                <Popup 
                    position='bottom right'
                    content="Pycasso is a website that safely brings 
                        photographers and models together. Rate your 
                        overall experience working with other artists
                        and help keep the community a safe place."
                    trigger={
                        <Icon 
                            name='question circle outline' 
                            size='big' 
                        />
                    } 
                />
            </Container>
            <LoginLogic />
        </Container>
    )
}

export default LoginPage