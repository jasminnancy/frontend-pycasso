import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Grid } from 'semantic-ui-react'
import ReceivedMessages from './ReceivedMessages'
import SentMessages from './SentMessages'
import NewMessageForm from '../components/NewMessageForm'

class MessagesPage extends Component {
    constructor() {
        super()

        this.state = {
            page: 'inbox'
        }
    }

    render() {
        let currentPage

        switch (this.state.page) {
            case 'inbox':
                currentPage = <ReceivedMessages messages={this.props.currentUser.messages.reverse()} />
                break;
            case 'outbox':
                currentPage = <SentMessages messages={this.props.currentUser.sent_messages.reverse()} />
                break;
            case 'new':
                currentPage = <NewMessageForm currentUser={this.props.currentUser} />
                break;
            default:
                currentPage = <ReceivedMessages messages={this.props.currentUser.messages.reverse()} />
        }

        return (
            <Grid stretched>
                <Menu tabular inverted widths={5} size='huge'>
                    <Menu.Item 
                        name='Inbox'
                        active={this.state.page === 'inbox'}
                        onClick={() => this.setState({page: 'inbox'})}
                    />
                    <Menu.Item 
                        name='Outbox'
                        active={this.state.page === 'outbox'}
                        onClick={() => this.setState({page: 'outbox'})}
                    />
                    <Menu.Item 
                        position='right'
                        name='Compose Message'
                        active={this.state.page === 'new'}
                        onClick={() => this.setState({page: 'new'})}
                    />
                </Menu>
                <Grid.Column width={16}>
                    {currentPage}
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(MessagesPage)