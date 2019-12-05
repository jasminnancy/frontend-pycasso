import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Grid } from 'semantic-ui-react'
import Conversations from './Conversations'
import NewConversationForm from '../components/NewConversationForm'

class MessagesPage extends Component {
    constructor() {
        super()

        this.state = {
            page: 'conversations'
        }
    }

    render() {
        if (this.props.currentUser.user.username) {
            let currentPage
            this.state.page === 'conversations'
                ? currentPage = <Conversations 
                                    currentUser={this.props.currentUser}
                                />
                    : currentPage = <NewConversationForm 
                                        currentUser={this.props.currentUser} 
                                        users={this.props.users} 
                                    />

            return (
                <Grid stretched>
                    <Menu tabular inverted widths={4} size='huge'>
                        <Menu.Item 
                            name='Conversations'
                            active={this.state.page === 'conversations'}
                            onClick={() => this.setState({page: 'conversations'}, () => window.location.reload())}
                        />
                        <Menu.Item 
                            position='right'
                            name='Create New Conversation'
                            active={this.state.page === 'new'}
                            onClick={() => this.setState({page: 'new'})}
                        />
                    </Menu>
                    <Grid.Column width={16}>
                        {currentPage}
                    </Grid.Column>
                </Grid>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        users: state.users
    }
}

export default connect(mapStateToProps)(MessagesPage)