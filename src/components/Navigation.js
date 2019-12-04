import React from 'react'
import { connect } from 'react-redux'
import { Container, Image, Icon, Menu } from 'semantic-ui-react'
import logo from '../photos/logo.png'

const Navigation = (props) => {
    const handleLogOut = () => {
        localStorage.clear()
        window.location.href = "/login"
    }

    if (props.currentUser.user.length !== 0) {
        let userFix = props.currentUser.user.username
        ? props.currentUser.user
            : props.currentUser.user.user

        let unread

        if (props.conversations.length > 0) {
            props.conversations.map(convo => 
                unread = convo.messages.filter(message => 
                    message.user_id !== userFix.id 
                        && message.read === false)
            )
        }

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
                    <Menu.Item/>
                    <Menu.Item
                        name='HOME'
                        active={window.location.pathname ===  '/'}
                        onClick={() => window.location.href = "/"}
                    />
                    <Menu.Item
                        name='SEARCH'
                        active={window.location.pathname === '/users'}
                        onClick={() => window.location.href = "/users"}
                    />
                    <Menu.Item
                        name='CLOSE FRIENDS'
                        active={window.location.pathname === '/closefriends'}
                        onClick={() => window.location.href = "/closefriends"}
                    />
                    <Menu.Item
                        name='PORTFOLIO'
                        active={window.location.pathname === '/photos'}
                        onClick={() => window.location.href = "/photos"}
                    />
                    <Menu.Item
                        active={window.location.pathname === '/messages'}
                        onClick={() => window.location.href = "/messages"}
                    >
                        MESSAGES {unread && unread.length > 0
                                ? '(' + unread.length + ')'
                                    : null}
                    </Menu.Item>
                    <Menu.Item/>
                    <Menu.Item>
                        <Icon 
                            inverted 
                            link
                            name='log out' 
                            size='big' 
                            className='search-icon' 
                            onClick={() => handleLogOut()}
                        />
                    </Menu.Item>
                </Menu>
            </Container>
        )
    } else {
        return null
    } 
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        conversations: state.conversations
    }
}

export default connect(mapStateToProps)(Navigation)