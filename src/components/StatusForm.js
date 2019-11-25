import React, { Component } from 'react'
import { Form, Button, Grid } from 'semantic-ui-react'
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
                user_id: this.props.currentUser.user.id,
                content: values.status
            })
        }, this.setState({
            status: ''
        }))
        .then(r => r.json())
        .then(data => this.props.handleStatusUpdate(data, this.props.currentUser))
    }

    render() {
        return (
            <Form 
                onSubmit={(e) => this.handleSubmit(e, this.state)}
                style={{marginBottom: 25}}
            >
                <Grid>
                    <Grid.Column width={13}>
                        <Form.TextArea
                            id='status'
                            value={this.state.status}
                            placeholder='Type your status here.'
                            maxLength={this.state.limit}
                            onChange={(e) => this.changeHandler(e)}
                        />
                    </Grid.Column>
                    <Grid.Column verticalAlign='bottom' width={3}>
                        {250 - this.state.status.length}<br/><br/>
                        <Button basic inverted type='submit'>Post</Button>
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleStatusUpdate: (status, currentUser) => { 
            currentUser.statuses = [status, ...currentUser.statuses]
            dispatch({
                type: 'ADDED_STATUS',
                payload: currentUser
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusForm)