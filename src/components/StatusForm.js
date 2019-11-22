import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

class StatusForm extends Component {
    constructor() {
        super()
        this.state = {
            status: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e, values) => {
        e.preventDefault()

        fetch('http://localhost:3000/statuses', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser[0].id,
                content: values.status
            })
        }, this.setState({
            status: ''
        }))
        .then(r => r.json())
        .then(console.log)
    }

    render() {
        return (
            <Form onSubmit={(e) => this.handleSubmit(e, this.state)}>
                    <Form.Input
                        id='status'
                        value={this.state.status}
                        placeholder='Type your status here.'
                        onChange={(e) => this.changeHandler(e)}
                    />
                    <Button type='submit'>Post</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(StatusForm)