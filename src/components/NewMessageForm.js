import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class NewMessageForm extends Component {
    constructor() {
        super()

        this.state = {
            body: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            body: e.target.value
        })
    }

    handleSubmit = (e, body) => {
        e.preventDefault()

        let otherUserID = this.props.conversation.second_user_id !== this.props.currentUser.user.id
            ? this.props.conversation.second_user_id 
                : this.props.conversation.first_user_id

        fetch('http://localhost:3000/conversations',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                first_user_id: this.props.currentUser.user.id,
                second_user_id: otherUserID,
                body: body
            })
        })
        .then(r => r.json())
        .then(data => {
            let message = document.createElement('div')
            message.innerText = 'Message sent'
            message.style = 'color: black'
            document.querySelector('#commentGroup').appendChild(message)
        })

        this.setState({
            body: ''
        })
    }

    render() {
        return (
            <Form onSubmit={(e) => this.handleSubmit(e, this.state.body)}>
                <Form.TextArea 
                    value={this.state.body}
                    onChange={(e) => this.handleChange(e)} 
                />
                <Button 
                    type='submit' 
                    floated='right' 
                    content='Reply' 
                    labelPosition='right' 
                    icon='pencil' 
                />
            </Form>
        )
    }
}

export default NewMessageForm