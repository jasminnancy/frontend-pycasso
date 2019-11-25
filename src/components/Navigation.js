import React from 'react'
import { Container, Image, Icon, Menu } from 'semantic-ui-react'
import logo from '../photos/logo.png'

const Navigation = () => {
    return (
        <Container fluid >
            <Image 
                centered 
                src={logo} 
                size ='small' 
                className='logo' 
                onClick={() => window.location.href = '/'}
            />
            <Menu inverted fluid pointing secondary size ='small' widths={10}>
                <Menu.Item>
                    <Icon 
                        inverted 
                        name='user' 
                        size='big' 
                        className='profile-icon' 
                        link
                        onClick={() => window.location.href = "/profile"}
                    />
                </Menu.Item>
                <Menu.Item
                    name='HOME'
                    active={window.location.pathname ===  '/'}
                    onClick={() => window.location.href = "/"}
                />
                <Menu.Item
                    name='GLOBAL'
                    active={window.location.pathname === '/users'}
                    onClick={() => window.location.href = "/users"}
                />
                <Menu.Item
                    name='CLOSE FRIENDS'
                    active={window.location.pathname === '/closefriends'}
                    onClick={() => window.location.href = "/closefriends"}
                />
                <Menu.Item
                    name='PHOTOS'
                    active={window.location.pathname === '/photos'}
                    onClick={() => window.location.href = "/photos"}
                />
                <Menu.Item
                    name='MESSAGES'
                    active={window.location.pathname === '/messages'}
                    onClick={() => window.location.href = "/messages"}
                />
                <Menu.Item>
                    <Icon 
                        inverted 
                        name='search' 
                        size='big' 
                        className='search-icon' 
                    />
                </Menu.Item>
            </Menu>
        </Container>
    )
}

export default Navigation