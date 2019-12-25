import React, { Component } from 'react'
import { Segment, Form, Button, Header } from 'semantic-ui-react'

class NewConversationForm extends Component {
    constructor() {
        super()

        this.state = {
            body: '',
            recipient_id: null,
            options: []
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

        fetch('https://pycasso-backend.herokuapp.com/conversations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                first_user_id: this.props.currentUser.user.id,
                second_user_id: Number.parseInt(values.recipient_id),
                body: values.body
            })
        })
        .then(r => r.json())
        .then(data => {
            this.setState({
                body: '',
                recipient_id: null,
                options: []
            })
        }, alert('Message sent!'))
    }

    render() {
        return (
            <Segment inverted padded='very'>
                <Form 
                    inverted
                    onSubmit={(e) => this.handleSubmit(e, this.state)}
                >
                    <Form.Group>
                        <Form.Select
                            style={{backgroundColor: '#eeeeee'}}
                            inline
                            label='To: '
                            floating
                            options={this.state.options}
                            placeholder='Select User'
                            onChange={(e) => this.handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.TextArea 
                            style={{backgroundColor: '#eeeeee'}}
                            width={16}
                            inline
                            id='body'
                            placeholder='Type your message here...'
                            onChange={(e) => this.handleChange(e)}
                        />
                    </Form.Group>
                    <Button floated='right' type='submit' content='Send' />
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

export default NewConversationForm