import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Header } from 'semantic-ui-react'

class NewMessageForm extends Component {
    constructor() {
        super()

        this.state = {
            body: '',
            recipient_id: null,
            options: [],
            message: ''
        }
    }

    componentDidMount() {
        let users = this.props.users.filter(user => user.id !== this.props.currentUser.user.id)
        let sortedUsers = users.sort((a, b) => a.username.localeCompare(b.username))
        let options = []
        
        sortedUsers.map(user => {
            let userObject = {id: user.id, text: user.username, value: user.id}
            options.push(userObject)
            return options
        })

        this.setState({
            options: options
        })
    }

    handleChange = (e) => {
        if (e.target.id === 'body') {
            this.setState({
                body: e.target.value
            })
        } else {
            this.setState({
                recipient_id: e.target.id
            })
        }
    }

    handleSubmit = (e, values) => {
        e.preventDefault()

        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                sender_id: this.props.currentUser.user.id,
                recipient_id: Number.parseInt(values.recipient_id),
                body: values.body
            })
        })
        .then(r => r.json())
        .then(data => {
            this.setState({
                body: '',
                message: data.message
            })
            this.props.handleSentMessage(data, this.props.currentUser)
        })
    }

    render() {
        return (
            <Segment inverted padded='very'>
                <Form 
                    inverted
                    widths='equal'
                    onSubmit={(e) => this.handleSubmit(e, this.state)}
                >
                    <Form.Group>
                        <Form.Select
                        style={{backgroundColor: '#eeeeee'}}
                            inline
                            floating
                            label='Recipient:'
                            options={this.state.options}
                            placeholder='Select User'
                            onChange={(e) => this.handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.TextArea 
                            style={{backgroundColor: '#eeeeee'}}
                            id='body'
                            label='Message'
                            placeholder='Type your message here...'
                            onChange={(e) => this.handleChange(e)}
                        />
                    </Form.Group>
                    <Button type='submit' content='Send' />
                    <Header size='tiny' color='red'>
                        {this.state.message
                            ? this.state.message
                                : null}
                    </Header>
                </Form>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSentMessage: (message, currentUser) => {
            currentUser.sent_messages = [message.data, ...currentUser.sent_messages]
            dispatch({
                type: 'SENT_MESSAGE',
                payload: currentUser
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageForm)